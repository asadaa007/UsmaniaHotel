import { useState } from 'react';
import { ChefHat } from 'lucide-react';
import { loginAdmin } from '../../lib/adminAuth';
import { colors, font, fieldStyle, labelStyle, primaryButtonStyle } from './adminTheme';

export default function AdminLogin({ onSuccess }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginAdmin(passcode)) {
      onSuccess();
    } else {
      setError('Incorrect passcode');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      fontFamily: font,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: '14px',
        padding: '36px 32px',
        width: '100%',
        maxWidth: '360px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '10px',
            background: colors.accentMuted, display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
          }}>
            <ChefHat size={24} color={colors.accent} />
          </div>
          <h1 style={{ color: colors.textPrimary, fontSize: '18px', fontWeight: 700, margin: 0 }}>
            Usmania Hotel
          </h1>
          <p style={{ color: colors.textMuted, fontSize: '13px', marginTop: '4px' }}>Management Panel</p>
        </div>

        <label htmlFor="admin-passcode" style={labelStyle}>
          Passcode
        </label>
        <input
          id="admin-passcode"
          type="password"
          value={passcode}
          onChange={e => { setPasscode(e.target.value); setError(''); }}
          autoFocus
          aria-invalid={!!error}
          aria-describedby={error ? 'admin-passcode-error' : undefined}
          style={{
            ...fieldStyle,
            border: error ? `1px solid ${colors.danger}` : fieldStyle.border,
            padding: '11px 14px',
            fontSize: '14px',
            marginBottom: error ? '8px' : '20px',
          }}
        />
        {error && <p id="admin-passcode-error" role="alert" style={{ color: colors.danger, fontSize: '12px', marginBottom: '20px' }}>{error}</p>}

        <button
          type="submit"
          style={{ ...primaryButtonStyle, width: '100%', justifyContent: 'center', padding: '12px 0', fontSize: '14px' }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
