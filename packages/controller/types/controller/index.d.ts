import Ember from 'ember';

declare global {
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}

  enum InputType {
    Clear = -1,
    Keyboard = 0,
    Dpad = 1,
    ClickAndDrag = 2,
    ListSelect = 3,
    Button = 4,
    MultiButton = 5,
    TextDisplay = 6,
    BottomButtonBar = 7,
    TextDisplayWithButtonButtonBar = 8
  }

  enum ScreenToControllerActions {
    UpdateState,
    UpdateColor,
    UpdateMessage,
    UpdateButtons,
    UpdateInput
  }

  interface ScreenToControllerMessage {
    /**
     * action
     */
    a: ScreenToControllerActions

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
    i?: InputType

    /**
     * Optional data for input and custom actions
     */
    d?: any
  }

  enum ControllerToScreenActions {
    PressAnywhere,
    MakeSound,
    OpenCloseHelp,
    Input
  }

  interface ControllerToScreenMessage {
    /**
     * action
     */
    a: ControllerToScreenActions

    /**
     * o represents whether the controller wants to open(true) or close(false) the on controller help modal. The screen must actually decide whether this is a valid operation or not. If so change the controller state to 2.
     */
    o: boolean

    /**
     * i
     */
    i: InputType

    /**
     * Optional data for input and custom actions
     */
    d?: any
  }
}

export {};
