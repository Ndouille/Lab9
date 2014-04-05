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
var mongojs = require("mongojs");
var db = mongojs.connect(databaseUrl, collections);
var ObjectId = mongojs.ObjectId;

// List users
app.get('/', function(request, response) {
	db.users.find({}, function(e, data){
		response.send(data);
	});
});

// Add user
app.post('/', function(request, response){
	db.users.insert(request.body, function(e, data){
		response.send(data);
	});
});


// Delete user
app.delete('/', function(request, response){
	db.users.remove({'_id': ObjectId(request.body._id)}, function(e, data){
		response.send(data);
	});
});

app.put('/', function(request, response){
	console.log(request.body);
	id = request.body._id;
	delete request.body['_id'];
	db.users.findAndModify({
		query: {_id: ObjectId(id)},
		update: request.body,
		new: true
	}, function(e, data){
		console.log(data);
		response.send(data);
	});
});

app.get('/:id', function(request, response){
	console.log('ici');
	console.log(request.params.id)
	db.users.find({'_id': ObjectId(request.params.id)}, function(e, data){
		console.log(data);
		response.send(data);
	})
});

app.listen(8080);