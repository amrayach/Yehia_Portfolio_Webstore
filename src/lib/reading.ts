const WORDS_PER_MINUTE_DEFAULT = 200;

const sanitizeText = (value: string): string => {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/[^\p{L}\p{N}'-]+/gu, ' ')
    .trim();
};

export const countWords = (value: string): number => {
  const cleaned = sanitizeText(value);
  if (!cleaned) {
    return 0;
  }

  return cleaned.split(/\s+/).filter(Boolean).length;
};

export const estimateReadingMinutes = (value: string, wpm = WORDS_PER_MINUTE_DEFAULT): number => {
  const words = countWords(value);
  if (words === 0) {
    return 1;
  }

  return Math.max(1, Math.ceil(words / wpm));
};
