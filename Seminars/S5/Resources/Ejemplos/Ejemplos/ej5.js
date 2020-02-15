// This code shows how to use an existing callback function to create a promise.

var FS = require('fs'),
    Q = require('q');

Q.nfcall(FS.readFile, "file.txt", "utf-8")
.then(function(data) {      
    console.log('File has been read:', data);
})
.fail(function(err) {
    console.error('Error received:', err);
})
.done();