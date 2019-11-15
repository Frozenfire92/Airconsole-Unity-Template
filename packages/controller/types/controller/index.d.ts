import Ember from 'ember';

declare global {
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}

  enum InputType {
    hideInput = -1,
    keyboard = 0,
    dpad = 1,
    clickAndDrag = 2,
    ListSelect = 3,
    Button = 4,
    MultiButton = 5,
    TextDisplay = 6,
    BottomButtonBar = 7,
    TextDisplayWithButtonButtonBar = 8
  }

  interface ScreenToControllerMessage {
    /**
     * action
     */
    a: number

    /**
     * state
     */
    s?: number

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
    i?: number

    /**
     * Optional data for input and custom actions
     */
    d?: any
  }

  interface ControllerToScreenMessage {

  }
}

export {};
