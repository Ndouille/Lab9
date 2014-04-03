var http    =   require('http');

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	next();
}

app.use(bodyParser());
app.use(allowCrossDomain);

var databaseUrl = "myDatabase";
var collections = ["users"]
var db = require("mongojs").connect(databaseUrl, collections);

app.get('/', function(request, response) {
   response.send("Hello World");
});


app.listen(8080);