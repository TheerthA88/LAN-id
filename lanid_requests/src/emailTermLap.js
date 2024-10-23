require("@babel/register")({
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-transform-react-jsx", { pragma: "React.createElement" }],
  ],
});

// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// require("bootstrap/dist/css/bootstrap.css");
const mongoose = require("mongoose");
const fs = require("fs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const FetchTermLapData =
  require("./Components/termination_laptop/FetchTermLapData.jsx").default;
const { v4: uuidv4 } = require("uuid");

const PORT = 3001;
const app = express();

// MongoDB connection
mongoose.connect(
  "mongodb+srv://gaddameeditheertha:67VZwuoE6EPDcLtH@storedata.quzw89w.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Define a schema and model for users
const userSchema = new mongoose.Schema({
  employeeID: String,
  lanID: String,
  dateOfLeaving: String,
  dropLocation: String,
  spocEmail: String,
  spocPhone: String,
  verified: Boolean,
  verificationToken: String,
});
const User = mongoose.model("TermLap", userSchema);

app.use(cors()); // Route to handle form submission
app.use(bodyParser.json());
// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  // Configure your email service here
  host: "rci-rogers-com.mail.protection.outlook.com",
  port: 25,
});

app.post("/termLap-form", async (req, res) => {
  const { data } = req.body;
  console.log(data);
  const {
    employeeID,
    lanID,
    dateOfLeaving,
    dropLocation,
    spocEmail,
    spocPhone,
  } = data;
  try {
    const verificationToken = uuidv4();
    const verified = false;
    const newItem = new User({
      employeeID,
      lanID,
      dateOfLeaving,
      dropLocation,
      spocEmail,
      spocPhone,
      verificationToken,
      verified,
    });
    // Create user in MongoDB
    const savedItem = await newItem.save();
    console.log(savedItem);
    res.status(201).json(savedItem);

    // Send verification email
    const mailOptions = {
      from: "golla.babu@rci.rogers.com",
      to: "theerthaprasad.gadda@rci.rogers.com",
      subject: "Verify Your Email Address",
      html: `
        <p>Employee ID: ${employeeID},</p>
        <p>Lan ID: ${lanID},</p>
        <p>Date Of Leaving: ${dateOfLeaving},</p>
        <p>Drop Location: ${dropLocation},</p>
        <p>Spoc Email: ${spocEmail},</p>
        <p>Spoc Phone: ${spocPhone},</p>
        <p>Please click the following link to verify your above Data:</p>
        <a href="http://localhost:${PORT}/verify-email/${verificationToken}">Verify Data</a>
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
  } catch (err) {
    console.error("Error submitting form:", err);
    res.status(500).send("Error submitting form");
  }
});

// Endpoint to handle email verification
app.get("/verify-email/:token", async (req, res) => {
  const { token } = req.params;

  console.log("token", token);
  // const { data } = req.body;

  try {
    // Find user by verification token
    const user = await User.findOne({
      verificationToken: token,
      // verified: true,
    });

    const { employeeID, lanID, transferFrom, transferTo } = user;

    console.log(employeeID, lanID, transferFrom, transferTo);
    // console.log(verificationToken);

    // Render email template
    const emailHTML = ReactDOMServer.renderToString(
      React.createElement(FetchTermLapData, { user })
    );

    if (!user) {
      return res.status(404).send("Invalid verification token");
    }

    // Mark user as verified in MongoDB
    user.verified = true;
    await user.save();

    // Send email with data to others
    const mailOptions = {
      from: "golla.babu@rci.rogers.com",
      to: "theerthaprasad.gadda@rci.rogers.com", // replace with actual recipient emails
      subject: "New Form Submission",
      html: emailHTML,
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
  } catch (err) {
    console.error("Error verifying email:", err);
    res.status(500).send("Error verifying email");
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
