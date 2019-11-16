'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    outputPaths: {
      app: {
        html: 'controller.html',
        css: {
          'app': '/controller/controller.css'
        },
        js: '/controller/controller.js'
      },
      vendor: {
        css: '/controller/vendor.css',
        js: '/controller/vendor.js'
      }
    }
  });

  app.import('node_modules/airconsole-keyboard/airconsole-keyboard.js');

  return app.toTree();
};
