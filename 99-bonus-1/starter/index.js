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

    }
    else if (pathName === '/products') {
        res.writeHead(200, {'Content-type': 'text/html'});
        fs.readFile(`${__dirname}/overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;


            fs.readFile(`${__dirname}/card.html`, 'utf-8', (err, data) => {
                const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
                res.end(overviewOutput);
            });
        });

        //res.end('Product Page');


    }
    else if (pathName === '/laptop' && parseInt(id)<laptopData.length) {
        res.writeHead(200, {'Content-type': 'text/html'});
        fs.readFile(`${__dirname}/laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output)
        });

        // res.end(`Laptop Page - ${id}`);

    }
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, {'Content-type':'image/jpg'});
            res.end(data);
        });
    }
    else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('Page not found!');
    }


});

server.listen(1337, '127.0.0.1', () => {
    console.log('listening request')
});

function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}