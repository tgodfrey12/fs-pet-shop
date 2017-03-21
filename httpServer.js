const http = require('http');
const fs = require('fs');

var server = http.createServer(function(req, res) {

    console.log(req.url);

    if (req.url === '/pets') {
        console.log("In pets");
        var fileContents = fs.readFile('pets.json', 'utf8', (err, data) => {
            if (err) throw err;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        })

    } else if (req.url === '/pets/0') {
        console.log("In pets 0");

        var fileContents = fs.readFile('pets.json', 'utf8', (err, data) => {
            if (err) throw err;

            var parsedObject = JSON.parse(data);
            console.log(parsedObject[0]);
            res.setHeader('Content-Type', 'application/json');

            res.end(JSON.stringify(parsedObject[0]));
        })

    } else if (req.url === '/pets/1') {
        console.log("In pets 1");

        var fileContents = fs.readFile('pets.json', 'utf8', (err, data) => {
            if (err) throw err;

            var parsedObject = JSON.parse(data);
            console.log(parsedObject[1]);
            res.setHeader('Content-Type', 'application/json');

            res.end(JSON.stringify(parsedObject[1]));
        })
    } else {
        //return 404
        res.setHeader('Content-Type', 'text/plain');
        res.statusMessage = 'Not found';
        res.statusCode = 404;
        res.end();
    }
})

server.listen(3000);
