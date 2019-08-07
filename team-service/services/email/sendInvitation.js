const { mailTransporter } = require('../../utils/mailTransporter');
const { generateHtmlMessage } = require('../../utils/generateHtmlMessage');

exports.sendInvitation = async function({ user, teamId }) {
  await mailTransporter.sendMail({
    from: '"Test task" <test.mailer@kodep.ru>',
    to: user.email,
    subject: 'Invite in team',
    html: generateHtmlMessage(user.name, teamId)
  });
};
