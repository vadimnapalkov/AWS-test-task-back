const dynamoose = require('dynamoose');

const { Schema } = dynamoose;

const inviteSchema = new Schema({
  id: {
    type: String,
    hashKey: true
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  teamId: {
    type: String
  }
});

exports.Invite = dynamoose.model(process.env.INVITE_TABLE, inviteSchema);
