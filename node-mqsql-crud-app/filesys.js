var http=require('http');
var fs=require('fs');
http.createServer(function(req,res){
	fs.readFile('main.html',function(err,data){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write(data);
	res.end();
});
}).listen(8080,"127.0.0.1");
console.log("Server running at http://127.0.0.1:8080/")