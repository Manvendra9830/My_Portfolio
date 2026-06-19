// ─── Contact Form Validation & Security ──────────────────────────────────────
// Comprehensive validation for the portfolio contact form.
// Covers: input sanitization, email validation, scam/spam detection,
// rate limiting, and duplicate prevention.

// ─── Scam & Spam Patterns ─────────────────────────────────────────────────────

const SCAM_PATTERNS: RegExp[] = [
  // Crypto / Investment scams
  /\b(bitcoin|ethereum|crypto|nft|blockchain|defi|token sale|ico|airdrop)\b/i,
  /\b(guaranteed returns|double your money|passive income|financial freedom)\b/i,
  /\b(invest(?:ment)?\s+opportunit)/i,
  /\b(forex|binary options|trading signals?|mining pool)\b/i,
  /\b(wallet\s+connect|seed\s+phrase|private\s+key)\b/i,

  // Phishing
  /\b(verify your (?:account|identity)|confirm your (?:password|credentials))\b/i,
  /\b(account\s+(?:suspended|locked|compromised))\b/i,
  /\b(click\s+(?:here|this link)\s+(?:to|and)\s+(?:verify|confirm|update))\b/i,
  /\b(urgent\s+action\s+required)\b/i,

  // Mass marketing spam
  /\b(unsubscribe|bulk\s+email|mass\s+mail|email\s+blast)\b/i,
  /\b(buy\s+(?:now|today)|limited\s+(?:time|offer)|act\s+now|order\s+now)\b/i,
  /\b(free\s+(?:money|gift|iphone|prize)|you(?:'ve)?\s+won)\b/i,
  /\b(no\s+obligation|risk[- ]free|100%\s+(?:free|guaranteed))\b/i,
  /\b(make\s+money\s+(?:fast|online|from\s+home))\b/i,
  /\b(work\s+from\s+home\s+(?:opportunity|job))\b/i,

  // Prescription / pharma spam
  /\b(viagra|cialis|pharmacy|prescription|pills\s+online)\b/i,

  // SEO / Backlink spam
  /\b(seo\s+(?:service|package|ranking))\b/i,
  /\b(backlink|link\s+building|guest\s+post\s+(?:service|opportunity))\b/i,
  /\b(web\s+(?:traffic|visitors)\s+(?:service|package))\b/i,

  // Lottery / prize scams
  /\b(lottery|jackpot|sweepstakes|prize\s+claim)\b/i,
  /\b(congratulations\s+you(?:'ve)?\s+(?:been\s+selected|won))\b/i,
];

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email",
  "yopmail.com", "sharklasers.com", "guerrillamailblock.com", "grr.la",
  "dispostable.com", "trashmail.com", "fakeinbox.com", "maildrop.cc",
  "10minutemail.com", "temp-mail.org", "getnada.com",
]);

// ─── Sanitization ─────────────────────────────────────────────────────────────

/** Strip HTML tags and escape special characters to prevent XSS */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")            // Strip HTML tags
    .replace(/&/g, "&amp;")             // Escape ampersand
    .replace(/</g, "&lt;")              // Escape less-than
    .replace(/>/g, "&gt;")              // Escape greater-than
    .replace(/"/g, "&quot;")            // Escape double quotes
    .replace(/'/g, "&#x27;")            // Escape single quotes
    .replace(/\//g, "&#x2F;")           // Escape forward slash
    .trim();
}

// ─── Validators ───────────────────────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateName(name: string): ValidationResult {
  const trimmed = name.trim();
  if (!trimmed) return { valid: false, error: "Name is required" };
  if (trimmed.length < 2) return { valid: false, error: "Name must be at least 2 characters" };
  if (trimmed.length > 100) return { valid: false, error: "Name must be under 100 characters" };
  if (/\d/.test(trimmed)) return { valid: false, error: "Name should not contain numbers" };
  if (/[<>{}[\]\\/]/.test(trimmed)) return { valid: false, error: "Name contains invalid characters" };
  return { valid: true };
}

export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return { valid: false, error: "Email is required" };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return { valid: false, error: "Please enter a valid email address" };

  const domain = trimmed.split("@")[1];
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return { valid: false, error: "Please use a non-disposable email address" };
  }

  return { valid: true };
}

export function validateSubject(subject: string): ValidationResult {
  const trimmed = subject.trim();
  if (!trimmed) return { valid: false, error: "Subject is required" };
  if (trimmed.length < 3) return { valid: false, error: "Subject must be at least 3 characters" };
  if (trimmed.length > 200) return { valid: false, error: "Subject must be under 200 characters" };
  return { valid: true };
}

export function validateMessage(message: string): ValidationResult {
  const trimmed = message.trim();
  if (!trimmed) return { valid: false, error: "Message is required" };
  if (trimmed.length < 10) return { valid: false, error: "Message must be at least 10 characters" };
  if (trimmed.length > 5000) return { valid: false, error: "Message must be under 5000 characters" };

  // Repetitive character check
  if (/(.)(\1{5,})/g.test(trimmed)) {
    return { valid: false, error: "Message contains repetitive characters" };
  }

  // Too many links
  const urlMatches = trimmed.match(/https?:\/\/[^\s]+/g);
  if (urlMatches && urlMatches.length > 2) {
    return { valid: false, error: "Message contains too many links" };
  }

  return { valid: true };
}

// ─── Scam / Spam Detection ────────────────────────────────────────────────────

export function detectScam(text: string): ValidationResult {
  const combined = text.toLowerCase();
  for (const pattern of SCAM_PATTERNS) {
    if (pattern.test(combined)) {
      return { valid: false, error: "Your message was flagged. Please revise the content." };
    }
  }
  return { valid: true };
}

// ─── Rate Limiting (localStorage) ──────────────────────────────────────────────

const RATE_LIMIT_KEY = "contact_submissions";
const COOLDOWN_MS = 60_000;       // 60 seconds between submissions
const MAX_PER_HOUR = 5;

interface SubmissionRecord {
  timestamps: number[];
}

function getSubmissionRecord(): SubmissionRecord {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore parse errors
  }
  return { timestamps: [] };
}

