"use strict";
const uuid = require("uuid");
const mapLimit = require("promise-map-limit");

const { User } = require("../models/user");
const resWriter = require("../utils/resWriter");
const { mailTransporter } = require("../utils/mailTransporter");
const { generateHtmlMessage } = require("../utils/generateHtmlMessage");

exports.getMembersTeam = async function(event) {
  const { teamId } = event.pathParameters;
  const members = await User.scan({ teamId })
    .exec()
    .catch(err => {
      return resWriter(err, 500);
    });

  return resWriter(members, 200);
};

exports.create = async function(event) {
  const { name, nickname, description, teamId } = JSON.parse(event.body);

  const user = await User.create({
    id: uuid(),
    name,
    nickname,
    description,
    teamId
  }).catch(err => {
    return resWriter(err, 500);
  });

  return resWriter(user, 200);
};

exports.inviteUsersInTeam = async function(event) {
  const { teamId, users } = JSON.parse(event.body);
  await mapLimit(users, 1, async user => {
    await mailTransporter.sendMail({
      from: '"Test task" <test.mailer@kodep.ru>',
      to: user.email,
      subject: "Invite in team",
      html: generateHtmlMessage(user.name, teamId)
    });
  }).catch(err => {
    return resWriter(err, 500);
  });

  return resWriter({ message: "Success" }, 200);
};
