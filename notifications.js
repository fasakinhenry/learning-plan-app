const nodemailer = require('nodemailer');
const config = require('./config');

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: config.email.auth,
});

function sendEmail(to, subject, message) {
  const mailOptions = {
    from: config.email.auth.user,
    to,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error sending email:', error);
    }
    console.log('Email sent:', info.response);
  });
}

module.exports = { sendEmail };
