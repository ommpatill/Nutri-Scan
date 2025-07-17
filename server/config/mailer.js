const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: process.env.EMAIL_USER,
    // pass: process.env.EMAIL_PASS,
    user: "nutriscansystem@gmail.com",
    pass: "zfvh delo ozsn jjaw",
  },
});

module.exports = transporter;
