const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
const port = 3001;
app.use(bodyParser.json());
app.use(cors()); // Route to handle form submission
app.post("/submit-form", async (req, res) => {
  const data = req.body;
  // const fromMail = "theerthag8378@gmail.com"; // Send email

  let transporter = nodemailer.createTransport({
    host: "rci-rogers-com.mail.protection.outlook.com",
    port: 25,
    // secure: false,
    // auth: {
    //   user: "gaddameeditheertha4",
    //   pass: "seft muug bgkr wqwa",
    // },
  });
  let mailOptions = {
    from: "no-reply@rci.rogers.com",
    to: "theerthaprasad.gadda@rci.rogers.com", // Replace with recipient
    subject: "New Form Submission",
    text: `Employee ID: ${data.employeeID}\nlanID: ${data.lanID}`,
    // html: FetchTerminationData(),
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", info);
    console.log(info);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
