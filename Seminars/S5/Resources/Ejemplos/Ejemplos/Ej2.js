// Syncronize asyncronous task using callbacks

// In this example we see the use of two asynchronous task which build two http requests using data
// from a file. This function uses a callback function and invoke it with the response of the two requests
// in an array.

// it has a drawback, if a error happens in both requests, then the callback is invoked two times 


var FS = require('fs'),
    request = require('request');

function getResults(pathToFile, callback) {
    FS.readFile(pathToFile, 'utf8', function(err, data) {
        if (err) return callback(err);
        var response1, response2;

        request.post('http://service1.example.com?data=' + data), function(err, response, body) {
            if(err) return callback(err);
            response1 = response;
            next();
        }); 

        request.post('http://service2.example.com?data=' + data), function(err, response, body) {
            if(err) return callback(err);
            response2 = response;
            next();
        });         

        function next(){
            if(response1 && response2){
                callback(null, [response1, response2]);
            }
        }
    });
}