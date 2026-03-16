import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for verification codes (in production, use a database)
const verificationCodes = new Map();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://crystal-flow-canvas.lovable.app,https://lovable.app')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., curl, Postman)
    if (!origin) {
      console.log('CORS: request without origin allowed');
      return callback(null, true);
    }

    const isAllowedOrigin = () => {
      // Allow wildcard (e.g., set ALLOWED_ORIGINS='*' in env)
      if (allowedOrigins.includes('*')) return true;

      // Allow exact matches from the configured allowlist
      if (allowedOrigins.includes(origin)) return true;

      // Allow any HTTPS subdomain of lovable.app (e.g. preview domains).
      // Some preview origins include extra dashes and identifiers.
      if (typeof origin === 'string') {
        // Strip the protocol and optional port for a simple hostname check.
        const hostname = origin.replace(/^https:\/\//i, '').split(':')[0];
        if (hostname === 'lovable.app' || hostname.endsWith('.lovable.app')) return true;
      }

      return false;
    };

    const allowed = isAllowedOrigin();
    console.log(`CORS: origin=${origin} allowed=${allowed}`);

    if (allowed) {
      console.log(`CORS: allowing origin ${origin}`);
      return callback(null, true);
    }

    console.warn(`CORS: blocking origin ${origin}`);
    // Do not send CORS headers for disallowed origins.
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Simple request logging to help debug API calls
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.get('/', (req, res) => {
  res.send(
    "Server is running. Use /api/debug to check env vars or POST to /api/send-verification-email to send a code."
  );
});

app.get('/api/debug', (req, res) => {
  res.json({
    env: {
      BREVO_API_KEY: !!process.env.BREVO_API_KEY,
      PORT: process.env.PORT || null,
    },
  });
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
    timestamp: Date.now(),
  });

  try {
    const brevoApiKey = process.env.BREVO_API_KEY;

    if (!brevoApiKey) {
      console.error('Missing environment variable: BREVO_API_KEY');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Use Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: 'hilinayared438@gmail.com' },
        to: [{ email }],
        subject: 'Your NinjaServers Verification Code',
        htmlContent: `<p>Your verification code is: <strong>${code}</strong></p><p>It expires in 10 minutes.</p>`,
        textContent: `Your verification code is: ${code}. It expires in 10 minutes.`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Brevo API error: ${response.status} ${errorData}`);
    }

    res.json({ message: 'Verification email sent' });
  } catch (error) {
    console.error('Email sending error:', error);
    // Return the underlying error message + stack for debugging (safe for dev; remove in production)
    res.status(500).json({
      error: 'Failed to send email',
      detail: error?.message || String(error),
      stack: error?.stack
    });
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

// On Vercel, the server is run as a serverless function and should not call listen().
// When running locally (node server.js), start the server normally.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// If this file was executed directly (node server.js), start the listener.
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;