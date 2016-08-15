'use strict';

var watson = require('watson-developer-cloud');
var fs     = require('fs');

var natural_language_classifier = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

var params = {
  language: '<language>',
  name: '<classify-name>',
  training_data: fs.createReadStream('<training_file>')
};

// Create Classifier
natural_language_classifier.create(params, function(err, response) {
  if (err)
    console.log(err);
  else
    // copy the classifier_id from the response
    console.log(JSON.stringify(response, null, 2));
});


// Using a Classifier
natural_language_classifier.classify({
  text: '<question>',
  classifier_id: '<classifier_id>' }, // from the previous command
  function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});

// List Classifier
natural_language_classifier.list({},
  function(err, response) {
    if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
  }
);

// Delete Classifier
natural_language_classifier.remove({
  classifier_id: '<classifier_id>' },
  function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
