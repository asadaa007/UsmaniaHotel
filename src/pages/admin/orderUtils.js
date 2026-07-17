export const MONTH_FORMATTER = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
export const TIME_FORMATTER = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
export const SHORT_TIME_FORMATTER = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });

export function safeDate(value) {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

export function formatDate(value, formatter) {
  const d = safeDate(value);
  if (!d) return '—';
  // Uppercase the am/pm marker (en-GB emits lowercase) for a clean 12-hour display.
  return formatter.format(d).replace(/\b(am|pm)\b/i, m => m.toUpperCase());
}

export function monthKey(date) {
  const d = safeDate(date);
  if (!d) return 'unknown';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
