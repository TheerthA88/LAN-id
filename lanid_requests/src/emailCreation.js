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
const fs = require("fs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const FetchCreationData =
  require("./Components/creation/FetchCreationData").default;

const app = express();

app.use(cors()); // Route to handle form submission
app.use(bodyParser.json());

app.post("/submit-form", async (req, res) => {
  try {
    const { data, showPostal } = req.body;
    // const { showPostal } = req.body;
    console.log(data, showPostal);
    const {
      firstname,
      lastname,
      bu,
      rogersRole,
      location,
      city,
      hourlyRate,
      dob,
      otl,
      countryCode,
      phone,
      email,
      postalcode,
      reason,
    } = data;

    console.log(
      firstname,
      lastname,
      bu,
      rogersRole,
      location,
      city,
      hourlyRate,
      dob,
      otl,
      countryCode,
      phone,
      email,
      postalcode,
      reason,
      showPostal
    );

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure your email service here
      host: "rci-rogers-com.mail.protection.outlook.com",
      port: 25,
    });

    // Render email template
    const emailHTML = ReactDOMServer.renderToString(
      React.createElement(FetchCreationData, { data, showPostal })
    );

    // Send mail with defined transport object
    await transporter.sendMail({
      from: "no-reply@rci.rogers.com",
      to: "theerthaprasad.gadda@rci.rogers.com",
      subject: `Request for LAN ID Creation - ${firstname} ${lastname} `,
      html: emailHTML,
    });
    // console.log(emailHTML);

    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
