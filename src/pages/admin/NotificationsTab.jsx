import { useState } from 'react';
import { Volume2, Bell, PlayCircle } from 'lucide-react';
import { useAlertSettingsState, fireTestAlert } from '../../lib/orderAlerts';
import { colors, font, cardStyle, primaryButtonStyle } from './adminTheme';

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      style={{
        width: '44px', height: '24px', borderRadius: '999px', border: 'none',
        background: checked ? colors.accent : colors.surfaceHover,
        position: 'relative', cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        flexShrink: 0,
        transition: 'background 0.15s',
      }}
    >
      <span style={{
        position: 'absolute', top: '3px', left: checked ? '23px' : '3px',
        width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
        transition: 'left 0.15s',
      }} />
    </button>
  );
}

function SettingRow({ icon: Icon, title, description, checked, onChange, disabled, note }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', padding: '18px 0', borderBottom: `1px solid ${colors.borderLight}` }}>
      <div style={{ display: 'flex', gap: '14px', minWidth: 0 }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '9px', flexShrink: 0,
          background: colors.accentMuted, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={18} color={colors.accent} />
        </div>
        <div>
          <div style={{ color: colors.textPrimary, fontSize: '14px', fontWeight: 600 }}>{title}</div>
          <p style={{ color: colors.textMuted, fontSize: '12px', margin: '4px 0 0', lineHeight: 1.6 }}>{description}</p>
          {note && <p style={{ color: colors.warning, fontSize: '12px', margin: '6px 0 0' }}>{note}</p>}
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} disabled={disabled} />
    </div>
  );
}

export default function NotificationsTab() {
  const [settings, updateSettings] = useAlertSettingsState();
  const [permission, setPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  );

  const handleToggleNotifications = async (enabled) => {
    if (!enabled) {
      updateSettings({ browserNotification: false });
      return;
    }
    if (typeof Notification === 'undefined') return;
    if (Notification.permission === 'granted') {
      updateSettings({ browserNotification: true });
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
    updateSettings({ browserNotification: result === 'granted' });
  };

  return (
    <div style={{ fontFamily: font, maxWidth: '640px' }}>
      <div style={cardStyle}>
        <h3 style={{ color: colors.textPrimary, fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>New Order Alerts</h3>
        <p style={{ color: colors.textMuted, fontSize: '13px', margin: '0 0 8px', lineHeight: 1.6 }}>
          Get alerted the instant a new order comes in while this dashboard is open. These only work in this
          browser on this device — open the Orders or Overview tab in the background on a shop device to catch them live.
        </p>

        <SettingRow
          icon={Volume2}
          title="Play a sound"
          description="A short chime plays whenever a new order is saved."
          checked={settings.sound}
          onChange={(v) => updateSettings({ sound: v })}
        />

        <SettingRow
          icon={Bell}
          title="Browser notification"
          description="Shows a system notification with the customer name and total."
          checked={settings.browserNotification}
          onChange={handleToggleNotifications}
          disabled={permission === 'unsupported'}
          note={
            permission === 'denied'
              ? 'Notifications are blocked for this site in your browser settings — enable them there first.'
              : permission === 'unsupported'
              ? 'Notifications aren\'t supported in this browser.'
              : null
          }
        />

        <button
          onClick={fireTestAlert}
          style={{ ...primaryButtonStyle, marginTop: '18px' }}
        >
          <PlayCircle size={16} /> Send Test Alert
        </button>
      </div>
    </div>
  );
}
