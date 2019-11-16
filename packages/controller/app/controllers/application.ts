import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

import AirconsoleService from 'controller/services/airconsole';
import StateService from 'controller/services/state';
import { pressAnywhere, openCloseHelp, makeSound } from 'controller/utils/controller-to-screen-messages';


export default class ApplicationController extends Controller {
  @service airconsole!: AirconsoleService;
  @service state!: StateService;

  constructor() {
    super(...arguments);
    this.airconsole; // trigger the airconsole connection
  }

  @action pressAnywhere() {
    this.airconsole.sendMessageToScreen(pressAnywhere);
  }

  @action pressSoundButton() {
    this.airconsole.sendMessageToScreen(makeSound);
  }

  @action openCloseHelp(open: boolean) {
    this.airconsole.sendMessageToScreen(openCloseHelp(open));
  }
}
