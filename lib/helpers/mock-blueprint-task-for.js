'use strict';
var originalTaskForFn;
var Promise     = require('rsvp');
var tasksToMock = ['npm-install'];

module.exports = {
  disableTasks: function(Blueprint) {
    originalTaskForFn = Blueprint.prototype.taskFor;

    Blueprint.prototype.taskFor = function(taskName) {
      console.log(tasksToMock, taskName);
      if (tasksToMock.indexOf(taskName) !== -1) {
        return {
          run: function() {
            return Promise.resolve();
          }
        };
      }

      return originalTaskForFn.call(this, taskName);
    };
  },

  restoreTasks: function(Blueprint) {
    Blueprint.prototype.taskFor = originalTaskForFn;
    originalTaskForFn = undefined;
  }
};
