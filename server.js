var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

var server = http.createServer(app);

app.use(express.static('./dist'));

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "/index.html"));
});

server.listen(PORT, function () {
	console.log(`app listening on port ${PORT}`);
});