const AWS = require("aws-sdk");
const uuidv1 = require("uuid/v1");

const docClient = new AWS.DynamoDB.DocumentClient();

const handlerFunction = async (event, context, callback) => {
  console.info({ event });
  const { userName, userSurname, role } =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  const id = uuidv1();
  try {
    const options = {
      TableName: "user",
      Item: { id, active: true, userName, userSurname, role }
    };
    await docClient.put(options).promise();
    const result = {
      statusCode: 201,
      body: JSON.stringify(options.Item),
      headers: { "content-type": "application/json" }
    };
    callback(null, result);
  } catch (e) {
    return context.fail(e);
  }
};
exports.handler = handlerFunction;
