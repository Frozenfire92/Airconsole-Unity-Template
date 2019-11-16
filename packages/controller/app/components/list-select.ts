import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface ListSelectArgs {
  onSelect: (index: number, submitted: boolean) => void
}

export default class ListSelect extends Component<ListSelectArgs> {
  @tracked selectedIndex!: number;

  get disabled() {
    return this.selectedIndex === null || this.selectedIndex === undefined;
  }

  @action select(index: number) {
    this.selectedIndex = index;
    this.args.onSelect(this.selectedIndex, false);
  }

  @action submit() {
    if (!this.disabled) {
      this.args.onSelect(this.selectedIndex, true);
    }
  }
}