function saveSubmissionRecord(record: SubmissionRecord) {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(record));
  } catch {
    // Ignore storage errors (private browsing, etc.)
  }
}

export function checkRateLimit(): ValidationResult & { cooldownRemaining?: number } {
  const now = Date.now();
  const record = getSubmissionRecord();
  const oneHourAgo = now - 3_600_000;

  // Clean old entries
  record.timestamps = record.timestamps.filter((t) => t > oneHourAgo);

  // Check cooldown
  const lastSubmission = record.timestamps[record.timestamps.length - 1];
  if (lastSubmission) {
    const elapsed = now - lastSubmission;
    if (elapsed < COOLDOWN_MS) {
      const remaining = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
      return {
        valid: false,
        error: `Please wait ${remaining}s before sending another message`,
        cooldownRemaining: remaining,
      };
    }
  }

  // Check hourly limit
  if (record.timestamps.length >= MAX_PER_HOUR) {
    return { valid: false, error: "Too many messages sent. Please try again later." };
  }

  return { valid: true };
}

export function recordSubmission() {
  const record = getSubmissionRecord();
  record.timestamps.push(Date.now());
  saveSubmissionRecord(record);
}

// ─── Duplicate Detection ──────────────────────────────────────────────────────

const DUPLICATE_KEY = "contact_message_hashes";

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(36);
}

export function checkDuplicate(message: string): ValidationResult {
  const hash = simpleHash(message.trim().toLowerCase());
  try {
    const raw = sessionStorage.getItem(DUPLICATE_KEY);
    const hashes: string[] = raw ? JSON.parse(raw) : [];
    if (hashes.includes(hash)) {
      return { valid: false, error: "This message has already been submitted" };
    }
  } catch {
    // Ignore
  }
  return { valid: true };
}

export function recordMessageHash(message: string) {
  const hash = simpleHash(message.trim().toLowerCase());
  try {
    const raw = sessionStorage.getItem(DUPLICATE_KEY);
    const hashes: string[] = raw ? JSON.parse(raw) : [];
    hashes.push(hash);
    sessionStorage.setItem(DUPLICATE_KEY, JSON.stringify(hashes));
  } catch {
    // Ignore
  }
}

// ─── Full Validation Pipeline ─────────────────────────────────────────────────

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FullValidationResult {
  valid: boolean;
  fieldErrors: Partial<Record<keyof FormData, string>>;
  generalError?: string;
}

export function validateForm(data: FormData): FullValidationResult {
  const fieldErrors: Partial<Record<keyof FormData, string>> = {};

  const nameResult = validateName(data.name);
  if (!nameResult.valid) fieldErrors.name = nameResult.error;

  const emailResult = validateEmail(data.email);
  if (!emailResult.valid) fieldErrors.email = emailResult.error;

  const subjectResult = validateSubject(data.subject);
  if (!subjectResult.valid) fieldErrors.subject = subjectResult.error;

  const messageResult = validateMessage(data.message);
  if (!messageResult.valid) fieldErrors.message = messageResult.error;

  // If field-level validation passes, check content-level
  if (Object.keys(fieldErrors).length === 0) {
    const combined = `${data.name} ${data.subject} ${data.message}`;
    const scamResult = detectScam(combined);
    if (!scamResult.valid) {
      return { valid: false, fieldErrors: {}, generalError: scamResult.error };
    }

    const dupeResult = checkDuplicate(data.message);
    if (!dupeResult.valid) {
      return { valid: false, fieldErrors: {}, generalError: dupeResult.error };
    }

    const rateResult = checkRateLimit();
    if (!rateResult.valid) {
      return { valid: false, fieldErrors: {}, generalError: rateResult.error };
    }
  }

  return {
    valid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
  };
}
