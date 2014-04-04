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

var databaseUrl = "test";
var collections = ["users"]
var db = require("mongojs").connect(databaseUrl, collections);

// List users
app.get('/', function(request, response) {
	//response.send("Hello World");
	db.users.find({}, function(e, data){
		response.send(data);
	});
});

// Add user
app.post('/', function(request, response){
	db.users.insert(request.body, function(e, data){
		console.log('ok');
		console.log(e);
		console.log(data);
		response.send(data);
	});
});


// Delete user
app.delete('/', function(request, response){
	db.users.remove(request, function(e, data){
		response.send(data);
	});
});

app.put('/', function(request, response){
	db.users.findAndModify(request, function(e, data){
		response.send(data);
	});
});


// db.getCollectionNames(function(data){
// 	console.log(data);
// });



app.listen(8080);