const nodemailer = require('nodemailer');
const db = require('../config/db');

// Create email transporter if SMTP credentials are provided in .env
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Send email notification for contact inquiry
 */
const sendContactNotificationEmail = async (inquiryData) => {
  try {
    // 1. Fetch recipient email from website settings (or fallback to admin email)
    let recipientEmail = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || 'info@integraadvisorypartners.com';
    try {
      const pageRes = await db.query("SELECT content FROM pages WHERE slug = 'settings'");
      if (pageRes.rows.length > 0 && pageRes.rows[0].content?.contact?.email) {
        recipientEmail = pageRes.rows[0].content.contact.email;
      }
    } catch (e) {
      // fallback stays
    }

    if (!transporter) {
      console.log(`[Email Service] SMTP not configured. Notification for ${inquiryData.email} logged to console. To enable live sending, add SMTP_HOST, SMTP_USER, SMTP_PASS to backend/.env`);
      return false;
    }

    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || 'Integra Advisory Partners'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `New Contact Inquiry from ${inquiryData.name} - Integra Advisory`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #172762; margin-top: 0;">New Contact Form Submission</h2>
          <p style="color: #555;">You have received a new contact inquiry through the Integra website:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px; font-weight: bold; width: 30%; color: #333;">Name:</td>
              <td style="padding: 10px; color: #555;">${inquiryData.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 10px; color: #555;"><a href="mailto:${inquiryData.email}">${inquiryData.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px; font-weight: bold; color: #333;">Company:</td>
              <td style="padding: 10px; color: #555;">${inquiryData.company || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px; font-weight: bold; color: #333;">Role:</td>
              <td style="padding: 10px; color: #555;">${inquiryData.role || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px; font-weight: bold; color: #333;">Inquiry Type:</td>
              <td style="padding: 10px; color: #555;">${inquiryData.inquiry_type || 'General'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; vertical-align: top; color: #333;">Message:</td>
              <td style="padding: 10px; color: #555; white-space: pre-wrap;">${inquiryData.message || 'No message provided'}</td>
            </tr>
          </table>
          <p style="color: #888; font-size: 13px; margin-top: 30px;">
            Submitted on ${new Date().toLocaleString()} | View all submissions in your Integra Admin Panel.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Notification successfully sent to ${recipientEmail}`);
    return true;
  } catch (err) {
    console.error('[Email Service] Failed to send email notification:', err.message);
    return false;
  }
};

module.exports = {
  sendContactNotificationEmail,
};

