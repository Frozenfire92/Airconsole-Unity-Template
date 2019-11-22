import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';

import { InputType } from 'controller/enums/input';
import StateService from 'controller/services/state';
import { input } from 'controller/utils/controller-to-screen-messages';

export default class AirconsoleService extends Service {
  @service state!: StateService;

  airconsole: AirConsole;

  constructor() {
    super(...arguments);
    this.airconsole = new AirConsole();
    this.airconsole.onMessage = this.airconsole_onMessage.bind(this);
    this.airconsole.onCustomDeviceStateChange = this.airconsole_onCustomDeviceStateChange.bind(this);
  }

  airconsole_onMessage(deviceid: number, data: ScreenToControllerMessage) {
    // console.log("message received from airconsole", this, { deviceid: deviceid, data });
    if (deviceid === AirConsole.SCREEN) {
      if (data.a === 0) { // force state change? set global custom device state? does this tigger oncustomdevicestatechange?
        this.airconsole.setCustomDeviceStateProperty("state", data.s);
      }
      this.state.handleMessage(data);
    }
  }

  airconsole_onCustomDeviceStateChange(e: number, data: any) {
    // console.log("onCustomDeviceStateChange_airconsole data", e, data);
    if (e === AirConsole.SCREEN) {
      this.state.handleCustomDeviceStateChange(data);
    }
  }

  sendMessageToScreen(data: ControllerToScreenMessage) {
    // console.log(`sendMessageToScreen (device:${this.airconsole.getDeviceId()})`, data);
    this.airconsole.message(AirConsole.SCREEN, data);
  }

  // Keyboard
  keyboard!: AirConsoleKeyboard;
  keyboardDisplay!: HTMLElement;
  @action setupAirconsoleKeyboard(keyboard: AirConsoleKeyboard, displayId: string, keyboardDisplay: HTMLElement) {
    this.keyboard = keyboard;
    this.keyboardDisplay = keyboardDisplay;
    keyboard.bind(displayId, {
      onHide: (_input_id: string, text: string) => {
        this.sendMessageToScreen(input(InputType.Keyboard, {
          s: text,
          f: true
        }));
      },
      onChange: (_input_id: string, text: string) => {
        this.sendMessageToScreen(input(InputType.Keyboard, {
          s: text,
          f: false
        }));
      }
    })
  }

  @action showKeyboard() {
    this?.keyboardDisplay.click();
  }

  @action hideKeyboard() {
    this?.keyboard.hide();
  }
}
