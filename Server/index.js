var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;

var watson = require('watson-developer-cloud');
var natural_language_classifier = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

app.use(express.static(__dirname + "/public"));

function serverOnListen() {
  console.log("Server is listening at port %d ...", port);
}
server.listen(port, serverOnListen);

io.on("connection", function (socket) {
    console.log("A cleint connected...");

    socket.on('classify', function (msing) {
    	console.log('Data: ' + msing);
    	classify(msing);
    });
});

function classify(data) {
	natural_language_classifier.classify({
  	text: data,
  	classifier_id: '<classifier_id>' }, // from the previous command
	function(err, response) {
	  if (err)
	  	console.log('error:', err);
	  else
	  	var result = JSON.stringify(response, null, 2);
	  	io.emit('result', result);
	});
}
