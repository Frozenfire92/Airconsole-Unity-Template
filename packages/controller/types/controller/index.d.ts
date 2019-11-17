import Ember from 'ember';
import { ControllerToScreenActions, ScreenToControllerActions } from 'controller/enums/actions';
import { GameState } from 'controller/enums/game-state';
import { InputType } from 'controller/enums/input';

declare global {
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}

  interface ScreenToControllerMessage {
    /**
     * action
     */
    a: ScreenToControllerActions

    /**
     * state
     */
    s?: GameState

    /**
     * red, 0-255
     */
    r?: number

    /**
     * green, 0-255
     */
    g?: number

    /**
     * blue, 0-255
     */
    b?: number

    /**
     * background red, 0-255
     */
    bgr?: number

    /**
     * background green, 0-255
     */
    bgg?: number

    /**
     * background blue, 0-255
     */
    bgb?: number

    /**
     * messeage
     */
    m?: string

    /**
     * Show help button
     */
    h?: boolean

    /**
     * Show sound button
     */
    so?: boolean

    /**
     * input to show
     */
    i?: InputType

    /**
     * Optional data for input and custom actions
     */
    d?: any
  }

  interface ControllerToScreenMessage {
    /**
     * action
     */
    a: ControllerToScreenActions

    /**
     * o represents whether the controller wants to open(true) or close(false) the on controller help modal. The screen must actually decide whether this is a valid operation or not. If so change the controller state to 2.
     */
    o?: boolean

    /**
     * i
     */
    i?: InputType

    /**
     * Optional data for input and custom actions
     */
    d?: any
  }
}

export {};
