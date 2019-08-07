exports.generateHtmlMessage = function(name, teamId) {
  return `<b>Hello, ${name}</b><p>You have been added to the team. Follow the link to accept the invitation:<br> <a> ${
    process.env.FRONT_URL
  }teams/${teamId}/invite</a> <br> Thanks!</p>`;
};
