const nodemailer = require('nodemailer');


const sendmail = async (receiver, subject, content) => {
//		 const transporter = nodemailer.createTransport({
 const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
    user: process.env.NODMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
  // Construct email message
  const mailOptions = {
    from: process.env.NODMAILER_EMAIL,
    to: receiver,
    subject: subject,
    text: content,
  };

  // Send email
  await transporter.sendMail(mailOptions);



}; 


exports.sendmail = sendmail;
