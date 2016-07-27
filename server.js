var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser');
var object = require('mongodb').ObjectID;

app.use(bodyParser.json());

app.use(express.static('client/build/src'));

app.get('/', function(req,res){
  res.sendFile(__dirname+'/client/build/index.html')
})


app.post('/animals', function(req,res){
  var url = 'mongodb://localhost:27017/farm';
  MongoClient.connect(url, function(err,db){
    var collection = db.collection('animals');
    console.log(collection)
    collection.insert({name: req.body.name, type: req.body.type, age: req.body.age})
  })
  res.status(200).end();
  // console.log(req.body)
  // res.status(200).end();
  db.close();
})


app.get('/animals' , function(req,res){
   var url = 'mongodb://localhost:27017/farm';
   MongoClient.connect(url, function(err, db){
         var collection = db.collection('animals');
         console.log(collection)
         collection.find({}).toArray(function(err,docs){
          res.json(docs)
          db.close();
         })
   })
})

app.post('/animals/:id', function(req, res){
  var url = 'mongodb://localhost:27017/farm';
  MongoClient.connect(url, function(err, db){
    var collection = db.collection('animals');
    collection.updateOne({_id: new object(req.params.id)}, {$set: req.body})
    res.status(200).end();
    db.close();
  })
})

app.delete('/animals/:id/delete', function(req,res){
  var url = 'mongodb://localhost:27017/farm';
  MongoClient.connect(url,function(err,db){
  var collection = db.collection('animals');
  collection.remove({name: req.body.name})
  res.status(200).end();
  db.close();

  })
})


app.listen('3000', function(){
  console.log('running 3000!');
})