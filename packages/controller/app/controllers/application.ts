import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

import AirconsoleService from 'controller/services/airconsole';
import StateService from 'controller/services/state';

export default class ApplicationController extends Controller {
  @service airconsole!: AirconsoleService;
  @service state!: StateService;

  constructor() {
    super(...arguments);
    this.airconsole; // trigger the airconsole connection
  }
}
