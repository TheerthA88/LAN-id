const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); // for generating verification tokens

const app = express();
const PORT = process.env.PORT || 3001;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "rci-rogers-com.mail.protection.outlook.com",
  port: 25,
});

// In-memory store for demo purposes (replace with database in production)
let users = [];

// Endpoint to handle form submission and send verification email
app.post("/submit-form", (req, res) => {
  const { name, email, message } = req.body;

  // Generate verification token
  const verificationToken = uuidv4();

  // Store user data (for demo purposes)
  users.push({ name, email, message, verified: false, verificationToken });

  // Send verification email
  const mailOptions = {
    from: "golla.babu@rci.rogers.com",
    to: email,
    subject: "Verify Your Email Address",
    html: `
      <p>Hello ${name},</p>
      <p>Please click the following link to verify your email address:</p>
      <a href="http://localhost:${PORT}/verify-email/${verificationToken}">Verify Email</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending verification email");
    } else {
      console.log("Verification email sent: " + info.response);
      res.status(200).send("Verification email sent");
    }
  });
});

// Endpoint to handle email verification
app.get("/verify-email/:token", (req, res) => {
  const { token } = req.params;

  // Find user by verification token
  const user = users.find((u) => u.verificationToken === token);

  if (!user) {
    return res.status(404).send("Invalid verification token");
  }

  // Mark user as verified (for demo purposes)
  user.verified = true;

  // Send email with data to others
  const mailOptions = {
    from: "golla.babu@rci.rogers.com",
    to: "theerthaprasad.gadda@rci.rogers.com", // replace with actual recipient emails
    subject: "New Form Submission",
    html: `
      <p>Hello,</p>
      <p>A new form submission has been verified:</p>
      <p>Name: ${user.name}</p>
      <p>Email: ${user.email}</p>
      <p>Message: ${user.message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending data email");
    } else {
      console.log("Data email sent: " + info.response);
      res.status(200).send("Data email sent");
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
