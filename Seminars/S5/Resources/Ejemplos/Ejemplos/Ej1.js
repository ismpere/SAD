// In this example we use a callback function to process data from a asynchronous task

var FS = require('fs');

FS.readFile('file.txt', 'utf8', function(err, data) {
    if (err) throw err;     
    console.log('File has been read:', data);
});

console.log('After readFile.');