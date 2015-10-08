'use strict';
var assert        = require('./assert');
var Blueprint     = require('ember-cli/lib/models/blueprint');
var originTaskFor = Blueprint.prototype.taskFor;
var Promise       = require('ember-cli/lib/ext/promise');

module.exports = {
  disableNPM: function() {
    Blueprint.prototype.taskFor = function(taskName) {
      // we don't actually need to run the npm-install task, so lets mock it to
      // speedup tests that need it
      assert.equal(taskName, 'npm-install');

      return {
        run: function() {
          return Promise.resolve();
        }
      };
    };
  },

  restoreNPM: function() {
    Blueprint.prototype.taskFor = originTaskFor;
  }
};
