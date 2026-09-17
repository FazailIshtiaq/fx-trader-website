import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: Number(process.env.PORT || 587),
  secure: Number(process.env.PORT) === 465,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

export default transporter;
