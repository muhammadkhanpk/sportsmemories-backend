import nodemailer from 'nodemailer';

export const SendEmail = async (email, subject, bodyPart) => {
  console.log('\n mail data', {
    host: process.env.MAIL_URL,
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  });

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_URL,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  });

  // await transporter.sendMail({
  //   from: process.env.FROM_EMAIL_ADDRESS,
  //   to: email,
  //   subject,
  //   html: bodyPart
  // });
};
