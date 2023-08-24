import config from '../config';
const nodemailer = require('nodemailer');

export const sendEmailToUser = (userEmail, subject, message, recover) => {
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.email_pass
    }
  });

  const mailOptions = {
    from: `uNotes <${config.email}>`,
    to: userEmail,
    subject,
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (recover)
    {
      if (error)
        return res.status(500).json({ message: error });
      else
        return res.json({ message: 'Email enviado: ' + info.response });
    }
  });
}

export const methods = {
  sendEmailToUser
};