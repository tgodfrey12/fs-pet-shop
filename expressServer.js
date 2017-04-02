'use strict'

//Both required to run express
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');


//For body parser, command line is sending JSON even though
//it's not specified
//i.e. http POST localhost:3000/pets age=100 name='Sydney'
app.use(bodyParser.json());

//Get all the pets.  Reacts to http GET localhost:3000/pets
app.get('/pets', function(req, res) {

    let fileContents = fs.readFile('pets.json', 'utf8', (err, data) => {
        let allAnimals = [];
        var parsedObject = JSON.parse(data);
        //console.log(parsedObject);

        for (var i = 0; i < parsedObject.length; i++) {
            allAnimals.push(parsedObject[i]);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(allAnimals))
    })
})

//Reacts to http GET localhost:3000/pets/(object index)
app.get('/pets/:pet_idx', function(req, res) {

    //Read the pets.json file using node fs
    let fileContents = fs.readFile('pets.json', 'utf8', (err, data) => {
        //create an array to store all Animals if that's what the user wants
        let allAnimals = [];
        if (err) throw err;

        var parsedObject = JSON.parse(data);

        //In this case, the response wii be json
        res.setHeader('Content-Type', 'application/json');

        res.send(JSON.stringify(parsedObject[req.params.pet_idx]));
    })
})

//Updates a record in the json file
//Usage: http PUT localhost:3000/pets age=9 name='Zoe' kind='dog' index=0
app.put('/pets', function(req, res) {

    if (req.body.age === undefined ||
        req.body.name === undefined ||
        req.body.kind === undefined ||
        req.body.index === undefined) {
        res.send("Usage: age name kind index");
    }

    let age = parseInt(req.body.age);
    let name = req.body.name;
    let kind = req.body.kind;
    let index = parseInt(req.body.index);


    //Read in the file and find which to update based on the index(last arg)
    let fileContents = fs.readFile('pets.json', 'utf8', (err, data) => {
        let allAnimals = JSON.parse(data);

        allAnimals[index].age = age;
        allAnimals[index].name = name;
        allAnimals[index].kind = kind;


        fs.writeFile("pets.json", JSON.stringify(allAnimals), (err) => {
            if (err) {
                console.error(err.stack);
                return res.sendStatus(500);
            }
        })

        res.send(allAnimals);
    })
})

//Adds a new record to the json file
//Reacts to http POST localhost:3000/pets age=100 name='Sydney' kind='dog'
app.post('/pets', function(req, res) {

    let newPet = {};

    //Get the parts from the body of the request
    //Check to see if the age is an integer
    //if (Number.isInteger(req.body.age)) {
    let age = parseInt(req.body.age);
    // } else {
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.statusMessage = 'Age is not an integer';
    //     res.statusCode = 400;
    //     res.send();
    // }

    let name = req.body.name;
    let kind = req.body.kind;

    newPet.age = age;
    newPet.name = name;
    newPet.kind = kind;

    var fileContents = fs.readFile('pets.json', 'utf8', (err, data) => {
        if (err) throw err;

        var allAnimals = JSON.parse(data);
        allAnimals.push(newPet);

        fs.writeFile("pets.json", JSON.stringify(allAnimals), (err) => {
            if (err) {
                console.error(err.stack);
                return res.sendStatus(500);
            }
        })

        res.send(allAnimals);
    })
})

app.use(function(req, res) {
    res.sendStatus(404);
});

app.listen(3000);
