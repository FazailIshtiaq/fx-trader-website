// Sends emails via Brevo's HTTPS API instead of raw SMTP.
// Railway (and many hosts) block outbound SMTP ports (587/465), which is why
// Nodemailer + Gmail SMTP was timing out. Brevo's API works over standard
// HTTPS (port 443), so it isn't affected by that block.
//
// Exposes the same `transporter.sendMail(options)` shape as the old Nodemailer
// setup, so the rest of the app (contactController.js, subscriptionController.js)
// doesn't need to change at all.

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const transporter = {
  sendMail: async ({ to, subject, text, html, replyTo }) => {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "FX Trader",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [{ email: to }],
        subject,
        textContent: text,
        htmlContent: html || `<p>${text}</p>`,
        replyTo: replyTo ? { email: replyTo } : undefined,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Brevo API error (${response.status}): ${errorBody}`);
    }

    return response.json();
  },
};

export default transporter;