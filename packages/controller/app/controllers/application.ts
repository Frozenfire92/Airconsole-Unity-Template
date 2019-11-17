import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

import AirconsoleService from 'controller/services/airconsole';
import StateService from 'controller/services/state';
import { pressAnywhere, openCloseHelp, makeSound, input } from 'controller/utils/controller-to-screen-messages';
import { InputType } from 'controller/enums/input';


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

  @action dpadPress(index: number, down: boolean) {
    this.airconsole.sendMessageToScreen(input(InputType.Dpad, { d: down, dr: index }))
  }

  @action listItemSelected(index: number, submitted: boolean) {
    this.airconsole.sendMessageToScreen(input(InputType.ListSelect, { i: index, f: submitted }))
  }

  @action clickAndDragInput(data: any) {
    this.airconsole.sendMessageToScreen(input(InputType.ClickAndDrag, data))
  }
}
