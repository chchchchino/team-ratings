'use strict';
const dynamodb = require('./dynamodb');

var xlsx = require('node-xlsx').default;

const ratingFolder = './rating/';
const fs = require('fs');

fs.readdir(ratingFolder, (err, files) => {
  files.forEach(file => {
    var workSheetsFromFile = xlsx.parse(ratingFolder + file);
    workSheetsFromFile[0].data.forEach(function(row) {
      console.log(row);
    });
  });
})
 
