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
const fs = require("fs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const currentDate = new Date();

// Format the date and time as a string
const formattedDate = currentDate.toLocaleString();

// Output the current date and time
console.log(`Current date and time: ${formattedDate}`);

const FetchTerminationData =
  require("./Components/termination/FetchTerminationData.jsx").default;

const app = express();

app.use(cors()); // Route to handle form submission
app.use(bodyParser.json());

const formData = [];

app.post("/submit-form", async (req, res) => {
  try {
    const { data } = req.body;
    formData.push(formattedDate, data);
    console.log(data);
    const { employeeID, lanID } = data;

    console.log(employeeID, lanID);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure your email service here
      host: "rci-rogers-com.mail.protection.outlook.com",
      port: 25,
    });

    // Render email template
    const emailHTML = ReactDOMServer.renderToString(
      React.createElement(FetchTerminationData, { data })
    );

    // Send mail with defined transport object
    await transporter.sendMail({
      from: "no-reply@rci.rogers.com",
      to: "theerthaprasad.gadda@rci.rogers.com",
      subject: "LAN ID Termination Request",
      html: emailHTML,
    });
    console.log(emailHTML);

    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.get("/form-submissions", (req, res) => {
  res.json(formData);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
