import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import StateService from 'controller/services/state';

interface KeyboardArgs {
  show: boolean,
  setup: (keyboard: AirConsoleKeyboard, displayId: string, displayElement: Element) => void
}

export default class Keyboard extends Component<KeyboardArgs> {
  @service state!: StateService;
  keyboard!: any;

  @action setup(element: Element) {
    let keyboard = new AirConsoleKeyboard('airconsole_keyboard');
    this.args.setup(keyboard, 'airconsole_keyboard_display', element);
  }
}
