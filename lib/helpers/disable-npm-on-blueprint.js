'use strict';
var MockBlueprintTaskFor = require('./mock-blueprint-task-for');

module.exports = {
  disableNPM: function(Blueprint) {
    MockBlueprintTaskFor.disableTasks(Blueprint);
  },

  restoreNPM: function(Blueprint) {
    MockBlueprintTaskFor.restoreTasks(Blueprint);
  }
};
