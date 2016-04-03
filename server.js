var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');


var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{"id":1,"description":"lunch","completed":false}
	,{"id":2,"description":"market","completed":false}
	,{"id":3,"description":"cop","completed":true}];
var nextId = todos.length;


app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('todo api root');
});

app.get('/todos', function(req, res) {
	res.json(todos);
});

app.get('/todos/:id', function(req, res) {
	var lv_id = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {"id": lv_id});
	if(matchedTodo){
		res.json(matchedTodo);
	} else{
		res.status(404).send();
	}
});

app.post('/todos', function(req, res) {
	try{
		var body = _.pick(req.body, "description", "completed");
		if (!_.isBoolean(body.completed)) {
			console.log('completed not boolean');
			return res.status(400).send();
		}
		if (!_.isString(body.description)) {
			console.log('description not string');
			return res.status(400).send();
		}
		if (body.description.trim().length === 0) {
			console.log('description length 0');
			return res.status(400).send();
		}
		body.description = body.description.trim();
		body.id = ++nextId;
		todos.push(body);
		res.json(todos);
	} catch(e){

	}
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT);
});