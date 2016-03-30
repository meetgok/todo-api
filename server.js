var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{"id":1,"description":"lunch","completed":false}
	,{"id":2,"description":"market","completed":false}
	,{"id":3,"description":"cop","completed":true}];
var nextId = 0;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('todo api root');
});

app.get('/todos', function(req, res) {
	res.json(todos);
});

app.get('/todos/:id', function(req, res) {
	var element;
	todos.forEach(function(item) {
		if(item.id == req.params.id){
			element = item;
		}
	});
	if(element){
		res.json(element);
	} else {
		res.status(404).send('no id');
	}
	//return;
});

app.post('/todos', function(req, res) {
	var body = req.body;
	body.id = ++nextId;
	todos.push(body);
	res.json(todos);
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT);
});