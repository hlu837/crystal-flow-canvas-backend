import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for verification codes (in production, use a database)
const verificationCodes = new Map();

app.use(cors());
app.use(express.json());

// Simple request logging to help debug API calls
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.post('/api/send-verification-email', async (req, res) => {
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
      console.error('Missing environment variables: GMAIL_USER or GMAIL_APP_PASSWORD');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    await transporter.sendMail({
      from: gmailUser,
      to: email,
      subject: 'Your NinjaServers Verification Code',
      text: `Your verification code is: ${code}. It expires in 10 minutes.`,
      html: `<p>Your verification code is: <strong>${code}</strong></p><p>It expires in 10 minutes.</p>`
    });

    res.json({ message: 'Verification email sent' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/verify-email', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code required' });
  }

  const stored = verificationCodes.get(email);
  if (!stored) {
    return res.status(400).json({ error: 'No verification code found' });
  }

  // Check if code is expired (10 minutes)
  if (Date.now() - stored.timestamp > 10 * 60 * 1000) {
    verificationCodes.delete(email);
    return res.status(400).json({ error: 'Verification code expired' });
  }

  if (stored.code !== code) {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  verificationCodes.delete(email);
  res.json({ message: 'Email verified successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});