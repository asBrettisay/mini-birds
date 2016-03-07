var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongojs = require('mongojs'),
    db = mongojs('mini-birds')
    collection = db.collection('birds'),
    birdSeed = require('./birds.json'),
    ObjectId = mongojs.ObjectId;

collection.insert(birdSeed.birds);

var app = express();

app.use(bodyParser.json());

app.use(cors());

app.post('/api/sighting', function(req, res, next) {
  collection.insert(req.body, function(err, response) {
    res.status(200).send(response);
  });
});
app.get('/api/sighting', function(req, res, next) {
  if (req.query) {
    collection.find({status: req.query.status}, function(err, r) {
      res.status(200).json(r);
    })
  } else {
    collection.find(function(err, r) {
      res.status(200).json(r)
    })
  }
});
app.delete('/api/sighting', function(req, res, next) {
  collection.remove({_id: ObjectId(req.query.id)}, function(err, r) {
    res.status(200).send(r);
  })

});
app.put('/api/sighting', function(req, res, next) {
  console.log(req.body);
  collection.update({_id: ObjectId(req.query.id)}, req.body, function(err, r) {
    console.log(err);
    res.status(200).send()
  })
})

var port = 8002;
app.listen(port, function() {
  console.log('Listening on ', port + ', long live the King!');
});
