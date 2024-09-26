const nodemailer = require('nodemailer');

exports.sendResetPasswordEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: '', pass: '' }
  });
  const mailOptions = {
    from: '',
    to: email,
    subject: 'RESET PASSWORD',
    text: `http://localhost:3000/reset-password/${token}`
  };
  transporter.sendMail(mailOptions);
};
