'use strict';
var originTaskFor;
var Promise       = require('rsvp');
var tasksToMock = [];

module.exports = {
  disableTasks: function(Blueprint, tasks) {
    originTaskFor = Blueprint.prototype.taskFor;
    tasksToMock = tasks;

    Blueprint.prototype.taskFor = function(taskName) {

      if (tasksToMock.indexOf(taskName) !== -1) {
        return {
          run: function() {
            return Promise.resolve();
          }
        };
      }

      return originTaskFor.call(this, taskName);
    };
  },

  restoreTasks: function(Blueprint) {
    Blueprint.prototype.taskFor = originTaskFor;
    originTaskFor = undefined;
    tasksToMock = [];
  }
};
