import { colors, cardStyle } from './adminTheme';

export default function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px' }}>
      <div style={{
        width: '38px', height: '38px', borderRadius: '9px', flexShrink: 0,
        background: accent ? colors.accentMuted : colors.surfaceHover,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} color={accent ? colors.accent : colors.textSecondary} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ color: colors.textPrimary, fontSize: '20px', fontWeight: 700, lineHeight: 1.2 }}>{value}</div>
        <div style={{ color: colors.textMuted, fontSize: '12px' }}>{label}</div>
      </div>
    </div>
  );
}
