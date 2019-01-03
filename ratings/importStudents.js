'use strict';
const dynamodb = require('./dynamodb');

var xlsx = require('node-xlsx').default;

const workSheetsFromFile = xlsx.parse(`./student/students.xlsx`);

workSheetsFromFile[0].data.forEach(function(row) {
    const params = {
        TableName: "student-dev",
        Item: {
          studentId: row[1],
          name:row[0],
        },
      };
    
      dynamodb.put(params, (error) => {
        if (error) {no
          console.error(error);
        }
      });
  });