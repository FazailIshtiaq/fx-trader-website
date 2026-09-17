import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import transporter from "../config/mailer.js";

export const submitSubscription = async (req, res) => {
  // req.user comes from protectUser middleware — no need to trust name/email from the body
  const { whatsapp, planTitle, planPrice } = req.body;

  if (!planTitle || !req.file) {
    return res.status(400).json({ message: "Plan and payment screenshot are required" });
  }

  try {
    const subscription = await Subscription.create({
      user: req.user._id,
      name: req.user.name,
      email: req.user.email,
      whatsapp,
      planTitle,
      planPrice,
      screenshotUrl: `/uploads/${req.file.filename}`,
    });

    try {
      await transporter.sendMail({
        from: `"FX Trader Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
        subject: `New subscription request: ${planTitle} — ${req.user.name}`,
        html: `
          <p><strong>Name:</strong> ${req.user.name}</p>
          <p><strong>Email:</strong> ${req.user.email}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp || "-"}</p>
          <p><strong>Plan:</strong> ${planTitle} (${planPrice || "-"})</p>
          <p>Check the Admin → Subscriptions tab to review the payment screenshot and approve or reject.</p>
        `,
      });
    } catch (emailErr) {
      console.error("Subscription email notification failed:", emailErr.message);
    }

    res.status(201).json({ message: "Subscription request submitted. We'll review it shortly." });
  } catch (error) {
    console.error("Subscription submit error:", error.message);
    res.status(500).json({ message: "Failed to submit subscription request." });
  }
};

export const getSubscriptions = async (req, res) => {
  const subs = await Subscription.find().sort({ createdAt: -1 });
  res.json(subs);
};

export const updateSubscriptionStatus = async (req, res) => {
  const { status, adminNote } = req.body; // "approved" | "rejected"
  const sub = await Subscription.findByIdAndUpdate(
    req.params.id,
    { status, adminNote },
    { new: true }
  );
  if (!sub) return res.status(404).json({ message: "Not found" });

  // This is the key step: unlock premium access on the user's account
  if (status === "approved") {
    await User.findByIdAndUpdate(sub.user, { approvedPlan: sub.planTitle });
  }

  try {
    const subject =
      status === "approved"
        ? `Your ${sub.planTitle} subscription is approved!`
        : `Update on your ${sub.planTitle} subscription request`;

    const body =
      status === "approved"
        ? `Hi ${sub.name},\n\nYour payment for the ${sub.planTitle} plan has been verified. Log back into the site and your premium content is now unlocked!\n\n${adminNote || ""}`
        : `Hi ${sub.name},\n\nWe couldn't verify your payment for the ${sub.planTitle} plan.\n\n${adminNote || "Please contact us for more details."}`;

    await transporter.sendMail({
      from: `"FX Trader" <${process.env.SMTP_USER}>`,
      to: sub.email,
      subject,
      text: body,
    });
  } catch (emailErr) {
    console.error("Subscription status email failed:", emailErr.message);
  }

  res.json(sub);
};

export const deleteSubscription = async (req, res) => {
  const sub = await Subscription.findByIdAndDelete(req.params.id);
  if (!sub) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};