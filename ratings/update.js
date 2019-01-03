'use strict';

const dynamodb = require('./dynamodb');

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.rating !== 'number' || typeof data.rated !== 'number' || typeof data.rater !== 'number') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the rating item.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':rating': data.rating,
      ':rated': data.rated,
      ':rater': data.rater,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET rating = :rating, rated = :rated, rater = :rater, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the rating in the database
  dynamodb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t update the rating item: ' + error.message,
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
