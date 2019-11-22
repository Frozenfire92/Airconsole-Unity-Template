#!/bin/bash

echo "Cleaning old controller files from Unity WebGLTemplate folders"
rm ../unity/Assets/WebGLTemplates/AirConsoleDev/controller.html;
rm ../unity/Assets/WebGLTemplates/AirConsole/controller.html;
rm -r ../unity/Assets/WebGLTemplates/AirConsole/controller/;

echo "Copying new controller files to Unity WebGLTemplate folders"
cp dist/controller.html ../unity/Assets/WebGLTemplates/AirConsoleDev/controller.html;
cp dist/controller.html ../unity/Assets/WebGLTemplates/AirConsole/controller.html;
cp -r dist/controller/ ../unity/Assets/WebGLTemplates/AirConsole/;