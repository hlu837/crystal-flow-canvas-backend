import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check, Eye, ArrowUpRight, Copy, ChevronDown } from 'lucide-react';
import ninjaLogo from '@/assets/ninja-splash-logo.png';

type Step = 'email' | 'profile';
type EmailFormat = 'ninjaFirst' | 'ninjaLast';

const generateSessionId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = [4, 4, 4];
  return segments.map(len =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  ).join('-');
};

const generateMockActivity = () => [
  { action: 'Page View', target: '/home', time: '0s ago' },
  { action: 'Scroll', target: 'Hero Section', time: '3s ago' },
  { action: 'Click', target: 'GET STARTED', time: '8s ago' },
  { action: 'Domain Interest', target: 'hosting.ninja', time: '12s ago' },
  { action: 'Hover', target: 'Pricing Card', time: '18s ago' },
];

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://ninjaservers.onrender.com';

const sendVerificationEmail = async (email: string) => {
  const response = await fetch(`${API_BASE}/api/send-verification-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send email');
  }
  return response.json();
};

const verifyEmail = async (email: string, code: string) => {
  const response = await fetch(`${API_BASE}/api/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Invalid code');
  }
  return response.json();
};

interface VisitorProfileFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisitorProfileFlow = ({ isOpen, onClose }: VisitorProfileFlowProps) => {
  const [step, setStep] = useState<Step>('email');
  const [emailFormat, setEmailFormat] = useState<EmailFormat>('ninjaFirst');
  const [emailPrefix, setEmailPrefix] = useState('');
  const [otp, setOtp] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [requestedEmail, setRequestedEmail] = useState('');
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [sessionId] = useState(generateSessionId);
  const [showRecords, setShowRecords] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formatDropdown, setFormatDropdown] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('email');
        setEmailPrefix('');
        setOtp('');
        setOtpRequested(false);
        setAgreedToPrivacy(false);
        setShowRecords(false);
      }, 300);
    }
  }, [isOpen]);

  const handleRequestOtp = async () => {
    if (emailPrefix.trim().length < 3) return;
    setLoadingSend(true);
    setError('');
    try {
      await sendVerificationEmail(fullEmail);
      setOtpRequested(true);
      setRequestedEmail(fullEmail);
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email');
    } finally {
      setLoadingSend(false);
    }
  };

  const handleSubmit = async () => {
    if (!agreedToPrivacy || otp.length < 6) return;
    setLoadingVerify(true);
    setError('');
    try {
      await verifyEmail(requestedEmail || fullEmail, otp);
      setStep('profile');
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoadingVerify(false);
    }
  };

  const fullEmail = `${emailPrefix}@gmail.com`;
  const displayLabel = emailFormat === 'ninjaFirst' ? 'UserNinja@' : 'User@Ninja';

  const copySessionId = () => {
    navigator.clipboard.writeText(sessionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activity = generateMockActivity();

  // Purple-dominant glass palette matching reference image
  const purple = {
    card: 'rgba(25, 15, 45, 0.65)',
    cardBorder: 'rgba(120, 80, 180, 0.25)',
    inputBg: 'rgba(255, 255, 255, 0.08)',
    inputBorder: 'rgba(140, 100, 200, 0.3)',
    submitGradient: 'linear-gradient(135deg, rgba(140, 100, 200, 0.4), rgba(180, 140, 220, 0.25))',
    submitText: 'rgba(210, 190, 240, 0.9)',
    glowPurple: 'rgba(130, 80, 200, 0.15)',
    textPrimary: 'rgba(240, 235, 250, 0.95)',
    textSecondary: 'rgba(180, 160, 210, 0.7)',
    textMuted: 'rgba(140, 120, 170, 0.5)',
    accent: 'hsl(var(--primary))',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          {/* Backdrop — purple-tinted plexus-like feel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
            style={{
               background: 'radial-gradient(ellipse at 50% 30%, rgba(60, 20, 100, 0.5), rgba(5, 7, 12, 0.7))',
               backdropFilter: 'blur(6px)',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] rounded-2xl overflow-hidden"
            style={{
              background: purple.card,
              border: `1px solid ${purple.cardBorder}`,
              boxShadow: `
                0 0 100px rgba(100, 50, 180, 0.12),
                0 25px 60px rgba(0, 0, 0, 0.6),
                inset 0 1px 0 rgba(255, 255, 255, 0.05)
              `,
              backdropFilter: 'blur(40px)',
            }}
          >
            {/* Top glow accent */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(140, 100, 220, 0.4), transparent)' }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-10 p-2 rounded-full transition-all duration-300 hover:rotate-90"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(140, 100, 200, 0.15)',
              }}
            >
              <X className="w-4 h-4" style={{ color: purple.textSecondary }} />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {/* ───── EMAIL + OTP STEP ───── */}
                {step === 'email' && (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Header — top right */}
                    <div className="flex items-start justify-end mb-1">
                      <div className="flex flex-col items-end">
                        <h2 
                          className="font-orbitron text-sm tracking-[0.2em] font-bold"
                          style={{ color: purple.textPrimary }}
                        >
                          NINJASERVERS
                        </h2>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span
                            className="text-[11px] font-semibold rounded px-2 py-0.5"
                            style={{
                              color: purple.accent,
                              border: `1px solid hsl(var(--primary) / 0.3)`,
                              background: 'hsl(var(--primary) / 0.08)',
                            }}
                          >
                            Network
                          </span>
                          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Glass form card */}
                    <div
                      className="rounded-2xl p-5 sm:p-6 mt-4"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(180, 140, 240, 0.2)',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 40px rgba(140, 100, 220, 0.05), 0 8px 32px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                    {/* Logo — hexagon style matching background */}
                    <div className="flex justify-center my-10">
                      <div className="relative">
                        <svg
                          width="96"
                          height="96"
                          viewBox="0 0 100 100"
                          className="drop-shadow-lg"
                        >
                          <defs>
                            <linearGradient id="hexLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="hsl(182, 100%, 62%)" stopOpacity="0.6" />
                              <stop offset="100%" stopColor="hsl(270, 60%, 50%)" stopOpacity="0.4" />
                            </linearGradient>
                            <filter id="hexGlow">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>
                          <polygon
                            points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
                            fill="rgba(60, 30, 100, 0.35)"
                            stroke="hsl(182, 100%, 62%)"
                            strokeWidth="1.5"
                            filter="url(#hexGlow)"
                          />
                          <polygon
                            points="50,18 80,35 80,65 50,82 20,65 20,35"
                            fill="none"
                            stroke="rgba(140, 100, 220, 0.35)"
                            strokeWidth="1"
                          />
                        </svg>
                        {/* Glow */}
                        <div
                          className="absolute inset-0 -m-4 rounded-3xl pointer-events-none"
                          style={{ background: `radial-gradient(circle, ${purple.glowPurple}, transparent 70%)` }}
                        />
                      </div>
                    </div>

                    {/* Format toggle */}
                    <div className="flex justify-end mb-2">
                      <div className="relative">
                        <button
                          onClick={() => setFormatDropdown(!formatDropdown)}
                          className="flex items-center gap-1 text-[10px] transition-colors rounded px-2 py-1"
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(140, 100, 200, 0.2)',
                            color: purple.accent,
                          }}
                        >
                          <span className="font-semibold">{displayLabel}</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        <AnimatePresence>
                          {formatDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="absolute right-0 top-full mt-1 rounded-lg overflow-hidden z-10 min-w-[130px]"
                              style={{
                                background: 'rgba(25, 15, 45, 0.95)',
                                border: `1px solid ${purple.inputBorder}`,
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
                              }}
                            >
                              {(['ninjaFirst', 'ninjaLast'] as const).map((fmt) => (
                                <button
                                  key={fmt}
                                  onClick={() => { setEmailFormat(fmt); setFormatDropdown(false); }}
                                  className="w-full text-left px-3 py-2 text-xs transition-colors"
                                  style={{
                                    color: emailFormat === fmt ? purple.accent : purple.textSecondary,
                                    background: emailFormat === fmt ? 'rgba(140, 100, 200, 0.1)' : 'transparent',
                                  }}
                                >
                                  {fmt === 'ninjaFirst' ? 'UserNinja@' : 'User@Ninja'}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Email input row */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-1">
                      <div
                        className="flex items-stretch gap-0 rounded-xl overflow-hidden flex-1"
                        style={{ border: `1px solid ${purple.inputBorder}` }}
                      >
                        <input
                          type="text"
                          value={emailPrefix}
                          onChange={e => setEmailPrefix(e.target.value.replace(/[^a-zA-Z0-9._-]/g, ''))}
                          disabled={otpRequested}
                          placeholder={emailFormat === 'ninjaFirst' ? 'ninja.2025.servers' : 'user.2025'}
                          className="flex-1 min-w-0 px-4 py-3 text-sm focus:outline-none font-mono"
                          style={{
                            background: otpRequested ? 'rgba(255,255,255,0.06)' : purple.inputBg,
                            color: otpRequested ? 'rgba(200,200,200,0.8)' : purple.textPrimary,
                            caretColor: purple.accent,
                          }}
                        />
                        <div
                          className="flex items-center px-3 text-xs font-bold tracking-wide select-none shrink-0"
                          style={{
                            background: 'rgba(180, 60, 60, 0.8)',
                            color: 'rgba(255, 220, 220, 0.95)',
                          }}
                        >
                          @Gmail
                        </div>
                        {/* Request OTP - desktop only (inside row) */}
                        <button
                          onClick={handleRequestOtp}
                          disabled={emailPrefix.trim().length < 3 || loadingSend}
                          className="hidden sm:flex items-center gap-1.5 px-4 text-xs font-semibold whitespace-nowrap disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: purple.textPrimary,
                          }}
                        >
                          {loadingSend ? 'Sending...' : 'Request OTP'}
                        </button>
                      </div>
                      {/* Request OTP - mobile only (full width below) */}
                      <button
                        onClick={handleRequestOtp}
                        disabled={emailPrefix.trim().length < 3 || loadingSend}
                        className="flex sm:hidden items-center justify-center gap-1.5 w-full py-3 text-xs font-semibold rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                        style={{
                          background: 'rgba(140, 100, 200, 0.15)',
                          border: `1px solid ${purple.inputBorder}`,
                          color: purple.textPrimary,
                        }}
                      >
                        {loadingSend ? 'Sending...' : 'Request OTP'}
                      </button>
                    </div>

                    {otpRequested && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-right text-[11px] font-semibold mb-3 mt-1"
                        style={{ color: 'hsl(150 80% 50%)' }}
                      >
                        OTP Requested
                      </motion.p>
                    )}

                    {/* OTP Section */}
                    <AnimatePresence>
                      {otpRequested && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          <label
                            className="text-xs font-semibold tracking-wide mb-2 block mt-4"
                            style={{ color: purple.textSecondary }}
                          >
                            OTP
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={otp}
                            onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder=""
                            className="w-full rounded-xl px-4 py-3.5 text-sm font-mono tracking-[0.5em] focus:outline-none mb-5 transition-all duration-300"
                            style={{
                              background: purple.inputBg,
                              color: purple.textPrimary,
                              border: `1px solid ${otp.length >= 4 ? 'rgba(140, 100, 220, 0.5)' : purple.inputBorder}`,
                              caretColor: purple.textPrimary,
                            }}
                          />

                          {error && (
                            <p className="text-xs mb-4" style={{ color: 'rgba(255, 100, 100, 0.9)' }}>
                              {error}
                            </p>
                          )}

                          {/* Privacy checkbox */}
                          <label className="flex items-start gap-3 mb-6 cursor-pointer group">
                            <div
                              onClick={() => setAgreedToPrivacy(!agreedToPrivacy)}
                              className="mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all shrink-0"
                              style={{
                                background: agreedToPrivacy ? 'hsl(var(--primary))' : 'transparent',
                                border: agreedToPrivacy ? '2px solid hsl(var(--primary))' : `2px solid ${purple.inputBorder}`,
                                boxShadow: agreedToPrivacy ? '0 0 12px hsl(var(--primary) / 0.3)' : 'none',
                              }}
                            >
                              {agreedToPrivacy && <Check className="w-3 h-3" style={{ color: 'hsl(var(--primary-foreground))' }} />}
                            </div>
                            <span className="text-xs leading-relaxed" style={{ color: purple.textSecondary }}>
                              I agree to the{' '}
                              <span style={{ color: purple.accent }} className="underline cursor-pointer">
                                privacy policy
                              </span>{' '}
                              of NinjaServers
                            </span>
                          </label>

                          {/* Submit */}
                          <button
                            onClick={handleSubmit}
                            disabled={!agreedToPrivacy || otp.length < 6 || loadingVerify}
                            className="w-full py-3.5 rounded-xl font-orbitron text-sm font-bold tracking-[0.2em] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
                            style={{
                              background: purple.submitGradient,
                              color: purple.submitText,
                              border: '1px solid rgba(160, 120, 220, 0.2)',
                              boxShadow: '0 4px 20px rgba(120, 70, 200, 0.15)',
                            }}
                          >
                            {loadingVerify ? 'VERIFYING...' : 'SUBMIT'}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    </div>
                    {/* End glass form card */}

                    {/* Footer — glass black */}
                    <div
                      className="mt-8 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-5 rounded-b-2xl"
                      style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(20px)',
                        borderTop: '1px solid rgba(140, 100, 200, 0.1)',
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-center gap-4 text-[10px]" style={{ color: purple.textMuted }}>
                        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                        <span>·</span>
                        <a href="#" className="hover:text-foreground transition-colors">About the network</a>
                        <span>·</span>
                        <a href="#" className="hover:text-foreground transition-colors">Contact Us</a>
                      </div>
                      <p className="text-[9px] mt-2 text-center font-mono" style={{ color: purple.textMuted }}>
                        © NinjaServers 2025-26
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ───── PROFILE STEP ───── */}
                {step === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Network status */}
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-orbitron text-xs tracking-[0.2em]" style={{ color: purple.textPrimary }}>
                        NINJASERVERS
                      </h2>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-semibold rounded-full px-3 py-1"
                          style={{
                            color: purple.accent,
                            border: '1px solid hsl(var(--primary) / 0.3)',
                            background: 'hsl(var(--primary) / 0.08)',
                          }}
                        >
                          Network
                        </span>
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Profile card */}
                    <div
                      className="rounded-xl p-5 mb-4"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${purple.inputBorder}`,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, rgba(140, 100, 200, 0.3), rgba(80, 40, 140, 0.4))',
                            border: '2px solid rgba(160, 120, 220, 0.3)',
                            boxShadow: '0 0 20px rgba(130, 80, 200, 0.15)',
                          }}
                        >
                          <span className="font-orbitron text-lg font-bold" style={{ color: 'rgba(180, 140, 240, 0.9)' }}>V</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: purple.textPrimary }}>VISITOR</p>
                          <p className="text-[10px] tracking-wide" style={{ color: purple.textSecondary }}>Tier 0 · Anonymous</p>
                        </div>
                      </div>

                      {/* Session ID */}
                      <div
                        className="rounded-lg p-3 mb-3"
                        style={{
                          background: 'rgba(0, 0, 0, 0.3)',
                          border: `1px solid ${purple.inputBorder}`,
                        }}
                      >
                        <p className="text-[10px] mb-1 tracking-wide" style={{ color: purple.textSecondary }}>SESSION ID</p>
                        <div className="flex items-center justify-between">
                          <code className="font-mono text-sm font-bold tracking-widest" style={{ color: purple.accent }}>{sessionId}</code>
                          <button onClick={copySessionId} className="p-1.5 rounded-md transition-colors" style={{ color: copied ? 'hsl(150 80% 50%)' : purple.textSecondary }}>
                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="grid grid-cols-2 gap-3 text-[10px] mb-4">
                        <div>
                          <p style={{ color: purple.textSecondary }}>Joined</p>
                          <p className="font-medium" style={{ color: purple.textPrimary }}>{new Date().toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p style={{ color: purple.textSecondary }}>Email</p>
                          <p className="font-medium truncate" style={{ color: purple.textPrimary }}>{fullEmail}</p>
                        </div>
                      </div>

                      {/* Privacy notice */}
                      <div className="text-[10px] leading-relaxed pt-3" style={{ color: purple.textMuted, borderTop: `1px solid ${purple.inputBorder}` }}>
                        🔒 Your identity is fully anonymous. Only the network can internally link metadata if legally required.
                      </div>
                    </div>

                    {/* Public Records toggle */}
                    <button
                      onClick={() => setShowRecords(!showRecords)}
                      className="w-full flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300 mb-3"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${purple.inputBorder}`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" style={{ color: purple.accent }} />
                        <span className="text-xs font-semibold" style={{ color: purple.textPrimary }}>View Public Records</span>
                      </div>
                      <span className="text-[10px]" style={{ color: purple.textSecondary }}>Immutable</span>
                    </button>

                    <AnimatePresence>
                      {showRecords && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mb-4"
                        >
                          <div
                            className="rounded-xl overflow-hidden"
                            style={{
                              background: 'rgba(0, 0, 0, 0.3)',
                              border: `1px solid ${purple.inputBorder}`,
                            }}
                          >
                            <div
                              className="grid grid-cols-3 px-3 py-2 text-[9px] font-semibold tracking-wider"
                              style={{ color: purple.textSecondary, borderBottom: `1px solid ${purple.inputBorder}` }}
                            >
                              <span>ACTION</span>
                              <span>TARGET</span>
                              <span className="text-right">TIME</span>
                            </div>
                            {activity.map((a, i) => (
                              <div
                                key={i}
                                className="grid grid-cols-3 px-3 py-2 text-[10px]"
                                style={{ borderBottom: i < activity.length - 1 ? `1px solid rgba(140, 100, 200, 0.1)` : 'none' }}
                              >
                                <span style={{ color: purple.textPrimary }}>{a.action}</span>
                                <span className="truncate" style={{ color: purple.textSecondary }}>{a.target}</span>
                                <span className="text-right" style={{ color: purple.textSecondary }}>{a.time}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Upgrade button */}
                    <button
                      className="w-full py-3.5 rounded-xl font-orbitron text-sm font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
                      style={{
                        background: purple.submitGradient,
                        color: purple.submitText,
                        border: '1px solid rgba(160, 120, 220, 0.2)',
                        boxShadow: '0 4px 20px rgba(120, 70, 200, 0.15)',
                      }}
                    >
                      UPGRADE
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    {/* Footer — glass black */}
                    <div
                      className="mt-6 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-5 rounded-b-2xl"
                      style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(20px)',
                        borderTop: '1px solid rgba(140, 100, 200, 0.1)',
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-center gap-4 text-[10px]" style={{ color: purple.textMuted }}>
                        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                        <span>·</span>
                        <a href="#" className="hover:text-foreground transition-colors">About the Network</a>
                        <span>·</span>
                        <a href="#" className="hover:text-foreground transition-colors">Contact Us</a>
                      </div>
                      <p className="text-[9px] mt-2 text-center font-mono" style={{ color: purple.textMuted }}>
                        © NinjaServers 2025-26
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VisitorProfileFlow;
