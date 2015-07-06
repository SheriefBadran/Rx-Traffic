#!/bin/env node

var application_root = __dirname,
    request = require('request'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    fs = require('fs'),
    app = express();

// Configure server (since Express 4.0.0)
var env = process.env.NODE_ENV || 'development';

if ('development' == env) {

    app.use('/', express.static(path.join(application_root, 'app')));
    app.use(morgan('dev'));
    app.use(bodyParser());
    app.use(errorHandler({dumpExceptions: true, showStack: true}));
}
;


//Start server
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8000;

app.set('ipaddr', ipaddr);
app.set('port', port);

var server = app.listen(port, ipaddr, function () {
    console.log('Express server listening on port %d in %s mode',
        port, app.settings.env);
});


var sanitize = function (string) {

    return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

var io = require('socket.io').listen(server);

var parse = JSON.parse("{}");

try {

    parse = JSON.parse(fs.readFileSync('traffic.json'))
}
catch (e) {

    console.log("Error!");
}


var getTrafficEvents = function () {

    request('http://api.sr.se/api/v2/traffic/messages?format=json&indent=true&size=1000', function (error, response, body) {

        if (!error && response.statusCode == 200) {

            try {
                var jsonData = JSON.parse(body);
                parse = jsonData;
                console.log('emit data to client');
                io.sockets.emit('load', jsonData);
                fs.writeFile('traffic.json', body, function (err) {

                    if (err) {
                        throw err;
                    };
                });
            }
            catch (e) {
                console.log('empty file');
                fs.writeFile('traffic.json', "{}");
            }
        }
    });
};

getTrafficEvents();
setInterval(getTrafficEvents, 100000);

io.sockets.on('connection', function (client) {
    console.log('emit on connection');
    client.emit('load', parse);

});


// Get a list of all messages
//app.get('/traffic-events', function(req, res) {
//
//    //fs.createReadStream('traffic.json').pipe(request.put('http://api.sr.se/api/v2/traffic/messages?format=json&indent=true'));
//
//    //var destFile = fs.createWriteStream('traffic.json');
//    //var jsonString = JSON.stringify(request.get('http://api.sr.se/api/v2/traffic/messages?format=json&indent=true'), null, 4);
//    //fs.createReadStream(jsonString).pipe(destFile);
//    //
//    //fs.writeFile()
//
//
//    //console.log(request.get('http://api.sr.se/api/v2/traffic/messages?format=json&indent=true'));
//
//    request('http://api.sr.se/api/v2/traffic/messages?format=json&indent=true&size=1000', function (error, response, body) {
//
//        if (!error && response.statusCode == 200) {
//
//            fs.writeFile('traffic.json', body);
//            //console.log(typeof body);
//            //console.log(JSON.parse(body));
//            res.send(JSON.parse(body));
//        }
//        else {
//            //console.log('error');
//            res.send('error');
//        }
//    });
//
//});

//app.get('/development', function(req, res) {
//
//    res.send(JSON.parse(fs.readFileSync('traffic.json')));
//});
//http://api.sr.se/api/v2/programs?format=json&indent=false&page=2
//http://api.sr.se/api/v2/traffic/messages?format=json&indent=true;