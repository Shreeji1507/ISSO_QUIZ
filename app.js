const express = require('express');
// const neatCsv = require('neat-csv');
// const mongodb = require("mongodb").MongoClient;
// const mongoose = require("mongoose");


const fs = require("fs");
const fastcsv = require("fast-csv");
// const googleTranslate = require('google-translate')(apiKey, options);

const app = express();

let stream = fs.createReadStream("test1.csv");
let csvData = [];
let csvStream = fastcsv.parse().on("data", function(data) {
    csvData.push({
      // name of the fields in the database
      // data[position in the csv file in each row]
      field1: data[0],
      field2: data[1],
      field3: data[2],
      field4: validateCsvRow(data)
      // field4: data[3],
      // isValid: validateCsvData(data[0]
      //   ,data[1]
      //   ,data[2])
    });
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();
    for (var i = 0; i < csvData.length; i++){
      console.log(csvData[i]);      
    }

  });

  

stream.pipe(csvStream);

const mongodb = require("mongodb").MongoClient;

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";

mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;
    client
      .db("ISSO_Quiz")
      .collection("quiz_bank")
      .insertMany(csvData, (err, res) => {
        if (err) throw err;
        console.log(`Inserted: ${res.insertedCount} rows`);
        client.close();
      });
  }
);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});


// function validateCsvData(rows) {
//   //ignore header at 0 and get rest of the rows
//   //const dataRows = rows.slice(1, rows.length); 
//   console.log(rows);
//   for (let i = 0; i < rows.length; i++) {
//     console.log(rows[i+1]);
//     const rowError = validateCsvRow(rows[i]);
//     if (rowError) {
//       return false;
//     }
//     return true;
//   }
//   return;
// }


function validateCsvRow(row) {
 
  // const dataRows = rows.slice(1, rows.length);

  // validation based on the position of the data in a row
  // return (row[1] == "q1" || row[1] == "q4") ? true : false
}




// googleTranslate.translate('My name is Brandon', 'gu', function(err, translation) {
//   console.log(translation.translatedText);
//   // =>  Mi nombre es Brandon
// });