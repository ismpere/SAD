
/**
* Getting started with ExpressJS

First, your server will use Express middleware to log requests that are made to the server. Your server will also 
serve static files from the directory in which the script is being executed. These static files will be compressed with 
gzip as they are served. In addition to these actions your Express server will be able to perform simple authentication 
and provide a fallback response to any addresses that cannot be served by static pages.
You will also see how to get and set many Express settings and how to enable and disable them

*/
var express = require('express'),
app = express();

// use middleware
app.use(express.logger());
app.use(express.compress());
app.use(express.static(__dirname));
app.use(express.basicAuth(function(username, password) {
return username == 'shire' & password == 'baggins';
}));

// a simple route
app.get('/blah', function(req, res) {
res.send(app.get('default'));
});

// a default handler
app.use(function(req, res) {
res.send(app.get('default'));
});

// settings
console.log(app.get('env')); // development
console.log(app.get('trust proxy')); // undefined
app.disable('trust proxy');
console.log(app.get('trust proxy')); // false
console.log(app.get('jsonp callback name'));
console.log(app.get('json replacer'));
console.log(app.get('json spaces'));
console.log(app.get('case sensitive routing'));
console.log(app.get('strict routing'));
console.log(app.get('view cache'));
console.log(app.get('view engine'));
console.log(app.get('views'));

// configurations
app.configure('development', function() {
app.set('default', 'express development site');
});
app.configure('production', function() {
app.set('default', 'express production site');
});

// app.engine('jade', require('jade').__express);
app.listen(8080); // same as http.server.listen