import nodemailer from 'nodemailer';

// In-memory storage for verification codes (in production, use a database)
const verificationCodes = new Map();

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  // Generate 6-digit verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Store code with timestamp (expires in 10 minutes)
  verificationCodes.set(email, {
    code,
    timestamp: Date.now()
  });

  try {
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      const missing = [];
      if (!gmailUser) missing.push('GMAIL_USER');
      if (!gmailPass) missing.push('GMAIL_APP_PASSWORD');
      console.error('Missing environment variables:', missing.join(', '));
      return res.status(500).json({ error: `Missing env vars: ${missing.join(', ')}` });
    }

    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    // Send verification email
    await transporter.sendMail({
      from: `NinjaServers <${gmailUser}>`,
      to: email,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${code}. It expires in 10 minutes.`
    });

    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', (error && error.message) || error);
    try {
      console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } catch (e) {
      console.error('Could not stringify error:', e);
    }
    res.status(500).json({ error: (error && error.message) || 'Failed to send email' });
  }
}