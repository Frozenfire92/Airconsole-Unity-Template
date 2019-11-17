'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const exportDir = '/controller/';

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    outputPaths: {
      app: {
        html: 'controller.html',
        css: {
          'app': `${exportDir}controller.css`
        },
        js: `${exportDir}controller.js`
      },
      vendor: {
        css: `${exportDir}vendor.css`,
        js: `${exportDir}vendor.js`
      }
    }
  });

  app.import('node_modules/airconsole-keyboard/airconsole-keyboard.js');
  app.import('node_modules/airconsole-keyboard/images/keyboard-back.png', { destDir: exportDir });
  app.import('node_modules/airconsole-keyboard/images/keyboard-shift.png', { destDir: exportDir });

  app.import('node_modules/airconsole-controls/swipe-analog/swipe-analog.js');

  return app.toTree();
};
