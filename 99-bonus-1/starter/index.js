const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);
// console.log(__dirname);
// console.log(laptopData);

const server = http.createServer((req, res) => {
    // console.log('server accessed');
    // console.log(req.url);
    // const query = url.parse(req.url, true);

    const pathName = url.parse(req.url, true).pathname;
    let id = url.parse(req.url, true).query.id;
    if (!id) id = 0;
    if (pathName === '/') {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end('Home Page');

    } else if (pathName === '/products') {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end('Product Page');

    } else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(`Laptop Page - ${id}`);

    } else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('Page not found!');
    }


});

server.listen(1337, '127.0.0.1', () => {
    console.log('listening request')
});
