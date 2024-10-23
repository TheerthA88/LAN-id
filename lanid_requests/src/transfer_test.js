require("@babel/register")({
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-transform-react-jsx", { pragma: "React.createElement" }],
  ],
});

// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// require("bootstrap/dist/css/bootstrap.css");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const FetchTransferData =
  require("./Components/flextrack/FetchTransferData.jsx").default;

const app = express();

app.use(cors()); // Route to handle form submission
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://gaddameeditheertha:67VZwuoE6EPDcLtH@storedata.quzw89w.mongodb.net/request_forms",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a schema and model
const itemSchema = new mongoose.Schema(
  {
    employeeID: String,
    lanID: String,
    transferFrom: String,
    transferTo: String,
  },
  { collection: "transfer-form" }
);

const Item = mongoose.model("Item", itemSchema);

app.post("/transfer-form", async (req, res) => {
  const { data } = req.body;
  const { employeeID, lanID, transferFrom, transferTo } = data;
  const newItem = new Item({ employeeID, lanID, transferFrom, transferTo });
  try {
    const savedItem = await newItem.save();
    console.log(savedItem);
    res.status(201).json(savedItem);
    // console.log(data);

    console.log(employeeID, lanID, transferFrom, transferTo);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure your email service here
      host: "rci-rogers-com.mail.protection.outlook.com",
      port: 25,
    });

    // Render email template
    const emailHTML = ReactDOMServer.renderToString(
      React.createElement(FetchTransferData, { data })
    );

    // Send mail with defined transport object
    await transporter.sendMail({
      from: "no-reply@rci.rogers.com",
      to: transferFrom,
      cc: `${transferTo}, golla.babu@rci.rogers.com`,
      subject: "Flextrack Transfer Request",
      html: emailHTML,
    });
    console.log(emailHTML);

    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.get("/transfer-form", async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send("Failed to fetch items from database.");
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
