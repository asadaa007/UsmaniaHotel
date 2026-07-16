import { useState } from 'react';
import { ChefHat } from 'lucide-react';
import { loginAdmin } from '../../lib/adminAuth';
import { colors, font, fieldStyle, labelStyle, primaryButtonStyle } from './adminTheme';

const ERROR_MESSAGES = {
  'auth/invalid-credential': 'Incorrect email or password',
  'auth/invalid-email': 'That email address looks invalid',
  'auth/user-not-found': 'Incorrect email or password',
  'auth/wrong-password': 'Incorrect email or password',
  'auth/too-many-requests': 'Too many attempts — please wait a moment and try again',
  'auth/network-request-failed': 'Network error — check your connection and try again',
};

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await loginAdmin(email, password);
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || 'Could not sign in. Please try again.');
    } finally {
      setSubmitting(false);
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

        <label htmlFor="admin-email" style={labelStyle}>
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setError(''); }}
          autoFocus
          autoComplete="username"
          aria-invalid={!!error}
          style={{ ...fieldStyle, padding: '11px 14px', fontSize: '14px', marginBottom: '16px' }}
        />

        <label htmlFor="admin-password" style={labelStyle}>
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value); setError(''); }}
          autoComplete="current-password"
          aria-invalid={!!error}
          aria-describedby={error ? 'admin-password-error' : undefined}
          style={{
            ...fieldStyle,
            border: error ? `1px solid ${colors.danger}` : fieldStyle.border,
            padding: '11px 14px',
            fontSize: '14px',
            marginBottom: error ? '8px' : '20px',
          }}
        />
        {error && <p id="admin-password-error" role="alert" style={{ color: colors.danger, fontSize: '12px', marginBottom: '20px' }}>{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          style={{
            ...primaryButtonStyle,
            width: '100%', justifyContent: 'center', padding: '12px 0', fontSize: '14px',
            opacity: submitting ? 0.7 : 1,
            cursor: submitting ? 'default' : 'pointer',
          }}
        >
          {submitting ? 'Signing In…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
