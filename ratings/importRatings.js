'use strict';
const dynamodb = require('./dynamodb');
const putRating = require('./putRating');

var xlsx = require('node-xlsx').default;

const ratingFolder = './one/';
const ratingNumber = 1; 
const fs = require('fs');

function getTeamFromFile(fileName){
  var fileArr = fileName.split("_");
  var teamName = fileArr[fileArr.length - 2].substr(4,1);
  return teamName;
}

function getSubmittingStudent(fileName){
  var fileArr = fileName.split("_");
  var student = fileArr[fileArr.length - 1].replace(".xlsx","");
  var studentArr = student.split("-");
  student = studentArr[0];
  return student;
}

fs.readdir(ratingFolder, (err, files) => {
  files.forEach(file => {
    
    //console.log('submitter:' + getSubmittingStudent(file));
    //console.log('team:' + getTeamFromFile(file));
    var submitter = getSubmittingStudent(file);
    var team = getTeamFromFile(file);

    var workSheetsFromFile = xlsx.parse(ratingFolder + file);
    workSheetsFromFile[0].data.forEach(function(row) {
      if(row[0] !== 'Member' && row[0] !== undefined && row[0] !== ""){
        const params = {
          TableName: "student-dev",
          FilterExpression: "#theName=:theName",
          ExpressionAttributeNames:{
            "#theName": "name"
          },
          ExpressionAttributeValues: {
            ":theName": row[0]
          },
        };
      
        // fetch student from the database
        dynamodb.scan(params, (error, result) => {
          // handle potential errors
          if (error) {
            console.error(error);
            return;
          }
          
          console.log("submitter team:" + team);
          console.log("submitter:" + submitter);
          submitter = submitter.toUpperCase().replace("W00", "W0").replace("W","");

          result.Items.forEach(function(itemdata) {
            var assignee = itemdata.studentId.toUpperCase().replace("W00", "W0").replace("W","");
            console.log("assignee:" + assignee);
            console.log("assignee team:" + itemdata.team);
            console.log("assignee rating:" + row[1]);
            
            if(submitter.trim().toUpperCase() != assignee.trim().toUpperCase()
            && team == itemdata.team){
              putRating(row[1], "W" + submitter, "W" + assignee, row[0], ratingNumber)
            }
          });
        });

      }
    });
  });
})
 
