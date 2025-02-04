// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

require("dotenv").config(); // load variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Create a transporter using your email service (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // e.g., your Gmail address
    pass: process.env.EMAIL_PASS, // e.g., your Gmail app password
  },
});

// Define a POST endpoint to handle email sending
app.post("/api/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  // Setup email data
  const mailOptions = {
    from: email, // sender address (user's email)
    to: "aman22feb2004@gmail.com", // receiver address
    subject: subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    res.status(200).json({ message: "Email sent successfully!", info });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
