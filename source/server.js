var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var db;


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static(__dirname + '/public'));

//mongoose.set('debug', true);
db = mongoose.connect('mongodb://mgudenas:123123@ds141358.mlab.com:41358/mg-website');

// Setup routes
var routes = require('./app/routes/routes.js')(io, app);

server.listen(port, function () {
    console.log('Website is listening on port 3000!');
});
