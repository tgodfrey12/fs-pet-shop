'use strict'

const fs = require('fs');

var dataRead;

//What is with the first 2 args?????
if (process.argv.length < 3) {
    console.log("Usage: node pets.js [read | create | update | destroy]");
}

if (process.argv[2] === "read") {
    var fileContents = fs.readFile('pets.json', 'utf8', (err, data) => {
        if (err) throw err;

        //Show all the data in the file
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
} //End of read

//Create a new record
if (process.argv[2] === "create") {
    if (process.argv.length < 6) {
        console.log("Usage: node pets.js create AGE KIND NAME");
        return;
    }

    //Create a new data object
    var newPet = {
        "age": parseInt(process.argv[3]),
        "kind": process.argv[4],
        "name": process.argv[5]
    }

    //re-read the file into a variable
    var fileContents = fs.readFile('pets.json', 'utf8', (err, data) => {
        if (err) throw err;

        //console.log(JSON.parse(data));

        var allAnimals = JSON.parse(data);
        allAnimals.push(newPet);

        fs.writeFile("pets.json", JSON.stringify(allAnimals), (err) => {
            if (err) {
                console.log(err);
            }
        })
    })
} //End of Create
