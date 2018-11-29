var bodyParser = require('body-Parser');
var mongoose = require('mongoose');

//connect to the db
mongoose.connect('mongodb://todouser:todouser1@ds015899.mlab.com:15899/todo');

//Create a schema
var todoschema = new mongoose.Schema({
    item: String
});

//Create a model
var Todo = mongoose.model('Todo', todoschema);
//var data = [{item: 'get milk'},{item: 'walk dog'},{item: 'do some coding'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

    app.get('/todo', function(req,res){
        //get data from mongo db and pass it to the view
        Todo.find({}, function(err,data){
            if(err) throw err;
            res.render('todo',{todos: data});
        });        
    });

    app.post('/todo',urlencodedParser, function(req,res){
        //get data from the view and add it to mongo db
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });        
    });

    app.delete('/todo/:item', function(req,res){
        //delete the requested item form mango db
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
                if(err) throw err;
                res.json(data);
        });       
    });
};