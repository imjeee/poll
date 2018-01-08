'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Question = require('./model/question');

//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set
//it up, or 3001
var port = process.env.API_PORT || 3001;

//db config
mongoose.connect('mongodb://imjeeedbuser:password123@ds239587.mlab.com:39587/imjeeedb');

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

//adding the /questions route to our /api router
router.route('/getQuestions')
//retrieve all questions from the database
.get(function(req, res) {
  //looks at our Question Schema
  Question.find(function(err, questions) {
    if (err) { res.send(err); }
    //responds with a json object of our database questions.
    res.json(questions)
  });
});

router.route('/getARandomQuestion')
.get(function(req, res) {
  // Again query all users but only fetch one offset by our random #
  Question.count().exec(function(err, count) {
    // Get a random entry
    var random = Math.floor(Math.random() * count)

    // Again query all users but only fetch one offset by our random #
    Question.findOne().skip(random).exec(function(err, question) {
      if (err) { res.send(err); }
      //responds with a json object of our database question.
      res.json(question)
    });
  });
});

router.route('/updateAnswerInQuestion')
.post(function(req, res) {
  // console.log(JSON.stringify(req.body));
  let _id = req.body._id;
  let _updatedFieldId = req.body._updatedFieldId;

  Question.findById(_id, (err, question) => {
    if (err) return handleError(err);

    // console.log(question);
    question.answers = question.answers.map((answer) => {
      if (answer._id == _updatedFieldId) {
        answer.count++;
      }
      return answer;
    })
    console.log(question.answers);
    question.set(question.answers);
    question.save((err, updatedQuestion) => {
      if (err) return handleError(err);
      res.send(updatedQuestion);
    });
  })
});

router.route('/addQuestion')
//post new comment to the database
.post(function(req, res) {
  var question = new Question();
  //body parser lets us use the req.body
  question.question = req.body.question;
  question.answers = req.body.answers;
  question.save((err) => {
    if (err) { res.send(err); }
    res.json({ message: 'Question successfully added!' });
  });
});

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, () => console.log('api running on port ${port}'));
