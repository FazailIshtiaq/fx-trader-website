import Message from "../models/Message.js";
import transporter from "../config/mailer.js";

export const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 1. Save it in the database so it also shows up in the admin panel
    await Message.create({ name, email, message });

    // 2. Email a notification to the admin's inbox
    await transporter.sendMail({
      from: `"FX Trader Website" <${process.env.USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", {
      message: error.message,
      code: error.code,
      response: error.response,
      stack: error.stack,
    });
    res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
};

export const getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
};

export const markMessageRead = async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  if (!message) return res.status(404).json({ message: "Not found" });
  res.json(message);
};

export const deleteMessage = async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};