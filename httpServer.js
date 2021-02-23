var http = require("http");

http.createServer(function (req, res) {
	var body = "hello Server";
	res.setHeader('Content-Type', 'text/plain; charset=utf-8');
	res.end("hello node server")
}).listen(3000);// 3000번 포트
