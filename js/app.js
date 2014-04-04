var http    =   require('http');

var express = require('express');
var app = express();

var databaseUrl = "myDatabase";
var collections = ["users"]
var db = require("mongojs").connect(databaseUrl, collections);

app.get('/', function(request, response) {
   response.send("Hello World");
});

app.listen(8080);