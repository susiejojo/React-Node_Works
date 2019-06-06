var http=require('http');
var dt=require('./myfirstmodule');
var url=require('url');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    var q=url.parse(req.url,true).query;
    var txt="Hello " + q.name + " it's a "+q.day;
    res.end(txt);
}).listen(3000,"127.0.0.1");
console.log('Server running at http://127.0.0.1:3000/');

