var FS = require('fs')
var Q = require('q')

var fsstat = Q.denodeify(FS.stat)

fsstat('prom5n.js').then(function () {
	console.log('Everything is ok');},
	function() {
	console.log('We\'ve got a problem');});
	
	

