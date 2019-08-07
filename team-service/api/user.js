'use strict';
const uuid = require('uuid');
const mapLimit = require('promise-map-limit');

const { User } = require('../models/user');
const sendJson = require('../utils/sendJson');
const sendError = require('../utils/sendError');
const sendInvitation = require('../services/email/sendInvitation');

exports.getMembersTeam = async function(event) {
  try {
    const { teamId } = event.pathParameters;
    const members = await User.scan({ teamId }).exec();

    return sendJson({ members }, 200);
  } catch (error) {
    return sendError(error, 500);
  }
};

exports.create = async function(event) {
  try {
    const { name, nickname, description, teamId } = JSON.parse(event.body);

    const user = await User.create({
      id: uuid(),
      name,
      nickname,
      description,
      teamId
    });

    return sendJson(user, 200);
  } catch (error) {
    return sendError(error, 500);
  }
};

exports.inviteUsersInTeam = async function(event) {
  try {
    const { teamId, users } = JSON.parse(event.body);
    await mapLimit(users, 1, async user => sendInvitation({ user, teamId }));

    return sendJson({ message: 'Success' }, 200);
  } catch (error) {
    return sendError(error, 500);
  }
};
