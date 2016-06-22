var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('express-jwt');

var authenticate = jwt({
  secret: new Buffer('ZtXU2NKW7W8635GLnQejue38ZP2YTuP36TRCeF09IXoo4Pm42zUNXeNKzeyXijbB', 'base64'),
  audience: 'KhnsDMlDnJKJG8bYnCteoHYkoeXiIDO7'
});

app.use(cors());

app.get('/ping', function(req, res) {
  res.send(200, {text: "All good. You don't need to be authenticated to call this"});
});

app.get('/secured/ping', authenticate, function(req, res) {
  res.send(200, {text: "All good. You only get this message if you're authenticated"});
})

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
