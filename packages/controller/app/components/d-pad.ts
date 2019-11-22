import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface DPadArgs {
  show: boolean
  onPress: (index: number, down: boolean) => void
}

export default class DPad extends Component<DPadArgs> {
  @tracked button0Pressed: boolean = false;
  @tracked button1Pressed: boolean = false;
  @tracked button2Pressed: boolean = false;
  @tracked button3Pressed: boolean = false;
  @tracked button4Pressed: boolean = false;

  @action buttonPress(i: number, down: boolean) {
    // Typescript doesn't allow us dynamically string accessing this['string']
    switch (i) {
      case 0: this.button0Pressed = down; break;
      case 1: this.button1Pressed = down; break;
      case 2: this.button2Pressed = down; break;
      case 3: this.button3Pressed = down; break;
      case 4: this.button4Pressed = down; break;
    }
    this.args.onPress(i, down);
  }
}
