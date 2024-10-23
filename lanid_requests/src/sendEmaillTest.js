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

    //     html: `<div className="mt-4">
    //     <div className="mt-5 row justify-content-center">
    //       <p style={{ textAlign: "left", marginLeft: 45 }}>Hi Example,</p>
    //       <p style={{ textAlign: "left", marginLeft: 45 }}>
    //         Request you to please submit the below name for LAN ID creation.
    //         Kindly include Contact # of new resource as this is mandatory for MFA
    //         set up.
    //       </p>
    //       <table
    //         style={{ width: "95%" }}
    //         className="table table-sm table-bordered border-black mt-4"
    //       >
    //         <thead className="table-primary">
    //           <tr>
    //             <th scope="col">First name</th>
    //             <th scope="col">Last name</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <td>${data.employeeID}</td>
    //             <td>${data.lanID}</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>`,
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
