import Service from '@ember/service';
import { rgbToCSS } from 'controller/utils/color';

export default class StateService extends Service {
  title = "Airconsole Unity Template";
  message = "Loading...";
  state = 0;
  canJoin = false;
  loading = true;
  inputOpen = false;
  canShowHelpButton = false;
  canShowSoundButton = false;
  myColor = "#FFFFFF";
  backgroundColor = "#000000";

  public handleMessage(state: ScreenToControllerMessage) {
    switch (state.a) {
      case 0:
        this.state = state.s ?? 0;
        break;
      case 1:
        this.myColor = rgbToCSS(state.r, state.g, state.b);
        this.backgroundColor = rgbToCSS(state.bgr, state.bgg, state.bgb);
        break;
      case 2:
        this.message = state.m ?? '';
        break;
      case 3:
        this.canShowHelpButton = state.h ?? false;
        this.canShowSoundButton = state.so ?? false;
        break;
      case 4:
        if (state.i === -1) {
          this.inputOpen = !1;
          // if (this.$refs.keyboard) { this.$refs.keyboard.hide(); }
          // if (this.$refs.dpad) { this.$refs.dpad.hide(); }
          // if (this.$refs.clickAndDrag) { this.$refs.clickAndDrag.hide(); }
          // if (this.$refs.listSelect) { this.$refs.listSelecstate.hide(); }
        }
        else {
          switch (state.i) {
            case 0:
              // if (this.$refs.keyboard) {
              //   this.$refs.keyboard.show();
              //   this.inputOpen = !0;
              // }
              break;
            case 1:
              // if (this.$refs.dpad) {
              //   this.$refs.dpad.show();
              //   this.inputOpen = !0;
              // }
              break;
            case 2:
              // if (this.$refs.clickAndDrag) {
              //   this.$refs.clickAndDrag.show();
              //   this.inputOpen = !0;
              // }
              break;
            case 3:
              // if (this.$refs.listSelect) {
              //   this.$refs.listSelecstate.show(data);
              //   this.inputOpen = !0;
              // }
              break;
          }
        }
        break;
      default:
        console.log("unknown action, maybe you should implement it?", state.a, ...arguments);
        break;
    }
  }

  public handleCustomDeviceStateChange(data: any) {
    if (data.hasOwnProperty("loaded")) {
      this.loading = !data.loaded;
    }
    if (data.hasOwnProperty("canJoin")) {
      this.canJoin = data.canJoin;
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'state': StateService;
  }
}
