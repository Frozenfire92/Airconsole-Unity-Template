# AirConsole Unity Template

A complete template you can use to make AirConsole games with Unity, controller included.

## Prerequisites

- Unity (v? 2019+?)
- Node.js + npm

## Installation

- Attain a copy of this this repository (fork/clone/download/copy/etc)
- open [packages/unity](packages/unity) in Unity
- open [packages/controller](packages/controller) and install the dependencies: `npm i`

## Usage

- Modify the controller and use the live reload server: `npm start`
- Build for usage in Unity:
  - `npm run build`
  - `npm run build:prod` for release
- Builds will update [WebGLTemplates/AirConsoleDev/controller.html](packages/unity/Assets/WebGLTemplates/AirConsoleDev/controller.html) and [WebGLTemplates/AirConsole/controller](packages/unity/Assets/WebGLTemplates/AirConsole/controller) in the Unity project.
- You then must play a scene with AirConsole in Unity for the `controller.html` to be copied from the Dev to non Dev folder

## About

This is designed to be a framework or template you can use, copy, and modify to quickly get up and running with Unity and AirConsole. The AirConsole "screen" is a Unity project with some common needs implemented. The controller is an Ember Octane Typescript app with common controls and communication taken care of

## Features

- Show users as they join on screen
- Controller
  - Title & message display
  - State/screen communication
  - Keyboard
  - Help button & modal
  - Sound/horn button
  - DPad
  - Press anywhere
  - Click and drag / angles
  - List selection

## Further Reading
- [AirConsole Unity Documentation](packages/unity/Assets/AirConsole/Documentation_1.7.pdf)
- [Ember Octane](https://emberjs.com/editions/octane/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](LICENSE)