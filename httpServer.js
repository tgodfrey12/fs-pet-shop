const http = require('http');
const fs = require('fs');

var server = http.createServer(function(req, res) {

    if (req.url === '/pets') {
        getRequestedAnimal(req, res);
    } else if (req.url === '/pets/0') {
        getRequestedAnimal(req, res, 0);
    } else if (req.url === '/pets/1') {
        getRequestedAnimal(req, res, 1);
    } else {
        //return 404
        res.setHeader('Content-Type', 'text/plain');
        res.statusMessage = 'Not found';
        res.statusCode = 404;
        res.end();
    }
})

server.listen(3000);


function getRequestedAnimal(req, res, idx) {
    let fileContents = fs.readFile('pets.json', 'utf8', (err, data) => {
        //create an array to store all Animals if that's what the user wants
        let allAnimals = [];
        if (err) throw err;

        var parsedObject = JSON.parse(data);

        //In this case, the response wii be json
        res.setHeader('Content-Type', 'application/json');

        //Send all the animals if no index provided
        if (idx === undefined) {
            for (var i = 0; i < parsedObject.length; i++) {
                allAnimals.push(parsedObject[i]);
            }
            res.end(JSON.stringify(allAnimals))
        } else {
            //Otherwise, just send the animal requested
            res.end(JSON.stringify(parsedObject[idx]));
        }
    })
}
