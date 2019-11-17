import { ControllerToScreenActions } from "controller/enums/actions";
import { InputType } from "controller/enums/input";

export const pressAnywhere: ControllerToScreenMessage = { a: ControllerToScreenActions.PressAnywhere };
export const makeSound: ControllerToScreenMessage = { a: ControllerToScreenActions.MakeSound };
export const openCloseHelp = (open: boolean) : ControllerToScreenMessage => ({
  a: ControllerToScreenActions.OpenCloseHelp,
  o: open
});
export const input = (i: InputType, d: any) : ControllerToScreenMessage => ({
  a: ControllerToScreenActions.Input,
  i,
  d
});
