import Service, { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import { tracked } from '@glimmer/tracking';

import { rgbToCSS } from 'controller/utils/color';
import { InputType } from 'controller/enums/input';
import { ScreenToControllerActions } from 'controller/enums/actions';
import { GameState } from 'controller/enums/game-state';
import AirconsoleService from './airconsole';

export default class StateService extends Service {
  @tracked title = "Airconsole Unity Template";
  @tracked message = "Loading...";
  @tracked gameState: GameState = GameState.STATE_LOADING;
  @tracked canJoin = false;
  @tracked loading = true;
  @tracked inputOpen = false;
  @tracked inputType: InputType = InputType.Clear;
  @tracked canShowHelpButton = false;
  @tracked canShowSoundButton = false;
  @tracked myColor = "#FFFFFF";
  @tracked backgroundColor = "#000000";
  @tracked listData: string[] = [];

  @service airconsole!: AirconsoleService;

  handleMessage(state: ScreenToControllerMessage) {
    switch (state.a) {
      case ScreenToControllerActions.UpdateState:
        this.gameState = state.s ?? 0;
        break;
      case ScreenToControllerActions.UpdateColor:
        this.myColor = rgbToCSS(state.r ?? 0, state.g ?? 0, state.b ?? 0);
        this.backgroundColor = rgbToCSS(state.bgr ?? 0, state.bgg ?? 0, state.bgb ?? 0);
        break;
      case ScreenToControllerActions.UpdateMessage:
        this.message = state.m ?? '';
        break;
      case ScreenToControllerActions.UpdateButtons:
        this.canShowHelpButton = state.h ?? false;
        this.canShowSoundButton = state.so ?? false;
        break;
      case ScreenToControllerActions.UpdateInput:
        if (state.i === InputType.Clear) {
          this.inputOpen = false;
          this.inputType = state.i;
          this.airconsole.hideKeyboard();
        }
        else if (state.i !== undefined) {
          this.inputOpen = true;
          this.inputType = state.i;

          switch (state.i) {
            case InputType.Keyboard:
              this.airconsole.showKeyboard();
              break;
            case InputType.ListSelect:
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

  handleCustomDeviceStateChange(data: any) {
    if (data.hasOwnProperty("loaded")) {
      this.loading = !data.loaded;
    }
    if (data.hasOwnProperty("canJoin")) {
      this.canJoin = data.canJoin;
    }
  }

  get showTitle() {
    return this.gameState === GameState.STATE_LOADING
      || this.gameState === GameState.STATE_SPECTATING;
  }

  get showHelpModal() {
    return this.gameState === GameState.STATE_HELP;
  }

  get showHelpButton() {
    return !this.showHelpModal && !this.inputOpen && this.canShowHelpButton;
  }

  get showSoundButton() {
    return !this.showHelpModal && !this.inputOpen && this.canShowSoundButton;
  }

  get showPressAnywhere() {
    return this.gameState === GameState.STATE_PRESS_ANYWHERE;
  }

  get showKeyboard() {
    return this.inputOpen && this.inputType === InputType.Keyboard;
  }

  get showDPad() {
    return this.inputOpen && this.inputType === InputType.Dpad;
  }

  get showClickAndDrag() {
    return this.inputOpen && this.inputType === InputType.ClickAndDrag;
  }

  get showListSelect() {
    return this.inputOpen && this.inputType === InputType.ListSelect;
  }

  get myColorStyle() {
    return htmlSafe(`color:${this.myColor}`);
  }

  get myBackgroundStyle() {
    return htmlSafe(`background:${this.myColor}`);
  }

  get bgColorStyle() {
    return htmlSafe(`color:${this.backgroundColor}`);
  }

  get bgBackgroundStyle() {
    return htmlSafe(`background:${this.backgroundColor}`);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'state': StateService;
  }
}
