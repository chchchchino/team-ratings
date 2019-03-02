'use strict';

const uuid = require('uuid');
const dynamodb = require('./dynamodb');

function putRating(rating, rater, rated, ratedName, ratingNumber){
    const timestamp = new Date().getTime();

    const params = {
        TableName: "team-rating-dev",
        Item: {
          id: uuid.v1(),
          rating: rating,
          rater: rater,
          rated: rated,
          ratedName: ratedName,
          ratingNumber: ratingNumber,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      };
    
      dynamodb.put(params, (error) => {
        // handle potential errors
            if (error) {
            console.error(error);
            return;
            }
        }
      )
}

module.exports = putRating;