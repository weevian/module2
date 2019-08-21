var http = require('http');

// code to create web server
http.createServer(function(req, res){
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end('Hello Node!')
}).listen(8080);
// code to create web server

console.log('Server started on localhost:8080' + ' Press Ctrl-C to terminate...');
