export const MONTH_FORMATTER = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
export const TIME_FORMATTER = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
export const SHORT_TIME_FORMATTER = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

export function safeDate(value) {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

export function formatDate(value, formatter) {
  const d = safeDate(value);
  return d ? formatter.format(d) : '—';
}

export function monthKey(date) {
  const d = safeDate(date);
  if (!d) return 'unknown';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
