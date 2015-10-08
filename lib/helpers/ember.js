'use strict';

var MockUI        = require('./mock-ui');
var MockAnalytics = require('./mock-analytics');
var Cli           = require('ember-cli/lib/cli');
var path          = require('path');

module.exports = function ember(args) {
  var cli;

  args.push('--disable-analytics');
  args.push('--watcher=node');
  cli = new Cli({
    inputStream:  [],
    outputStream: [],
    cliArgs:      args,
    Leek: MockAnalytics,
    UI: MockUI,
    testing: true,
    cli: {
      name: 'my-app',
      npmPackage: 'ember-cli',
      // SUPERHAX.biz.gov
      root: path.resolve(__dirname, '..', '..', 'node_modules', 'ember-cli')
    }
  });
  
  return cli;
};