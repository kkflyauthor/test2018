const http = require('http');
const fs = require('fs');


http.createServer(function (request,response){

    console.log("request come",request.url);

    //const host = request.headers.host


        const html = fs.readFileSync('test.html','utf8');
        const img = fs.readFileSync('test.png');

        if(request.url === "/"){
            response.writeHead(200,{
                "Content-Type":"text/html",
                "Connection":"close"
            })
            response.end(html);
        }else{
            response.writeHead(200,{
                "Content-Type":"image/png",
                "Connection":"close"
            })
            response.end(img);
        }


}).listen(63343);

console.log('server listening on 63343');

