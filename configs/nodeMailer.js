const nodemailer = require("nodemailer");
const sendMail = (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ha7910325@gmail.com",
      pass: "vgtl qpdl pfzp fxdb",
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: '"React App 👻" <ha7910325@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Welcome ✔", // Subject line
      html: "<h1>Welcome to sucessfuly Login on your first App?</h1>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};

module.exports = sendMail;
