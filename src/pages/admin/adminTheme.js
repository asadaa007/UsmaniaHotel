// Dashboard design tokens for /management — deliberately distinct from the marketing
// site's gold/serif/pill-button look. Dense, sans-serif, slate-based, semantic status colors.

export const colors = {
  bg: '#0B0F19',
  surface: '#111827',
  surfaceHover: '#161F31',
  surfaceAlt: '#0F1522',
  border: '#26324A',
  borderLight: '#1C2536',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  accent: '#D4AF37',
  accentHover: '#E3C458',
  accentMuted: 'rgba(212,175,55,0.12)',
  success: '#22C55E',
  successBg: 'rgba(34,197,94,0.12)',
  warning: '#F59E0B',
  warningBg: 'rgba(245,158,11,0.12)',
  info: '#3B82F6',
  infoBg: 'rgba(59,130,246,0.12)',
  danger: '#EF4444',
  dangerBg: 'rgba(239,68,68,0.1)',
};

export const statusColors = {
  'Pending': { fg: colors.warning, bg: colors.warningBg },
  'Confirmed': { fg: colors.info, bg: colors.infoBg },
  'Out for Delivery': { fg: colors.info, bg: colors.infoBg },
  'Delivered': { fg: colors.success, bg: colors.successBg },
  'Cancelled': { fg: colors.danger, bg: colors.dangerBg },
};

export const font = "'Inter', system-ui, sans-serif";

export const radius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
};

export const cardStyle = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.lg,
  padding: '20px',
};

export const primaryButtonStyle = {
  background: colors.accent,
  color: '#111827',
  border: 'none',
  borderRadius: radius.md,
  padding: '9px 18px',
  fontWeight: 600,
  fontSize: '13px',
  fontFamily: font,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
};

export const secondaryButtonStyle = {
  background: 'transparent',
  color: colors.textSecondary,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.md,
  padding: '9px 18px',
  fontWeight: 600,
  fontSize: '13px',
  fontFamily: font,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
};

export const dangerButtonStyle = {
  background: colors.dangerBg,
  color: colors.danger,
  border: 'none',
  borderRadius: radius.sm,
  width: '30px',
  height: '30px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export const iconButtonStyle = {
  background: colors.surfaceHover,
  color: colors.textSecondary,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.sm,
  width: '30px',
  height: '30px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export const fieldStyle = {
  width: '100%',
  boxSizing: 'border-box',
  background: colors.surfaceAlt,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.md,
  padding: '9px 12px',
  color: colors.textPrimary,
  fontSize: '13px',
  fontFamily: font,
};

export const labelStyle = {
  display: 'block',
  color: colors.textMuted,
  fontSize: '11px',
  fontWeight: 600,
  marginBottom: '6px',
  letterSpacing: '0.3px',
};

export function badgeStyle(status) {
  const c = statusColors[status] || { fg: colors.textSecondary, bg: colors.surfaceHover };
  return {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '11px',
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: '999px',
    color: c.fg,
    background: c.bg,
  };
}
