'use strict';
const uuid = require('uuid');

const { Team } = require('../models/team');
const sendJson = require('../utils/sendJson');
const sendError = require('../utils/sendError');

exports.getAll = async function(event) {
  try {
    const teams = await Team.scan().exec();

    return sendJson(teams, 200);
  } catch (error) {
    return sendError(error, 500);
  }
};

exports.create = async function(event) {
  try {
    const { name, description } = JSON.parse(event.body);

    const team = await Team.create({
      id: uuid(),
      name,
      description
    });

    return sendJson(team, 200);
  } catch (error) {
    return sendError(error, 500);
  }
};
