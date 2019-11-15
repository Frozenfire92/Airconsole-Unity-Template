

var app, AppComponent;
Vue.component("airconsole-keyboard", {
	template: "#airconsole-keyboard-component-template",
	data: function () {
		return {
			open: !1
		}
	},
	mounted: function () {
		var n = this;
		this.keyboard = new AirConsoleKeyboard("airconsole_keyboard"), this.keyboard.bind("airconsole_keyboard_display", {
			onHide: function (e, t) {
				n.open = !1, n.$parent.sendInput(0, {
					s: t || "",
					f: !0
				})
			},
			onChange: function (e, t) {
				n.$parent.sendInput(0, {
					s: t || "",
					f: !1
				})
			}
		})
	},
	methods: {
		show: function () {
			this.$el.children[0].click(), this.open = !0
		},
		hide: function () {
			this.keyboard.hide(), this.open = !1
		},
		getValue: function () {
			return this.keyboard.valueText("airconsole_keyboard_display")
		}
	}
}),
Vue.component("direction-pad", {
	template: "#direction-pad-component-template",
	data: function () {
		return {
			open: !1,
			button0Pressed: !1,
			button1Pressed: !1,
			button2Pressed: !1,
			button3Pressed: !1,
			button4Pressed: !1
		}
	},
	methods: {
		show: function () {
			this.open = !0
		},
		hide: function () {
			this.open = !1
		},
		buttonDown: function (e) {
			this["button" + e + "Pressed"] = !0, this.$parent.sendInput(1, {
				d: !0,
				dr: e
			})
		},
		buttonUp: function (e) {
			this["button" + e + "Pressed"] = !1, this.$parent.sendInput(1, {
				d: !1,
				dr: e
			})
		}
	}
}),
Vue.component("click-and-drag", {
	template: "#click-and-drag-template",
	props: ["color"],
	data: function () {
		return {
			open: !1,
			swipeAnalog: null,
			circle: null,
			line: null,
			aiming: !1,
			maxX: null,
			maxY: null,
			fingerRadius: 15,
			minSwipeDistance: 20
		}
	},
	mounted: function () {
		this.line = this.$el.children[0].children[0], this.circle = this.$el.children[0].children[1], swipeStyle = window.getComputedStyle(this.$el.children[0]), this.maxX = parseInt(swipeStyle.width.replace("px", "")), this.maxY = parseInt(swipeStyle.height.replace("px", "")), this.swipeAnalog = new SwipeAnalog(this.$el.children[0], {
			touchstart: this.swipeAreaTouchStart,
			touchmove: this.swipeAreaTouchMove,
			touchend: this.swipeAreaTouchEnd,
			min_swipe_distance: this.minSwipeDistance
		})
	},
	methods: {
		show: function () {
			this.open = !0
		},
		hide: function () {
			this.open = !1
		},
		throttledSendInput: _.throttle(function (e, t) {
			this.sendInput(e, t)
		}, 200, {
			trailing: !1
		}),
		sendInput: function (e, t) {
			t.distance >= this.minSwipeDistance && this.$parent.sendInput(2, {
				t: e,
				d: t.distance || 0,
				a: t.angle || 0
			})
		},
		swipeAreaTouchStart: function () {
			!this.aiming && this.open && (this.aiming = !0, this.circle.setAttribute("cx", this.swipeAnalog.start_position.x.clamp(0, this.maxX)), this.circle.setAttribute("cy", this.swipeAnalog.start_position.y.clamp(0, this.maxY)), this.circle.setAttribute("r", this.fingerRadius), this.line.setAttribute("x1", this.swipeAnalog.start_position.x.clamp(0, this.maxX)), this.line.setAttribute("y1", this.swipeAnalog.start_position.y.clamp(0, this.maxY)), this.line.setAttribute("x2", this.swipeAnalog.start_position.x.clamp(0, this.maxX)), this.line.setAttribute("y2", this.swipeAnalog.start_position.y.clamp(0, this.maxY)))
		},
		swipeAreaTouchMove: function (e) {
			this.aiming && this.open && (this.line.setAttribute("x1", this.swipeAnalog.end_position.x.clamp(0, this.maxX)), this.line.setAttribute("y1", this.swipeAnalog.end_position.y.clamp(0, this.maxY)), this.throttledSendInput(0, e))
		},
		swipeAreaTouchEnd: function (e) {
			this.aiming && this.open && (this.circle.setAttribute("cx", "0"), this.circle.setAttribute("cy", "0"), this.circle.setAttribute("r", "0"), this.line.setAttribute("x2", this.swipeAnalog.end_position.x.clamp(0, this.maxX)), this.line.setAttribute("y2", this.swipeAnalog.end_position.y.clamp(0, this.maxY)), this.sendInput(1, e), this.aiming = !1)
		}
	}
}),
Vue.component("list-select", {
	template: "#list-select-template",
	data: function () {
		return {
			open: !1,
			selectedIndex: null,
			items: []
		}
	},
	methods: {
		show: function (e) {
			this.open = !0, this.items = e
		},
		hide: function () {
			this.open = !1
		},
		select: function (e) {
			this.selectedIndex = e, this.$parent.sendInput(3, {
				i: this.selectedIndex,
				f: !1
			})
		},
		submit: function () {
			this.$parent.sendInput(3, {
				i: this.selectedIndex,
				f: !0
			})
		}
	}
});
var STATE_LOADING = 0,
	STATE_SPECTATING = 1,
	STATE_HELP = 2,
	STATE_READY = 3,
	STATE_PRESS_ANYWHERE = 4;

