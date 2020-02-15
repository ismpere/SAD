// Syncronization of asyncronous task using promises

// getResults(pathToFile): obtains the list of collaborators and commits from a repository in github. This repository is given as the content
// of a file

/* this example presents a function that returns a promise. This promise will eventually obtain a response from 
   two http request build from the content of a given file. This function uses two promises and synchronize them to get an
   array of responses.
 
   unlike the callback version (Ej4), in case of a exception, the callback function that does the error handling is
   invoked once.

*/

var FS = require('fs'),
    Q = require('q'),
    request = require('request');

function getResults(pathToFile) {   
    return Q.nfcall(FS.readFile, pathToFile, "utf-8")
    .then(function(repo) {
        var options = { headers: {'User-Agent': 'MyAgent'} }; // github requires user agent string
        return [Q.nfcall(request, 'https://api.github.com/repos/'+repo+'/collaborators', options),
                Q.nfcall(request, 'https://api.github.com/repos/'+repo+'/commits', options)];
    })
    .spread(function(collaboratorsRes, commitsRes) {        
        return [collaboratorsRes[1], commitsRes[1]];  // return the response body
    })
    .fail(function(err) {
        console.error(err)
        return err;
    });
}

   // actual call
   getResults('repos.txt').then(function(responses) {
    // do something with the responses
});