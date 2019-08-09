'use strict';
const uuid = require('uuid');
const mapLimit = require('promise-map-limit');

const { User } = require('../models/user');
const { Invite } = require('../models/invite');
const sendJson = require('../utils/sendJson');
const sendError = require('../utils/sendError');
const { sendInvitation } = require('../services/email/sendInvitation');

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
    const { name, nickname, description, token } = JSON.parse(event.body);

    const inviteUser = await Invite.get(token);

    if (!inviteUser) return sendJson({ message: 'This user has not been invited.' }, 400);

    const { teamId } = inviteUser;

    const user = await User.create({
      id: uuid(),
      name,
      nickname,
      description,
      teamId
    });

    await Invite.delete({ id: token });

    return sendJson(user, 200);
  } catch (error) {
    return sendError(error, 500);
  }
};

exports.inviteUsersInTeam = async function(event) {
  try {
    const { teamId, users } = JSON.parse(event.body);
    await mapLimit(users, 1, async user => {
      const { name, email } = user;
      const token = uuid();
      await Invite.create({ id: token, name, email, teamId });
      await sendInvitation({ user, token });
    });

    return sendJson({ message: 'Success' }, 200);
  } catch (error) {
    return sendError(error, 500);
  }
};
