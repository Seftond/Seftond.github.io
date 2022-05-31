require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer')
const cors = require('cors');
const app = express();
const {SERVER_PORT} = process.env


app.use(express.json());
app.use(cors());

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    tls: {
        rejectUnauthorized: false
    }
   });

   //Verifies mail is set up
   transporter.verify((err, success) => {
    err
      ? console.log(err)
      : console.log(`=== Server is ready to take messages: ${success} ===`);
   });

   //Endpoint for nodemailer
   app.post("/send", function (req, res) {
    let {username, email, subject, message} = req.body;
    let mailOptions = {
    from: `${email} ${username}`,
    to: process.env.EMAIL,
    subject: `${subject}`,
    text: `${message}`,
   };

   transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
   });
    })


    app.listen(SERVER_PORT, () => {
        console.log(`Docked at server ${SERVER_PORT}`)
    });