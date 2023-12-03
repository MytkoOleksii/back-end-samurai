const http = require('http')
const fs = require('fs')

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })
}

const server = http.createServer(async (request, response) => {

    switch (request.url) {
        case '/home' : {
            try {
                const data = await readFile('pages/home.html')
                response.write(data)
                response.end()
            } catch (error) {
                response.write('some error')
                response.end()
            }
            break
        }
        case '/' : {
            response.write('zero')
            response.end()
            break
        }
        case '/about' : {
            await delay(3000)
            response.write(" About course")
            response.end()
            break
        }
        /*{
     fs.readFile('pages/about.html', (error,data) => {
            if (error) {
                response.write(" some error")
            } else {
                response.write(data)
            }
            response.end()
        })
        break
    };*/
        default: {
            response.write(' not found')
            response.end()
        }
    }
});
server.listen(3003)
