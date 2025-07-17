const transporter = require("../config/mailer");

const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"NutriScan System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code - NutriScan",
      html: `
        <h2>Welcome to NutriScan!</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h3>${otp}</h3>
        <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
        <br/>
        <p>— NutriScan Team</p>
      `,
    });

    return true;
  } catch (err) {
    console.error("Failed to send OTP email:", err);
    return false;
  }
};

module.exports = sendOTP;
