'use strict'

const fs = require('fs');

var dataRead;

//What is with the first 2 args?????
if (process.argv.length === 2) {
    console.log("Usage: node pets.js [read | create | update | destroy]");
}

if (process.argv[2] === "read") {
    var fileContents = fs.readFile('pets.json', 'utf8', (err, data) => {
        if (err) throw err;

        //Show all the data in the file
        //console.log(data);
        dataRead = data;

        var parsedObject = JSON.parse(dataRead);
        var dataIdx = process.argv[3];

        //Show the specified index(record) in the file
        if (parsedObject[dataIdx] === undefined) {
            console.log("Usage: node pets.js read INDEX");
        } else {
            console.log(parsedObject[dataIdx]);
        }
    })
}

if (process.argv[2] === "create") {
    if (process.argv.length < 6) {
        console.log("Usage: node pets.js create AGE KIND NAME");
        return;
    }

    //Create a new data object
    var newAnimal = {};
    newAnimal.age = parseInt(process.argv[3]);
    newAnimal.kind = process.argv[4];
    newAnimal.name = process.argv[5];

    console.log(newAnimal);

    //re-read the file into a variable

    //push the newAnimal to the variable stringified

    //re-write the file completely using writeFile

    fs.appendFile('pets.json', newAnimal, (err) => {
        if (err) {
            console.log(err);
        }

    });
}
