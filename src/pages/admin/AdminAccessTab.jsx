import { useState } from 'react';
import { ExternalLink, KeyRound, ShieldCheck } from 'lucide-react';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAdminAuth } from '../../lib/adminAuth';
import { colors, font, cardStyle, fieldStyle, labelStyle, primaryButtonStyle } from './adminTheme';

const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const CONSOLE_USERS_URL = PROJECT_ID
  ? `https://console.firebase.google.com/project/${PROJECT_ID}/authentication/users`
  : 'https://console.firebase.google.com/';

function ChangePasswordForm({ email }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }
    setSubmitting(true);
    try {
      const credential = EmailAuthProvider.credential(email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(
        err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password'
          ? 'Current password is incorrect.'
          : err.message || 'Could not change password.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px', maxWidth: '360px' }}>
      <div>
        <label style={labelStyle}>Current Password</label>
        <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} style={fieldStyle} required autoComplete="current-password" />
      </div>
      <div>
        <label style={labelStyle}>New Password</label>
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={fieldStyle} required autoComplete="new-password" />
      </div>
      <div>
        <label style={labelStyle}>Confirm New Password</label>
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={fieldStyle} required autoComplete="new-password" />
      </div>
      {error && <p role="alert" style={{ color: colors.danger, fontSize: '12px', margin: 0 }}>{error}</p>}
      {success && <p role="status" style={{ color: colors.success, fontSize: '12px', margin: 0 }}>Password changed successfully.</p>}
      <button type="submit" disabled={submitting} style={{ ...primaryButtonStyle, opacity: submitting ? 0.7 : 1, justifyContent: 'center' }}>
        {submitting ? 'Changing…' : 'Change Password'}
      </button>
    </form>
  );
}

export default function AdminAccessTab() {
  const { user } = useAdminAuth();

  return (
    <div style={{ fontFamily: font, display: 'grid', gap: '16px', maxWidth: '640px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <ShieldCheck size={18} color={colors.accent} />
          <h3 style={{ color: colors.textPrimary, fontSize: '15px', fontWeight: 700, margin: 0 }}>Signed In As</h3>
        </div>
        <p style={{ color: colors.textSecondary, fontSize: '13px', margin: 0 }}>{user?.email}</p>
      </div>

      <div style={cardStyle}>
        <h3 style={{ color: colors.textPrimary, fontSize: '15px', fontWeight: 700, margin: '0 0 10px' }}>Managing Admin Users</h3>
        <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.7, margin: '0 0 12px' }}>
          There's no sign-up page by design — admin accounts are created and removed directly in the Firebase console:
        </p>
        <ol style={{ color: colors.textSecondary, fontSize: '13px', lineHeight: 1.9, margin: '0 0 14px', paddingLeft: '20px' }}>
          <li><strong>Add a user:</strong> Authentication → Users → "Add user" → set their email and a temporary password.</li>
          <li><strong>Remove a user:</strong> find them in the Users list → the "⋮" menu → Delete account.</li>
          <li><strong>Reset someone else's password:</strong> use the "⋮" menu → "Reset password" to email them a reset link, since the console can't set a password directly for you.</li>
        </ol>
        <a
          href={CONSOLE_USERS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...primaryButtonStyle, textDecoration: 'none', display: 'inline-flex' }}
        >
          <ExternalLink size={14} /> Open Firebase Console
        </a>
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <KeyRound size={18} color={colors.accent} />
          <h3 style={{ color: colors.textPrimary, fontSize: '15px', fontWeight: 700, margin: 0 }}>Change My Password</h3>
        </div>
        <p style={{ color: colors.textMuted, fontSize: '13px', margin: '4px 0 16px', lineHeight: 1.6 }}>
          Update your own login password. You'll need your current password to confirm.
        </p>
        {user?.email && <ChangePasswordForm email={user.email} />}
      </div>
    </div>
  );
}
