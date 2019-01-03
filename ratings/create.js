'use strict';

const uuid = require('uuid');
const dynamodb = require('./dynamodb');

module.exports.create = (event, context, callback) => {
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
    Item: {
      id: uuid.v1(),
      rating: data.rating,
      rater: data.rater,
      rated: data.rated,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  dynamodb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the rating item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
