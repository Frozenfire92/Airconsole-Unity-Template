# Screen to Controller (StC)
The screen always sends json with at least the following
```
{
  "a": 0
}
```

Where `a` represents action number. You can then add any valid json as you extend this


### StC Action 0: Change controller state
```
{
  "a": 0,
  "s": 1
}
```

`s` represents controller state. See `AirConsoleControllerState` enum in Unity which matches to the top of app.js for the controller.


### StC Action 1: Change controller color
```
{
  "a": 1,
  "r": 0,
  "g": 128,
  "b": 255,
  "bgr": 0,
  "bgg": 128,
  "bgb": 255
}
```

Color values are from 0-255
`r`, `g`, `b` represent players red, green, and blue channels
`bgr`, `bgg`, `bgb` represent background red, green, and blue channels


### StC Action 2: Change controller message
```
{
  "a": 2,
  "m": "Press anywhere to play"
}
```

`m` is a string message. Send null to clear controller screen


### StC Action 3: Update controller button states
```
{
  "a": 3,
  "h": true,
  "s": true
}
```

`h` represents the help button
`s` represents the make sound button


### StC Action 4: Show input
```
{
  "a": 4,
  "i": 0,
  "d": {} // optional arbitrary json object unique to different inputs
}
```

`i` represents the input to show. Below is a reference

```
-1 hide input
0 Keyboard
1 Dpad
2 Click and Drag
3 List Select
4 Button
5 Multi Button
6 Text Display
7 Bottom Button Bar
8 Text Display With Bottom Button Bar,
```

-----------


# Controller to Screen (CtS)
The controller always sends json with at least the following
```
{
  "a": 0
}
```

Where `a` represents action number. You can then add any valid json as you extend this


### CtS Action 0: Controller press anywhere
```
{
  "a": 0
}
```

This is used for "joining" the game, but should be easy to extend


### CtS Action 1: Controller make sound
```
{
  "a": 1
}
```

This is used for making a noise. It uses [underscore's throttle](https://underscorejs.org/#throttle) to prevent it from being spammed


### CtS Action 2: Controller open/close help
```
{
  "a": 2,
  "o": true
}
```

`o` represents whether the controller wants to open(true) or close(false) the on controller help modal. The screen must actually decide whether this is a valid operation or not. If so change the controller state to 2.


### CtS Action 3: Controller input
```
{
  "a": 3,
  "i": 0
  "d": "User input"
}
```

This is called when input comes in. `i` corresponds to the list above for show input. `d` is specific to different input types and valid json