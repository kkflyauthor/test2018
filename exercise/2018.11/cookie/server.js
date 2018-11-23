const http = require('http');
const fs = require('fs');


http.createServer(function (request,response){

    console.log("request come",request.url);

    //const host = request.headers.host

    if(request.url === '/'){
        const html = fs.readFileSync('test.html','utf8')
        response.writeHead(200,{
            "Content-Type":"text/html",
            "Set-Cookie":["id=123;max-age=2",'name=234;httpOnly']
        })
        response.end(html);
    }


}).listen(63343);

console.log('server listening on 63343');

