import Service, { inject as service } from '@ember/service';



import StateService from 'controller/services/state';

export default class AirconsoleService extends Service {
  @service state!: StateService;

  airconsole: AirConsole;

  constructor() {
    super(...arguments);
    this.airconsole = new AirConsole;
    this.airconsole.onMessage = this.airconsole_onMessage;
    this.airconsole.onCustomDeviceStateChange = this.airconsole_onCustomDeviceStateChange;
  }

  // TODO mock data interface out
  airconsole_onMessage(deviceid: number, data: ScreenToControllerMessage) {
    console.log("message received from airconsole", { deviceid: deviceid, data });
    if (deviceid === AirConsole.SCREEN) {
      if (data.a === 0) { // force state change? set global custom device state?
        this.airconsole.setCustomDeviceStateProperty("state", data.s);
      }
      this.state.handleMessage(data);
    }
  }

  airconsole_onCustomDeviceStateChange(e: number, data: any) {
    console.log("onCustomDeviceStateChange_airconsole data", e, data);
    if (e === AirConsole.SCREEN) {
      this.state.handleCustomDeviceStateChange(data);
    }
  }
}
