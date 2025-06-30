const http = require('http');
const fs = require('fs');
const url = require('url');

function server(port) {
    http.createServer((req, res) => {
        let file = '404.html';
        const pathname = url.parse(req.url, true).pathname;
        if(pathname == '/') {
            file = 'index.html';
        } 
        else if(pathname == '/about' || pathname == '/about/') {
            file = 'about.html';
        }
        else if(pathname == '/contact-me' || pathname == '/contact-me/') {
            file = 'contact-me.html'
        }
        
        res.writeHead(200, {'content-type': 'text/html'})
        fs.readFile(file, (err, data) => {
            if(err) {
                res.writeHead(404)
                res.write(f`Error loading file ${file}`)
            } else {
                res.write(data)
            }
            res.end()
        })
    }).listen(port)
}

server(8080);