function init() {
	AppComponent = Vue.component("app", {
		template: "#app-component-template",
		data: function () {
			return {
				airconsole: null,
				title: "The Game",
				message: "Loading...",
				state: 0,
				canJoin: !1,
				loading: !0,
				inputOpen: !1,
				canShowHelpButton: !1,
				canShowSoundButton: !1,
				myColor: "#FFFFFF",
				backgroundColor: "#000000"
			}
		},
		computed: {
			showTitle: function () {
				return this.state === STATE_LOADING || this.state === STATE_SPECTATING
			},
			showHelpModal: function () {
				return this.state === STATE_HELP
			},
			showHelpButton: function () {
				return !this.showHelpModal && !this.inputOpen && this.canShowHelpButton
			},
			showSoundButton: function () {
				return !this.showHelpModal && !this.inputOpen && this.canShowSoundButton
			},
			showPressAnywhereButton: function () {
				return this.state === STATE_PRESS_ANYWHERE
			},
			myColorCssText: function () {
				return "color:" + this.myColor + ";"
			},
			myColorCssBg: function () {
				return "background:" + this.myColor + ";"
			},
			bgColorCssText: function () {
				return "color:" + this.backgroundColor + ";"
			},
			bgColorCssBg: function () {
				return "background:" + this.backgroundColor + ";"
			}
		},
		created: function () {
			this.airconsole = new AirConsole, this.airconsole.onMessage = this.airconsole_onMessage, this.airconsole.onCustomDeviceStateChange = this.airconsole_onCustomDeviceStateChange
		},
		methods: {
			rgbToCSS: function (e, t, n) {
				return "rgba(" + e + "," + t + "," + n + ",1)"
			},
			airconsole_onMessage: function (e, t) {
				if (console.log("message received from airconsole", {
						deviceid: e,
						data: t
					}), e === AirConsole.SCREEN) switch (t.a) {
					case 0:
						this.state = t.s, this.airconsole.setCustomDeviceStateProperty("state", this.state);
						break;
					case 1:
						this.myColor = this.rgbToCSS(t.r, t.g, t.b), this.backgroundColor = this.rgbToCSS(t.bgr, t.bgg, t.bgb);
						break;
					case 2:
						this.message = t.m;
						break;
					case 3:
						this.canShowHelpButton = t.h, this.canShowSoundButton = t.s;
						break;
					case 4:
						if (-1 === t.i) this.inputOpen = !1, this.$refs.keyboard && this.$refs.keyboard.hide(), this.$refs.dpad && this.$refs.dpad.hide(), this.$refs.clickAndDrag && this.$refs.clickAndDrag.hide(), this.$refs.listSelect && this.$refs.listSelect.hide();
						else switch (t.i) {
							case 0:
								this.$refs.keyboard && (this.$refs.keyboard.show(), this.inputOpen = !0);
								break;
							case 1:
								this.$refs.dpad && (this.$refs.dpad.show(), this.inputOpen = !0);
								break;
							case 2:
								this.$refs.clickAndDrag && (this.$refs.clickAndDrag.show(), this.inputOpen = !0);
								break;
							case 3:
								this.$refs.listSelect && (this.$refs.listSelect.show(t.d), this.inputOpen = !0)
						}
						break;
					default:
						console.log("unknown action, maybe you should implement it?", t.a, t)
				}
			},
			airconsole_onCustomDeviceStateChange: function (e, t) {
				console.log("onCustomDeviceStateChange_airconsole data", e, t), e === AirConsole.SCREEN && (t.hasOwnProperty("loaded") && (this.loading = !t.loaded), t.hasOwnProperty("canJoin") && (this.canJoin = t.canJoin))
			},
			alertSendingMessage: function (e) {
				console.warn("SENDING TO SCREEN: device " + this.airconsole.getDeviceId() + " - " + e)
			},
			pressAnywhere: function () {
				this.alertSendingMessage("pressAnywhere"), this.airconsole.message(AirConsole.SCREEN, {
					a: 0
				})
			},
			makeSound: _.throttle(function () {
				this.alertSendingMessage("makeSound"), this.airconsole.message(AirConsole.SCREEN, {
					a: 1
				})
			}, 1e3),
			openHelp: function () {
				this.alertSendingMessage("openHelp"), this.airconsole.message(AirConsole.SCREEN, {
					a: 2,
					o: !0
				})
			},
			closeHelp: function () {
				this.alertSendingMessage("closeHelp"), this.airconsole.message(AirConsole.SCREEN, {
					a: 2,
					o: !1
				})
			},
			sendInput: _.throttle(function (e, t) {
				switch (e) {
					case 0:
						this.alertSendingMessage("sendInput:closeKeyboard");
					case 1:
						this.alertSendingMessage("dpad input");
					case 2:
						this.alertSendingMessage("click and drag");
					case 3:
						this.alertSendingMessage("list select submit");
					default:
						this.airconsole.message(AirConsole.SCREEN, {
							a: 3,
							i: e,
							d: t
						})
				}
			}, 150)
		}
    }),
    app = new Vue({
		el: "#app",
		components: {
			AppComponent: AppComponent
		},
		render: function (e) {
			return e(AppComponent)
		}
	})
}

