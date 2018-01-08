'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question: String,
  answers: [{
    answer: String,
    count: Number
  }]
});

module.exports = mongoose.model('Question', QuestionSchema);
