const http = require('https')

const  server = http.createServer( (request, response) => {
    response.write('IT-KAMASUTRA')
    response.end
})

server.listen(3005)