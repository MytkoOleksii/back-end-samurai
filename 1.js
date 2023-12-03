/*

let  http = require('http');

 http.createServer((request, response) => {
    response.write("test1234567")
    response.end();
}).listen(3000);
*/


const http = require('http')

let requestCount = 0

const server = http.createServer( (request, response) => {
    requestCount ++

    switch (request.url) {
        case '/students' :{
            response.write('Students')}
            break
        case '/' :
        case '/counter' :{
            response.write('FRONT + BACK' + requestCount)}
            break;
        default:{
            response.write(' not found')}
    }
    response.end()
});
server.listen(3003)
