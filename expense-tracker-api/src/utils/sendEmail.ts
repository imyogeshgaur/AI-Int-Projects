import { createTransport } from "nodemailer";
import { config } from "dotenv";
import { resolve } from "path";
import { response } from "express";
config({ path: resolve("./src/.env") });
const myTransport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_SERVICE_EMAIL as string,
    pass: process.env.MAIL_SERVICE_PASSWORD as string,
  },
});

export const sendforgetPasswordEmail = async (email:string,name: string) => {
  try {
    const info = await myTransport.sendMail({
      from: '"Your Name" <your@email.com>',
      to: email,
      subject: "Test HTML Email",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Forgot Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      overflow: hidden;
    }
    .email-header {
      background-color: #4a90e2;
      padding: 20px;
      color: white;
      text-align: center;
    }
    .email-body {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      padding: 12px 20px;
      margin-top: 15px;
      background-color: #4a90e2;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .btn:hover {
      background-color: #3b7ac3;
    }
    .footer {
      font-size: 12px;
      color: #888888;
      text-align: center;
      padding: 15px;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h2>Password Reset Request</h2>
    </div>
    <div class="email-body">
      <p>Hello <strong>${name}</strong>,</p>
      <p>We received a request to reset your password. Click the button below to set a new password:</p>
      <button class="btn"><a href="https://google.com">Reset Password</a></button>
      <p>If you didn’t request a password reset, you can ignore this email.</p>
      <p>Thank you,<br/>HisabKitab Support Team</p>
    </div>
    <div class="footer">
      &copy; 2025 HisabKitab. All rights reserved.
    </div>
  </div>
</body>
</html>`,
    });
    console.log("Message sent: %s", info.messageId);
    return info.accepted[0];
  } catch (error: any) {
    console.log("Error in sending the email to the user : ", error);
    throw new Error(error);
  }
};
