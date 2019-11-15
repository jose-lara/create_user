'use strict';

var fs = require('fs');
var path = require('path');

const handlerFunction = async (event, context, callback) => {
  const { userName, userSurname, role } = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const userId = uuidv1();
  try {
    const options = {
      TableName: 'User',
      Item: { userId, active: true, userName, userSurname, role, createdAt: Date.now() }
    };
    await docClient.put(options).promise();
    const result = {
      statusCode: 201,
      body: options.Item,
      headers: { 'content-type': 'application/json' }
    };
    callback(null, result);
  } catch (e) {
    return context.fail(e);
  }
};
