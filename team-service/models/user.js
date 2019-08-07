const dynamoose = require('dynamoose');

const { Schema } = dynamoose;

const userSchema = new Schema({
  id: {
    type: String,
    hashKey: true
  },
  name: {
    type: String
  },
  nickname: {
    type: String
  },
  description: {
    type: String
  },
  teamId: {
    type: String
  }
});

exports.User = dynamoose.model(process.env.USER_TABLE, userSchema);
