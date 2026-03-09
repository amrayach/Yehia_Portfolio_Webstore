const PLACEHOLDER_INSTAGRAM_HANDLE = 'your_instagram_handle';
const PLACEHOLDER_EMAIL = 'hello@example.com';

const cleanValue = (value: string | undefined): string => value?.trim() ?? '';

const normalizeInstagramHandle = (value: string): string => value.replace(/^@+/, '').trim();

const normalizeInstagramUrl = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const emailFromEnv = cleanValue(import.meta.env.PUBLIC_INQUIRY_EMAIL);
const instagramHandleFromEnv = normalizeInstagramHandle(cleanValue(import.meta.env.PUBLIC_INSTAGRAM_HANDLE));
const instagramUrlFromEnv = normalizeInstagramUrl(cleanValue(import.meta.env.PUBLIC_INSTAGRAM_URL));

const inquiryEmail = emailFromEnv === PLACEHOLDER_EMAIL ? '' : emailFromEnv;
const instagramHandle = instagramHandleFromEnv === PLACEHOLDER_INSTAGRAM_HANDLE ? '' : instagramHandleFromEnv;
const instagramProfileUrl = instagramUrlFromEnv || (instagramHandle ? `https://instagram.com/${instagramHandle}` : '');

export const INQUIRY_CONTACT = {
  inquiryEmail,
  instagramHandle,
  instagramProfileUrl,
  hasEmail: Boolean(inquiryEmail),
  hasInstagram: Boolean(instagramHandle || instagramProfileUrl),
} as const;

export const buildMailtoUrl = (subject: string, message: string): string => {
  if (!INQUIRY_CONTACT.hasEmail) {
    return `/contact?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`;
  }

  return `mailto:${INQUIRY_CONTACT.inquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
};

export const buildInstagramInquiryUrl = (message: string): string => {
  if (INQUIRY_CONTACT.instagramHandle) {
    return `https://ig.me/m/${INQUIRY_CONTACT.instagramHandle}?text=${encodeURIComponent(message)}`;
  }

  if (INQUIRY_CONTACT.instagramProfileUrl) {
    return INQUIRY_CONTACT.instagramProfileUrl;
  }

  return `/contact?subject=${encodeURIComponent('Shop Inquiry')}&message=${encodeURIComponent(message)}`;
};
