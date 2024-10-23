require("@babel/register")({
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-transform-react-jsx", { pragma: "React.createElement" }],
  ],
});

const express = require("express");
const bodyParser = require("body-parser");
const React = require("react");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require("mongoose");
const ReactDOMServer = require("react-dom/server");
const FetchTransferData =
  require("./Components/flextrack/FetchTransferData.jsx").default;
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

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
  transferFrom: String,
  transferTo: String,
  verified: Boolean,
  verificationToken: String,
});
const User = mongoose.model("User", userSchema);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "rci-rogers-com.mail.protection.outlook.com",
  port: 25,
});

// Endpoint to handle form submission and send verification email
app.post("/transfer-form", async (req, res) => {
  const { data } = req.body;
  const { employeeID, lanID, transferFrom, transferTo } = data;

  try {
    // Generate verification token
    const verificationToken = uuidv4();
    const verified = false;
    const newItem = new User({
      employeeID,
      lanID,
      transferFrom,
      transferTo,
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
        <p>Tranfer From: ${transferFrom},</p>
        <p>Tranfer To: ${transferTo},</p>
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

    const emailHTML = ReactDOMServer.renderToString(
      React.createElement(FetchTransferData, { user })
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
