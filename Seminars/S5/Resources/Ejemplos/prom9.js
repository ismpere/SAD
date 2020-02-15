var FS = require('fs')
var Q = require('q')

var fsexists = Q.denodeify(FS.exists)

fsexists('prom5.js').then(function () {
	console.log('Everything is ok');},
	function() {
	console.log('We\'ve got a problem');});
