"use strict";
const uuid = require("uuid");

const { Team } = require("../models/team");
const resWriter = require("../utils/resWriter");

exports.getAll = async function(event) {
  const teams = await Team.scan()
    .exec()
    .catch(err => {
      return resWriter(err, 500);
    });

  return resWriter(teams, 200);
};

exports.create = async function(event) {
  const { name, description } = JSON.parse(event.body);

  const team = await Team.create({
    id: uuid(),
    name,
    description
  }).catch(err => {
    return resWriter(err, 500);
  });

  return resWriter(team, 200);
};
