var promptly = require('promptly');
var Q = require('q');

var ask = Q.denodeify(promptly.prompt);

ask('Filename: ').then(console.log);
