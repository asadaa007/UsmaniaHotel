// Change this (or set VITE_ADMIN_PASSCODE in a .env file) to update the /management login passcode.
// This is a client-side-only gate, not real authentication — it only deters casual access.
export const ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'usmania786';

// Business name, address, phone, and WhatsApp number are editable from /management
// (Site Content tab) and read via useSiteContent() → content.business. These helpers
// just format that data into usable links.
export function phoneToTel(phoneDisplay) {
  return `tel:${phoneDisplay.replace(/\s+/g, '')}`;
}

export function whatsappLink(number, text) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
