'use strict';



;define("controller/app", ["exports", "controller/resolver", "ember-load-initializers", "controller/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class App extends Ember.Application {
    constructor(...args) {
      super(...args);
      this.modulePrefix = _environment.default.modulePrefix;
      this.podModulePrefix = _environment.default.podModulePrefix;
      this.Resolver = _resolver.default;
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("controller/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
});
;define("controller/components/click-and-drag", ["exports", "@glimmer/component", "lodash.throttle", "controller/enums/input", "controller/utils/math"], function (_exports, _component, _lodash, _input, _math) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _temp;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div
    class="click-and-drag {{unless @show "out-of-view"}}"
    {{did-insert this.setup}}
  >
    <svg width="100%" height="100%" id="swipe-area" xmlns="http://www.w3.org/2000/svg">
      <line stroke-dasharray="5, 5" id="svg-line" x1="0" y1="0" x2="0" y2="0" stroke="#FFFFFF" stroke-width="2"></line>
      <circle id="svg-finger" cx="0" cy="0" r="0" stroke="#FFFFFF" stroke-width="2" fill={{@color}} />
    </svg>
  </div>
  */
  {
    id: "B4XRxnqx",
    block: "{\"symbols\":[\"@show\",\"@color\"],\"statements\":[[7,\"div\",false],[12,\"class\",[29,[\"click-and-drag \",[28,\"unless\",[[23,1,[]],\"out-of-view\"],null]]]],[3,\"did-insert\",[[23,0,[\"setup\"]]]],[8],[0,\"\\n  \"],[7,\"svg\",true],[10,\"width\",\"100%\"],[10,\"height\",\"100%\"],[10,\"id\",\"swipe-area\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n    \"],[7,\"line\",true],[10,\"stroke-dasharray\",\"5, 5\"],[10,\"id\",\"svg-line\"],[10,\"x1\",\"0\"],[10,\"y1\",\"0\"],[10,\"x2\",\"0\"],[10,\"y2\",\"0\"],[10,\"stroke\",\"#FFFFFF\"],[10,\"stroke-width\",\"2\"],[8],[9],[0,\"\\n    \"],[7,\"circle\",true],[10,\"id\",\"svg-finger\"],[10,\"cx\",\"0\"],[10,\"cy\",\"0\"],[10,\"r\",\"0\"],[10,\"stroke\",\"#FFFFFF\"],[10,\"stroke-width\",\"2\"],[11,\"fill\",[23,2,[]]],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}",
    meta: {
      moduleName: "controller/components/click-and-drag.hbs"
    }
  });

  const THROTTLE_TIME = 200;
  let ClickAndDrag = (_class = (_temp = class ClickAndDrag extends _component.default {
    constructor(...args) {
      super(...args);
      this.swipeAnalog = void 0;
      this.circle = void 0;
      this.line = void 0;
      this.aiming = false;
      this.maxX = 0;
      this.maxY = 0;
      this.fingerRadius = 15;
      this.minSwipeDistance = 20;
      this.throttledSendInput = (0, _lodash.default)((t, swipeVector) => {
        this.sendInput(t, swipeVector);
      }, THROTTLE_TIME, {
        trailing: false
      });
    }

    setup(element) {
      this.line = element.querySelector('svg line');
      this.circle = element.querySelector('svg circle');
      let swipeStyle = window.getComputedStyle(element.querySelector('svg'));
      this.maxX = parseInt(swipeStyle.width.replace("px", ""));
      this.maxY = parseInt(swipeStyle.height.replace("px", ""));
      this.swipeAnalog = new SwipeAnalog(element, {
        touchstart: () => this.swipeAreaTouchStart(),
        touchmove: swipeVector => this.swipeAreaTouchMove(swipeVector),
        touchend: swipeVector => this.swipeAreaTouchEnd(swipeVector),
        min_swipe_distance: this.minSwipeDistance
      });
    }

    sendInput(t, swipeVector) {
      if (swipeVector && swipeVector.distance >= this.minSwipeDistance) {
        var _swipeVector$distance, _swipeVector$angle;

        this.args.onInput({
          t,
          d: (_swipeVector$distance = swipeVector.distance) !== null && _swipeVector$distance !== void 0 ? _swipeVector$distance : 0,
          a: (_swipeVector$angle = swipeVector.angle) !== null && _swipeVector$angle !== void 0 ? _swipeVector$angle : 0
        });
      }
    }

    swipeAreaTouchStart() {
      if (!this.aiming && this.args.show) {
        var _this$circle, _this$circle2, _this$circle3, _this$line, _this$line2, _this$line3, _this$line4;

        this.aiming = true;
        (_this$circle = this.circle) === null || _this$circle === void 0 ? void 0 : _this$circle.setAttribute("cx", (0, _math.clamp)(this.swipeAnalog.start_position.x, 0, this.maxX).toString());
        (_this$circle2 = this.circle) === null || _this$circle2 === void 0 ? void 0 : _this$circle2.setAttribute("cy", (0, _math.clamp)(this.swipeAnalog.start_position.y, 0, this.maxY).toString());
        (_this$circle3 = this.circle) === null || _this$circle3 === void 0 ? void 0 : _this$circle3.setAttribute("r", this.fingerRadius.toString());
        (_this$line = this.line) === null || _this$line === void 0 ? void 0 : _this$line.setAttribute("x1", (0, _math.clamp)(this.swipeAnalog.start_position.x, 0, this.maxX).toString());
        (_this$line2 = this.line) === null || _this$line2 === void 0 ? void 0 : _this$line2.setAttribute("y1", (0, _math.clamp)(this.swipeAnalog.start_position.y, 0, this.maxY).toString());
        (_this$line3 = this.line) === null || _this$line3 === void 0 ? void 0 : _this$line3.setAttribute("x2", (0, _math.clamp)(this.swipeAnalog.start_position.x, 0, this.maxX).toString());
        (_this$line4 = this.line) === null || _this$line4 === void 0 ? void 0 : _this$line4.setAttribute("y2", (0, _math.clamp)(this.swipeAnalog.start_position.y, 0, this.maxY).toString());
      }
    }

    swipeAreaTouchMove(swipeVector) {
      if (this.aiming && this.args.show) {
        var _this$line5, _this$line6;

        (_this$line5 = this.line) === null || _this$line5 === void 0 ? void 0 : _this$line5.setAttribute("x1", (0, _math.clamp)(this.swipeAnalog.end_position.x, 0, this.maxX).toString());
        (_this$line6 = this.line) === null || _this$line6 === void 0 ? void 0 : _this$line6.setAttribute("y1", (0, _math.clamp)(this.swipeAnalog.end_position.y, 0, this.maxY).toString());
        this.throttledSendInput(_input.ClickAndDragInputType.Move, swipeVector);
      }
    }

    swipeAreaTouchEnd(swipeVector) {
      if (this.aiming && this.args.show) {
        var _this$circle4, _this$circle5, _this$circle6, _this$line7, _this$line8;

        (_this$circle4 = this.circle) === null || _this$circle4 === void 0 ? void 0 : _this$circle4.setAttribute("cx", "0");
        (_this$circle5 = this.circle) === null || _this$circle5 === void 0 ? void 0 : _this$circle5.setAttribute("cy", "0");
        (_this$circle6 = this.circle) === null || _this$circle6 === void 0 ? void 0 : _this$circle6.setAttribute("r", "0");
        (_this$line7 = this.line) === null || _this$line7 === void 0 ? void 0 : _this$line7.setAttribute("x2", (0, _math.clamp)(this.swipeAnalog.end_position.x, 0, this.maxX).toString());
        (_this$line8 = this.line) === null || _this$line8 === void 0 ? void 0 : _this$line8.setAttribute("y2", (0, _math.clamp)(this.swipeAnalog.end_position.y, 0, this.maxY).toString());
        this.sendInput(_input.ClickAndDragInputType.End, swipeVector);
        this.aiming = false;
      }
    }

  }, _temp), (_applyDecoratedDescriptor(_class.prototype, "setup", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "setup"), _class.prototype)), _class);
  _exports.default = ClickAndDrag;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, ClickAndDrag);
});
;define("controller/components/d-pad", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div class="direction-pad {{unless @show "out-of-view"}}">
    <svg version="1.1" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      <g
        id="up"
        {{on 'touchstart' (fn this.buttonPress 0 true)}}
        {{on 'touchend' (fn this.buttonPress 0 false)}}
        class={{if this.button0Pressed "pressed"}}
      >
        <rect x="30" width="30" height="30" style="" />
        <path d="m54.682 23.385h-19.365l9.6825-16.771z" style="" />
      </g>
      <g
        id="down"
        {{on 'touchstart' (fn this.buttonPress 2 true)}}
        {{on 'touchend' (fn this.buttonPress 2 false)}}
        class={{if this.button2Pressed "pressed"}}
      >
        <rect transform="scale(-1)" x="-60" y="-90" width="30" height="30" />
        <path transform="scale(-1)" d="m-35.318-66.615h-19.365l9.6825-16.771z" />
      </g>
      <g id="left"
        {{on 'touchstart' (fn this.buttonPress 3 true)}}
        {{on 'touchend' (fn this.buttonPress 3 false)}}
        class={{if this.button3Pressed "pressed"}}
      >
        <rect transform="rotate(-90)" x="-60" y="-1.4921e-6" width="30" height="30" />
        <path transform="rotate(-90 12.5 7.5)" d="m-15.318 18.385h-19.365l9.6825-16.771z" />
      </g>
      <g id="right"
        {{on 'touchstart' (fn this.buttonPress 1 true)}}
        {{on 'touchend' (fn this.buttonPress 1 false)}}
        class={{if this.button1Pressed "pressed"}}
      >
        <rect transform="rotate(90)" x="30" y="-90" width="30" height="30" />
        <path transform="rotate(90 71.693 1.6926)" d="m124.68 6.7705-19.365-1e-7 9.6825-16.771z" />
      </g>
      <g id="center"
        {{on 'touchstart' (fn this.buttonPress 4 true)}}
        {{on 'touchend' (fn this.buttonPress 4 false)}}
        class={{if this.button4Pressed "pressed"}}
      >
        <rect x="30" y="30" width="30" height="30" />
        <circle cx="45" cy="45" r="10" />
      </g>
    </svg>
  </div>
  */
  {
    id: "eXbuycGC",
    block: "{\"symbols\":[\"@show\"],\"statements\":[[7,\"div\",true],[11,\"class\",[29,[\"direction-pad \",[28,\"unless\",[[23,1,[]],\"out-of-view\"],null]]]],[8],[0,\"\\n  \"],[7,\"svg\",true],[10,\"version\",\"1.1\"],[10,\"viewBox\",\"0 0 90 90\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n    \"],[7,\"g\",false],[12,\"id\",\"up\"],[12,\"class\",[28,\"if\",[[23,0,[\"button0Pressed\"]],\"pressed\"],null]],[3,\"on\",[\"touchstart\",[28,\"fn\",[[23,0,[\"buttonPress\"]],0,true],null]]],[3,\"on\",[\"touchend\",[28,\"fn\",[[23,0,[\"buttonPress\"]],0,false],null]]],[8],[0,\"\\n      \"],[7,\"rect\",true],[10,\"x\",\"30\"],[10,\"width\",\"30\"],[10,\"height\",\"30\"],[10,\"style\",\"\"],[8],[9],[0,\"\\n      \"],[7,\"path\",true],[10,\"d\",\"m54.682 23.385h-19.365l9.6825-16.771z\"],[10,\"style\",\"\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[7,\"g\",false],[12,\"id\",\"down\"],[12,\"class\",[28,\"if\",[[23,0,[\"button2Pressed\"]],\"pressed\"],null]],[3,\"on\",[\"touchstart\",[28,\"fn\",[[23,0,[\"buttonPress\"]],2,true],null]]],[3,\"on\",[\"touchend\",[28,\"fn\",[[23,0,[\"buttonPress\"]],2,false],null]]],[8],[0,\"\\n      \"],[7,\"rect\",true],[10,\"transform\",\"scale(-1)\"],[10,\"x\",\"-60\"],[10,\"y\",\"-90\"],[10,\"width\",\"30\"],[10,\"height\",\"30\"],[8],[9],[0,\"\\n      \"],[7,\"path\",true],[10,\"transform\",\"scale(-1)\"],[10,\"d\",\"m-35.318-66.615h-19.365l9.6825-16.771z\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[7,\"g\",false],[12,\"id\",\"left\"],[12,\"class\",[28,\"if\",[[23,0,[\"button3Pressed\"]],\"pressed\"],null]],[3,\"on\",[\"touchstart\",[28,\"fn\",[[23,0,[\"buttonPress\"]],3,true],null]]],[3,\"on\",[\"touchend\",[28,\"fn\",[[23,0,[\"buttonPress\"]],3,false],null]]],[8],[0,\"\\n      \"],[7,\"rect\",true],[10,\"transform\",\"rotate(-90)\"],[10,\"x\",\"-60\"],[10,\"y\",\"-1.4921e-6\"],[10,\"width\",\"30\"],[10,\"height\",\"30\"],[8],[9],[0,\"\\n      \"],[7,\"path\",true],[10,\"transform\",\"rotate(-90 12.5 7.5)\"],[10,\"d\",\"m-15.318 18.385h-19.365l9.6825-16.771z\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[7,\"g\",false],[12,\"id\",\"right\"],[12,\"class\",[28,\"if\",[[23,0,[\"button1Pressed\"]],\"pressed\"],null]],[3,\"on\",[\"touchstart\",[28,\"fn\",[[23,0,[\"buttonPress\"]],1,true],null]]],[3,\"on\",[\"touchend\",[28,\"fn\",[[23,0,[\"buttonPress\"]],1,false],null]]],[8],[0,\"\\n      \"],[7,\"rect\",true],[10,\"transform\",\"rotate(90)\"],[10,\"x\",\"30\"],[10,\"y\",\"-90\"],[10,\"width\",\"30\"],[10,\"height\",\"30\"],[8],[9],[0,\"\\n      \"],[7,\"path\",true],[10,\"transform\",\"rotate(90 71.693 1.6926)\"],[10,\"d\",\"m124.68 6.7705-19.365-1e-7 9.6825-16.771z\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[7,\"g\",false],[12,\"id\",\"center\"],[12,\"class\",[28,\"if\",[[23,0,[\"button4Pressed\"]],\"pressed\"],null]],[3,\"on\",[\"touchstart\",[28,\"fn\",[[23,0,[\"buttonPress\"]],4,true],null]]],[3,\"on\",[\"touchend\",[28,\"fn\",[[23,0,[\"buttonPress\"]],4,false],null]]],[8],[0,\"\\n      \"],[7,\"rect\",true],[10,\"x\",\"30\"],[10,\"y\",\"30\"],[10,\"width\",\"30\"],[10,\"height\",\"30\"],[8],[9],[0,\"\\n      \"],[7,\"circle\",true],[10,\"cx\",\"45\"],[10,\"cy\",\"45\"],[10,\"r\",\"10\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}",
    meta: {
      moduleName: "controller/components/d-pad.hbs"
    }
  });

  let DPad = (_class = (_temp = class DPad extends _component.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "button0Pressed", _descriptor, this);

      _initializerDefineProperty(this, "button1Pressed", _descriptor2, this);

      _initializerDefineProperty(this, "button2Pressed", _descriptor3, this);

      _initializerDefineProperty(this, "button3Pressed", _descriptor4, this);

      _initializerDefineProperty(this, "button4Pressed", _descriptor5, this);
    }

    buttonPress(i, down) {
      // Typescript doesn't allow us dynamically string accessing this['string']
      switch (i) {
        case 0:
          this.button0Pressed = down;
          break;

        case 1:
          this.button1Pressed = down;
          break;

        case 2:
          this.button2Pressed = down;
          break;

        case 3:
          this.button3Pressed = down;
          break;

        case 4:
          this.button4Pressed = down;
          break;
      }

      this.args.onPress(i, down);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "button0Pressed", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "button1Pressed", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "button2Pressed", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "button3Pressed", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "button4Pressed", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "buttonPress", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "buttonPress"), _class.prototype)), _class);
  _exports.default = DPad;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, DPad);
});
;define("controller/components/help-button", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div
    id="help-button"
    class={{unless @show 'out-of-view'}}
    {{on "touchstart" @onPress}}
  >
    <svg id="help-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={{@bgColor}}>
      <circle r="40" cx="53" cy="53" fill="#000000" opacity="0.4" />
      <circle r="40" cx="50" cy="50" />
      <text x="50" y="62.5" font-size="35" text-anchor="middle" fill={{@color}}>?</text>
    </svg>
  </div>
  */
  {
    id: "3ELncJsJ",
    block: "{\"symbols\":[\"@show\",\"@onPress\",\"@bgColor\",\"@color\"],\"statements\":[[7,\"div\",false],[12,\"id\",\"help-button\"],[12,\"class\",[28,\"unless\",[[23,1,[]],\"out-of-view\"],null]],[3,\"on\",[\"touchstart\",[23,2,[]]]],[8],[0,\"\\n  \"],[7,\"svg\",true],[10,\"id\",\"help-icon\"],[10,\"viewBox\",\"0 0 100 100\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[11,\"fill\",[23,3,[]]],[8],[0,\"\\n    \"],[7,\"circle\",true],[10,\"r\",\"40\"],[10,\"cx\",\"53\"],[10,\"cy\",\"53\"],[10,\"fill\",\"#000000\"],[10,\"opacity\",\"0.4\"],[8],[9],[0,\"\\n    \"],[7,\"circle\",true],[10,\"r\",\"40\"],[10,\"cx\",\"50\"],[10,\"cy\",\"50\"],[8],[9],[0,\"\\n    \"],[7,\"text\",true],[10,\"x\",\"50\"],[10,\"y\",\"62.5\"],[10,\"font-size\",\"35\"],[10,\"text-anchor\",\"middle\"],[11,\"fill\",[23,4,[]]],[8],[0,\"?\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}",
    meta: {
      moduleName: "controller/components/help-button.hbs"
    }
  });

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("controller/components/help-modal", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div
    class="modal {{unless @show "out-of-view"}}"
    id="help-modal"
    style={{@bgColor}}
  >
    <div class="modal-content" style={{@color}}>
      <div class="modal-close" {{on "touchstart" @onClose}}>&times;</div>
      <h3 class="modal-title">Help</h3>
      <p class="modal-description" >Game description here</p>
    </div>
  </div>
  */
  {
    id: "InT2w+T3",
    block: "{\"symbols\":[\"@show\",\"@bgColor\",\"@color\",\"@onClose\"],\"statements\":[[7,\"div\",true],[11,\"class\",[29,[\"modal \",[28,\"unless\",[[23,1,[]],\"out-of-view\"],null]]]],[10,\"id\",\"help-modal\"],[11,\"style\",[23,2,[]]],[8],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"modal-content\"],[11,\"style\",[23,3,[]]],[8],[0,\"\\n    \"],[7,\"div\",false],[12,\"class\",\"modal-close\"],[3,\"on\",[\"touchstart\",[23,4,[]]]],[8],[0,\"\xD7\"],[9],[0,\"\\n    \"],[7,\"h3\",true],[10,\"class\",\"modal-title\"],[8],[0,\"Help\"],[9],[0,\"\\n    \"],[7,\"p\",true],[10,\"class\",\"modal-description\"],[8],[0,\"Game description here\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}",
    meta: {
      moduleName: "controller/components/help-modal.hbs"
    }
  });

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("controller/components/keyboard", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div class="airconsole_keyboard_component">
    <div id="airconsole_keyboard_display"
      class={{unless @show "out-of-view"}}
      {{did-insert this.setup}}
    />
    <div id="airconsole_keyboard" />
  </div>
  */
  {
    id: "nzgKKurB",
    block: "{\"symbols\":[\"@show\"],\"statements\":[[7,\"div\",true],[10,\"class\",\"airconsole_keyboard_component\"],[8],[0,\"\\n  \"],[7,\"div\",false],[12,\"id\",\"airconsole_keyboard_display\"],[12,\"class\",[28,\"unless\",[[23,1,[]],\"out-of-view\"],null]],[3,\"did-insert\",[[23,0,[\"setup\"]]]],[8],[9],[0,\"\\n  \"],[7,\"div\",true],[10,\"id\",\"airconsole_keyboard\"],[8],[9],[0,\"\\n\"],[9]],\"hasEval\":false}",
    meta: {
      moduleName: "controller/components/keyboard.hbs"
    }
  });

  let Keyboard = (_class = (_temp = class Keyboard extends _component.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "state", _descriptor, this);

      this.keyboard = void 0;
    }

    setup(element) {
      let keyboard = new AirConsoleKeyboard('airconsole_keyboard');
      this.args.setup(keyboard, 'airconsole_keyboard_display', element);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "state", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "setup", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "setup"), _class.prototype)), _class);
  _exports.default = Keyboard;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Keyboard);
});
;define("controller/components/list-select", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div class="list-select {{unless @show "out-of-view"}}">
    <h3>Select one:</h3>
    <ul>
      {{#each @data as |item index|}}
        <li
          class={{if (eq index this.selectedIndex) "selected"}}
          {{on "touchstart" (fn this.select index)}}
        >
          {{item}}
        </li>
      {{/each}}
    </ul>
    <button
      disabled={{this.disabled}}
      {{on "touchstart" this.submit}}
    >
      Submit
    </button>
  </div>
  */
  {
    id: "rauWnbZJ",
    block: "{\"symbols\":[\"item\",\"index\",\"@show\",\"@data\"],\"statements\":[[7,\"div\",true],[11,\"class\",[29,[\"list-select \",[28,\"unless\",[[23,3,[]],\"out-of-view\"],null]]]],[8],[0,\"\\n  \"],[7,\"h3\",true],[8],[0,\"Select one:\"],[9],[0,\"\\n  \"],[7,\"ul\",true],[8],[0,\"\\n\"],[4,\"each\",[[23,4,[]]],null,{\"statements\":[[0,\"      \"],[7,\"li\",false],[12,\"class\",[28,\"if\",[[28,\"eq\",[[23,2,[]],[23,0,[\"selectedIndex\"]]],null],\"selected\"],null]],[3,\"on\",[\"touchstart\",[28,\"fn\",[[23,0,[\"select\"]],[23,2,[]]],null]]],[8],[0,\"\\n        \"],[1,[23,1,[]],false],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[9],[0,\"\\n  \"],[7,\"button\",false],[12,\"disabled\",[23,0,[\"disabled\"]]],[3,\"on\",[\"touchstart\",[23,0,[\"submit\"]]]],[8],[0,\"\\n    Submit\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}",
    meta: {
      moduleName: "controller/components/list-select.hbs"
    }
  });

  let ListSelect = (_class = (_temp = class ListSelect extends _component.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "selectedIndex", _descriptor, this);
    }

    get disabled() {
      return this.selectedIndex === null || this.selectedIndex === undefined;
    }

    select(index) {
      this.selectedIndex = index;
      this.args.onSelect(this.selectedIndex, false);
    }

    submit() {
      if (!this.disabled) {
        this.args.onSelect(this.selectedIndex, true);
      }
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "selectedIndex", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "select", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "select"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "submit", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "submit"), _class.prototype)), _class);
  _exports.default = ListSelect;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, ListSelect);
});
;define("controller/components/press-anywhere-button", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div
    id="press-anywhere-button"
    class={{unless @show 'out-of-view'}}
    {{on "touchstart" @onPress}}
  />
  */
  {
    id: "4mKSEumL",
    block: "{\"symbols\":[\"@show\",\"@onPress\"],\"statements\":[[7,\"div\",false],[12,\"id\",\"press-anywhere-button\"],[12,\"class\",[28,\"unless\",[[23,1,[]],\"out-of-view\"],null]],[3,\"on\",[\"touchstart\",[23,2,[]]]],[8],[9]],\"hasEval\":false}",
    meta: {
      moduleName: "controller/components/press-anywhere-button.hbs"
    }
  });

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("controller/components/sound-button", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div
    id="sound-button"
    class={{unless @show 'out-of-view'}}
    {{on "touchstart" @onPress}}
  >
    <svg id="my-sound-color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={{@color}}>
      <circle r="40" cx="53" cy="53" fill="#000000" opacity="0.4" />
      <circle r="40" cx="50" cy="50" />
    </svg>
  </div>
  */
  {
    id: "FlUgXGvZ",
    block: "{\"symbols\":[\"@show\",\"@onPress\",\"@color\"],\"statements\":[[7,\"div\",false],[12,\"id\",\"sound-button\"],[12,\"class\",[28,\"unless\",[[23,1,[]],\"out-of-view\"],null]],[3,\"on\",[\"touchstart\",[23,2,[]]]],[8],[0,\"\\n  \"],[7,\"svg\",true],[10,\"id\",\"my-sound-color\"],[10,\"viewBox\",\"0 0 100 100\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[11,\"fill\",[23,3,[]]],[8],[0,\"\\n    \"],[7,\"circle\",true],[10,\"r\",\"40\"],[10,\"cx\",\"53\"],[10,\"cy\",\"53\"],[10,\"fill\",\"#000000\"],[10,\"opacity\",\"0.4\"],[8],[9],[0,\"\\n    \"],[7,\"circle\",true],[10,\"r\",\"40\"],[10,\"cx\",\"50\"],[10,\"cy\",\"50\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}",
    meta: {
      moduleName: "controller/components/sound-button.hbs"
    }
  });

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember._templateOnlyComponent());

  _exports.default = _default;
});
;define("controller/config/environment.d", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = config;
  /**
   * Type declarations for
   *    import config from './config/environment'
   *
   * For now these need to be managed by the developer
   * since different ember addons can materialize new entries.
   */

  _exports.default = _default;
});
;define("controller/controllers/application", ["exports", "controller/utils/controller-to-screen-messages", "controller/enums/input"], function (_exports, _controllerToScreenMessages, _input) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let ApplicationController = (_class = (_temp = class ApplicationController extends Ember.Controller {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "airconsole", _descriptor, this);

      _initializerDefineProperty(this, "state", _descriptor2, this);

      this.airconsole; // trigger the airconsole connection
    }

    pressAnywhere() {
      this.airconsole.sendMessageToScreen(_controllerToScreenMessages.pressAnywhere);
    }

    pressSoundButton() {
      this.airconsole.sendMessageToScreen(_controllerToScreenMessages.makeSound);
    }

    openCloseHelp(open) {
      this.airconsole.sendMessageToScreen((0, _controllerToScreenMessages.openCloseHelp)(open));
    }

    dpadPress(index, down) {
      this.airconsole.sendMessageToScreen((0, _controllerToScreenMessages.input)(_input.InputType.Dpad, {
        d: down,
        dr: index
      }));
    }

    listItemSelected(index, submitted) {
      this.airconsole.sendMessageToScreen((0, _controllerToScreenMessages.input)(_input.InputType.ListSelect, {
        i: index,
        f: submitted
      }));
    }

    clickAndDragInput(data) {
      this.airconsole.sendMessageToScreen((0, _controllerToScreenMessages.input)(_input.InputType.ClickAndDrag, data));
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "airconsole", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "state", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "pressAnywhere", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "pressAnywhere"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pressSoundButton", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "pressSoundButton"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "openCloseHelp", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "openCloseHelp"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "dpadPress", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "dpadPress"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "listItemSelected", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "listItemSelected"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clickAndDragInput", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "clickAndDragInput"), _class.prototype)), _class);
  _exports.default = ApplicationController;
});
;define("controller/enums/actions", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ScreenToControllerActions = _exports.ControllerToScreenActions = void 0;
  let ControllerToScreenActions;
  _exports.ControllerToScreenActions = ControllerToScreenActions;

  (function (ControllerToScreenActions) {
    ControllerToScreenActions[ControllerToScreenActions["PressAnywhere"] = 0] = "PressAnywhere";
    ControllerToScreenActions[ControllerToScreenActions["MakeSound"] = 1] = "MakeSound";
    ControllerToScreenActions[ControllerToScreenActions["OpenCloseHelp"] = 2] = "OpenCloseHelp";
    ControllerToScreenActions[ControllerToScreenActions["Input"] = 3] = "Input";
  })(ControllerToScreenActions || (_exports.ControllerToScreenActions = ControllerToScreenActions = {}));

  let ScreenToControllerActions;
  _exports.ScreenToControllerActions = ScreenToControllerActions;

  (function (ScreenToControllerActions) {
    ScreenToControllerActions[ScreenToControllerActions["UpdateState"] = 0] = "UpdateState";
    ScreenToControllerActions[ScreenToControllerActions["UpdateColor"] = 1] = "UpdateColor";
    ScreenToControllerActions[ScreenToControllerActions["UpdateMessage"] = 2] = "UpdateMessage";
    ScreenToControllerActions[ScreenToControllerActions["UpdateButtons"] = 3] = "UpdateButtons";
    ScreenToControllerActions[ScreenToControllerActions["UpdateInput"] = 4] = "UpdateInput";
  })(ScreenToControllerActions || (_exports.ScreenToControllerActions = ScreenToControllerActions = {}));
});
;define("controller/enums/game-state", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.GameState = void 0;
  let GameState;
  _exports.GameState = GameState;

  (function (GameState) {
    GameState[GameState["STATE_LOADING"] = 0] = "STATE_LOADING";
    GameState[GameState["STATE_SPECTATING"] = 1] = "STATE_SPECTATING";
    GameState[GameState["STATE_HELP"] = 2] = "STATE_HELP";
    GameState[GameState["STATE_READY"] = 3] = "STATE_READY";
    GameState[GameState["STATE_PRESS_ANYWHERE"] = 4] = "STATE_PRESS_ANYWHERE";
  })(GameState || (_exports.GameState = GameState = {}));
});
;define("controller/enums/input", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ClickAndDragInputType = _exports.InputType = void 0;
  let InputType;
  _exports.InputType = InputType;

  (function (InputType) {
    InputType[InputType["Clear"] = -1] = "Clear";
    InputType[InputType["Keyboard"] = 0] = "Keyboard";
    InputType[InputType["Dpad"] = 1] = "Dpad";
    InputType[InputType["ClickAndDrag"] = 2] = "ClickAndDrag";
    InputType[InputType["ListSelect"] = 3] = "ListSelect";
    InputType[InputType["Button"] = 4] = "Button";
    InputType[InputType["MultiButton"] = 5] = "MultiButton";
    InputType[InputType["TextDisplay"] = 6] = "TextDisplay";
    InputType[InputType["BottomButtonBar"] = 7] = "BottomButtonBar";
    InputType[InputType["TextDisplayWithButtonButtonBar"] = 8] = "TextDisplayWithButtonButtonBar";
  })(InputType || (_exports.InputType = InputType = {}));

  let ClickAndDragInputType;
  _exports.ClickAndDragInputType = ClickAndDragInputType;

  (function (ClickAndDragInputType) {
    ClickAndDragInputType[ClickAndDragInputType["Move"] = 0] = "Move";
    ClickAndDragInputType[ClickAndDragInputType["End"] = 1] = "End";
  })(ClickAndDragInputType || (_exports.ClickAndDragInputType = ClickAndDragInputType = {}));
});
;define("controller/helpers/and", ["exports", "ember-truth-helpers/helpers/and"], function (_exports, _and) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  Object.defineProperty(_exports, "and", {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
});
;define("controller/helpers/app-version", ["exports", "controller/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("controller/helpers/eq", ["exports", "ember-truth-helpers/helpers/equal"], function (_exports, _equal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(_exports, "equal", {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
});
;define("controller/helpers/gt", ["exports", "ember-truth-helpers/helpers/gt"], function (_exports, _gt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(_exports, "gt", {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
;define("controller/helpers/gte", ["exports", "ember-truth-helpers/helpers/gte"], function (_exports, _gte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(_exports, "gte", {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
;define("controller/helpers/is-array", ["exports", "ember-truth-helpers/helpers/is-array"], function (_exports, _isArray) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(_exports, "isArray", {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
;define("controller/helpers/is-empty", ["exports", "ember-truth-helpers/helpers/is-empty"], function (_exports, _isEmpty) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
});
;define("controller/helpers/is-equal", ["exports", "ember-truth-helpers/helpers/is-equal"], function (_exports, _isEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(_exports, "isEqual", {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
;define("controller/helpers/lt", ["exports", "ember-truth-helpers/helpers/lt"], function (_exports, _lt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(_exports, "lt", {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
;define("controller/helpers/lte", ["exports", "ember-truth-helpers/helpers/lte"], function (_exports, _lte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(_exports, "lte", {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
;define("controller/helpers/not-eq", ["exports", "ember-truth-helpers/helpers/not-equal"], function (_exports, _notEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(_exports, "notEq", {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
;define("controller/helpers/not", ["exports", "ember-truth-helpers/helpers/not"], function (_exports, _not) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(_exports, "not", {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
;define("controller/helpers/or", ["exports", "ember-truth-helpers/helpers/or"], function (_exports, _or) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(_exports, "or", {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
});
;define("controller/helpers/xor", ["exports", "ember-truth-helpers/helpers/xor"], function (_exports, _xor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(_exports, "xor", {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
});
;define("controller/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "controller/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("controller/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("controller/initializers/export-application-global", ["exports", "controller/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("controller/modifiers/did-insert", ["exports", "@ember/render-modifiers/modifiers/did-insert"], function (_exports, _didInsert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didInsert.default;
    }
  });
});
;define("controller/modifiers/did-update", ["exports", "@ember/render-modifiers/modifiers/did-update"], function (_exports, _didUpdate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didUpdate.default;
    }
  });
});
;define("controller/modifiers/will-destroy", ["exports", "@ember/render-modifiers/modifiers/will-destroy"], function (_exports, _willDestroy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _willDestroy.default;
    }
  });
});
;define("controller/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("controller/router", ["exports", "controller/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class Router extends Ember.Router {
    constructor(...args) {
      super(...args);
      this.location = _environment.default.locationType;
      this.rootURL = _environment.default.rootURL;
    }

  }

  _exports.default = Router;
  Router.map(function () {});
});
;define("controller/services/airconsole", ["exports", "controller/enums/input", "controller/utils/controller-to-screen-messages"], function (_exports, _input, _controllerToScreenMessages) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let AirconsoleService = (_class = (_temp = class AirconsoleService extends Ember.Service {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "state", _descriptor, this);

      this.airconsole = void 0;
      this.keyboard = void 0;
      this.keyboardDisplay = void 0;
      this.airconsole = new AirConsole();
      this.airconsole.onMessage = this.airconsole_onMessage.bind(this);
      this.airconsole.onCustomDeviceStateChange = this.airconsole_onCustomDeviceStateChange.bind(this);
    }

    airconsole_onMessage(deviceid, data) {
      // console.log("message received from airconsole", this, { deviceid: deviceid, data });
      if (deviceid === AirConsole.SCREEN) {
        if (data.a === 0) {
          // force state change? set global custom device state? does this tigger oncustomdevicestatechange?
          this.airconsole.setCustomDeviceStateProperty("state", data.s);
        }

        this.state.handleMessage(data);
      }
    }

    airconsole_onCustomDeviceStateChange(e, data) {
      // console.log("onCustomDeviceStateChange_airconsole data", e, data);
      if (e === AirConsole.SCREEN) {
        this.state.handleCustomDeviceStateChange(data);
      }
    }

    sendMessageToScreen(data) {
      // console.log(`sendMessageToScreen (device:${this.airconsole.getDeviceId()})`, data);
      this.airconsole.message(AirConsole.SCREEN, data);
    } // Keyboard


    setupAirconsoleKeyboard(keyboard, displayId, keyboardDisplay) {
      this.keyboard = keyboard;
      this.keyboardDisplay = keyboardDisplay;
      keyboard.bind(displayId, {
        onHide: (_input_id, text) => {
          this.sendMessageToScreen((0, _controllerToScreenMessages.input)(_input.InputType.Keyboard, {
            s: text,
            f: true
          }));
        },
        onChange: (_input_id, text) => {
          this.sendMessageToScreen((0, _controllerToScreenMessages.input)(_input.InputType.Keyboard, {
            s: text,
            f: false
          }));
        }
      });
    }

    showKeyboard() {
      this === null || this === void 0 ? void 0 : this.keyboardDisplay.click();
    }

    hideKeyboard() {
      this === null || this === void 0 ? void 0 : this.keyboard.hide();
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "state", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "setupAirconsoleKeyboard", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "setupAirconsoleKeyboard"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showKeyboard", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "showKeyboard"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hideKeyboard", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "hideKeyboard"), _class.prototype)), _class);
  _exports.default = AirconsoleService;
});
;define("controller/services/state", ["exports", "controller/utils/color", "controller/enums/input", "controller/enums/actions", "controller/enums/game-state"], function (_exports, _color, _input, _actions, _gameState) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let StateService = (_class = (_temp = class StateService extends Ember.Service {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "title", _descriptor, this);

      _initializerDefineProperty(this, "message", _descriptor2, this);

      _initializerDefineProperty(this, "gameState", _descriptor3, this);

      _initializerDefineProperty(this, "canJoin", _descriptor4, this);

      _initializerDefineProperty(this, "loading", _descriptor5, this);

      _initializerDefineProperty(this, "inputOpen", _descriptor6, this);

      _initializerDefineProperty(this, "inputType", _descriptor7, this);

      _initializerDefineProperty(this, "canShowHelpButton", _descriptor8, this);

      _initializerDefineProperty(this, "canShowSoundButton", _descriptor9, this);

      _initializerDefineProperty(this, "myColor", _descriptor10, this);

      _initializerDefineProperty(this, "backgroundColor", _descriptor11, this);

      _initializerDefineProperty(this, "listData", _descriptor12, this);

      _initializerDefineProperty(this, "airconsole", _descriptor13, this);
    }

    handleMessage(state) {
      var _state$s, _state$r, _state$g, _state$b, _state$bgr, _state$bgg, _state$bgb, _state$m, _state$h, _state$so;

      switch (state.a) {
        case _actions.ScreenToControllerActions.UpdateState:
          this.gameState = (_state$s = state.s) !== null && _state$s !== void 0 ? _state$s : 0;
          break;

        case _actions.ScreenToControllerActions.UpdateColor:
          this.myColor = (0, _color.rgbToCSS)((_state$r = state.r) !== null && _state$r !== void 0 ? _state$r : 0, (_state$g = state.g) !== null && _state$g !== void 0 ? _state$g : 0, (_state$b = state.b) !== null && _state$b !== void 0 ? _state$b : 0);
          this.backgroundColor = (0, _color.rgbToCSS)((_state$bgr = state.bgr) !== null && _state$bgr !== void 0 ? _state$bgr : 0, (_state$bgg = state.bgg) !== null && _state$bgg !== void 0 ? _state$bgg : 0, (_state$bgb = state.bgb) !== null && _state$bgb !== void 0 ? _state$bgb : 0);
          break;

        case _actions.ScreenToControllerActions.UpdateMessage:
          this.message = (_state$m = state.m) !== null && _state$m !== void 0 ? _state$m : '';
          break;

        case _actions.ScreenToControllerActions.UpdateButtons:
          this.canShowHelpButton = (_state$h = state.h) !== null && _state$h !== void 0 ? _state$h : false;
          this.canShowSoundButton = (_state$so = state.so) !== null && _state$so !== void 0 ? _state$so : false;
          break;

        case _actions.ScreenToControllerActions.UpdateInput:
          if (state.i === _input.InputType.Clear) {
            this.inputOpen = false;
            this.inputType = state.i;
            this.airconsole.hideKeyboard();
          } else if (state.i !== undefined) {
            this.inputOpen = true;
            this.inputType = state.i;

            switch (state.i) {
              case _input.InputType.Keyboard:
                this.airconsole.showKeyboard();
                break;

              case _input.InputType.ListSelect:
                this.listData = state.d;
                break;
            }
          }

          break;

        default:
          console.log("unknown action, maybe you should implement it?", state.a, ...arguments);
          break;
      }
    }

    handleCustomDeviceStateChange(data) {
      if (data.hasOwnProperty("loaded")) {
        this.loading = !data.loaded;
      }

      if (data.hasOwnProperty("canJoin")) {
        this.canJoin = data.canJoin;
      }
    }

    get showTitle() {
      return this.gameState === _gameState.GameState.STATE_LOADING || this.gameState === _gameState.GameState.STATE_SPECTATING;
    }

    get showHelpModal() {
      return this.gameState === _gameState.GameState.STATE_HELP;
    }

    get showHelpButton() {
      return !this.showHelpModal && !this.inputOpen && this.canShowHelpButton;
    }

    get showSoundButton() {
      return !this.showHelpModal && !this.inputOpen && this.canShowSoundButton;
    }

    get showPressAnywhere() {
      return this.gameState === _gameState.GameState.STATE_PRESS_ANYWHERE;
    }

    get showKeyboard() {
      return this.inputOpen && this.inputType === _input.InputType.Keyboard;
    }

    get showDPad() {
      return this.inputOpen && this.inputType === _input.InputType.Dpad;
    }

    get showClickAndDrag() {
      return this.inputOpen && this.inputType === _input.InputType.ClickAndDrag;
    }

    get showListSelect() {
      return this.inputOpen && this.inputType === _input.InputType.ListSelect;
    }

    get myColorStyle() {
      return Ember.String.htmlSafe("color:".concat(this.myColor));
    }

    get myBackgroundStyle() {
      return Ember.String.htmlSafe("background:".concat(this.myColor));
    }

    get bgColorStyle() {
      return Ember.String.htmlSafe("color:".concat(this.backgroundColor));
    }

    get bgBackgroundStyle() {
      return Ember.String.htmlSafe("background:".concat(this.backgroundColor));
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "title", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "Airconsole Unity Template";
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "message", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "Loading...";
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "gameState", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return _gameState.GameState.STATE_LOADING;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "canJoin", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "loading", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return true;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "inputOpen", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "inputType", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return _input.InputType.Clear;
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "canShowHelpButton", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "canShowSoundButton", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "myColor", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "#FFFFFF";
    }
  }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "backgroundColor", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "#000000";
    }
  }), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "listData", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "airconsole", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class); // DO NOT DELETE: this is how TypeScript knows how to look up your services.

  _exports.default = StateService;
});
;define("controller/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "QxzJBuhu",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"id\",\"airconsole-controller-app\"],[8],[0,\"\\n  \"],[7,\"h1\",true],[11,\"class\",[29,[\"title \",[28,\"unless\",[[23,0,[\"state\",\"showTitle\"]],\"out-of-view\"],null]]]],[11,\"style\",[23,0,[\"state\",\"myColorStyle\"]]],[8],[0,\"\\n    \"],[1,[23,0,[\"state\",\"title\"]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[7,\"p\",true],[11,\"class\",[29,[\"message \",[28,\"unless\",[[23,0,[\"state\",\"message\"]],\"out-of-view\"],null]]]],[11,\"style\",[23,0,[\"state\",\"myColorStyle\"]]],[8],[0,\"\\n    \"],[1,[23,0,[\"state\",\"message\"]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[5,\"sound-button\",[],[[\"@show\",\"@color\",\"@onPress\"],[[23,0,[\"state\",\"showSoundButton\"]],[23,0,[\"state\",\"myColor\"]],[23,0,[\"pressSoundButton\"]]]]],[0,\"\\n\\n  \"],[5,\"help-button\",[],[[\"@show\",\"@color\",\"@bgColor\",\"@onPress\"],[[23,0,[\"state\",\"showHelpButton\"]],[23,0,[\"state\",\"backgroundColor\"]],[23,0,[\"state\",\"myColor\"]],[28,\"fn\",[[23,0,[\"openCloseHelp\"]],true],null]]]],[0,\"\\n\\n  \"],[5,\"press-anywhere-button\",[],[[\"@show\",\"@onPress\"],[[23,0,[\"state\",\"showPressAnywhere\"]],[23,0,[\"pressAnywhere\"]]]]],[0,\"\\n\\n  \"],[5,\"help-modal\",[],[[\"@show\",\"@bgColor\",\"@color\",\"@onClose\"],[[23,0,[\"state\",\"showHelpModal\"]],[23,0,[\"state\",\"myBackgroundStyle\"]],[23,0,[\"state\",\"myColorStyle\"]],[28,\"fn\",[[23,0,[\"openCloseHelp\"]],false],null]]]],[0,\"\\n\\n  \"],[5,\"keyboard\",[],[[\"@show\",\"@setup\"],[[23,0,[\"state\",\"showKeyboard\"]],[23,0,[\"airconsole\",\"setupAirconsoleKeyboard\"]]]]],[0,\"\\n\\n  \"],[5,\"d-pad\",[],[[\"@show\",\"@onPress\"],[[23,0,[\"state\",\"showDPad\"]],[23,0,[\"dpadPress\"]]]]],[0,\"\\n\\n  \"],[5,\"click-and-drag\",[],[[\"@show\",\"@color\",\"@onInput\"],[[23,0,[\"state\",\"showClickAndDrag\"]],[23,0,[\"state\",\"myColor\"]],[23,0,[\"clickAndDragInput\"]]]]],[0,\"\\n\\n  \"],[5,\"list-select\",[],[[\"@show\",\"@data\",\"@onSelect\"],[[23,0,[\"state\",\"showListSelect\"]],[23,0,[\"state\",\"listData\"]],[23,0,[\"listItemSelected\"]]]]],[0,\"\\n\"],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "controller/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("controller/utils/color", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.rgbToCSS = rgbToCSS;

  function rgbToCSS(r, g, b) {
    return "rgba(" + r + "," + g + "," + b + ",1)";
  }
});
;define("controller/utils/controller-to-screen-messages", ["exports", "controller/enums/actions"], function (_exports, _actions) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.input = _exports.openCloseHelp = _exports.makeSound = _exports.pressAnywhere = void 0;
  const pressAnywhere = {
    a: _actions.ControllerToScreenActions.PressAnywhere
  };
  _exports.pressAnywhere = pressAnywhere;
  const makeSound = {
    a: _actions.ControllerToScreenActions.MakeSound
  };
  _exports.makeSound = makeSound;

  const openCloseHelp = open => ({
    a: _actions.ControllerToScreenActions.OpenCloseHelp,
    o: open
  });

  _exports.openCloseHelp = openCloseHelp;

  const input = (i, d) => ({
    a: _actions.ControllerToScreenActions.Input,
    i,
    d
  });

  _exports.input = input;
});
;define("controller/utils/math", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.clamp = clamp;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
});
;

;define('controller/config/environment', [], function() {
  var prefix = 'controller';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("controller/app")["default"].create({"name":"controller","version":"0.0.0+927031e8"});
          }
        
//# sourceMappingURL=controller.map
