// Business name, address, phone, and WhatsApp number are editable from /management
// (Site Content tab) and read via useSiteContent() → content.business. These helpers
// just format that data into usable links.
export function phoneToTel(phoneDisplay) {
  return `tel:${phoneDisplay.replace(/\s+/g, '')}`;
}

export function whatsappLink(number, text) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
