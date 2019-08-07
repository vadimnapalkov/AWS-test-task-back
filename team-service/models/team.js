const dynamoose = require('dynamoose');

const { Schema } = dynamoose;

const teamSchema = new Schema({
  id: {
    type: String,
    hashKey: true
  },
  name: {
    type: String
  },
  description: {
    type: String
  }
});

exports.Team = dynamoose.model(process.env.TEAM_TABLE, teamSchema);
