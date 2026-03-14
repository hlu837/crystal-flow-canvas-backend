// In-memory storage for verification codes (in production, use a database)
// Note: This will reset on each function cold start in serverless
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

  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code required' });
  }

  const stored = verificationCodes.get(email);
  if (!stored || stored.code !== code) {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  // Check if expired (10 minutes)
  if (Date.now() - stored.timestamp > 10 * 60 * 1000) {
    verificationCodes.delete(email);
    return res.status(400).json({ error: 'Verification code has expired' });
  }

  // Success - remove the code
  verificationCodes.delete(email);
  res.status(200).json({ message: 'Email verified successfully' });
}