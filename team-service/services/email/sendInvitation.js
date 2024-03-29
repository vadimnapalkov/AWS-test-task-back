const { mailTransporter } = require('../../utils/mailTransporter');

exports.sendInvitation = async function({ user, token }) {
  await mailTransporter.sendMail({
    from: '"Test task" <test.mailer@kodep.ru>',
    to: user.email,
    subject: 'Invite in team',
    html: `<b>Hello, ${user.name}</b><p>You have been added to the team. Follow the link to accept the invitation:<br> <a> ${process.env.FRONT_URL}/teams/invite/${token}</a> <br> Thanks!</p>`
  });
};
