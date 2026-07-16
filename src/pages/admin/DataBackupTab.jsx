import { useRef, useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { colors, font, cardStyle, primaryButtonStyle, secondaryButtonStyle } from './adminTheme';
import { fetchOrders, saveOrder } from '../../lib/orderStore';

const KEYS = {
  menu: 'usmania_menu_v1',
  siteContent: 'usmania_site_content_v1',
};

export default function DataBackupTab() {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    setBusy(true);
    setMessage('');
    try {
      let orders = null;
      try {
        orders = await fetchOrders();
      } catch (err) {
        setMessage(`Backup will exclude orders — could not reach the orders service (${err.message}).`);
      }
      const backup = {
        exportedAt: new Date().toISOString(),
        menu: JSON.parse(localStorage.getItem(KEYS.menu) || 'null'),
        siteContent: JSON.parse(localStorage.getItem(KEYS.siteContent) || 'null'),
        orders,
      };
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `usmania-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data.menu && !data.siteContent && !data.orders) {
          setMessage('This file doesn\'t look like a Usmania Hotel backup.');
          return;
        }
        if (!confirm('This will overwrite current menu and site content, and add any orders from the backup that aren\'t already saved. Continue?')) return;
        setBusy(true);
        if (data.menu) localStorage.setItem(KEYS.menu, JSON.stringify(data.menu));
        if (data.siteContent) localStorage.setItem(KEYS.siteContent, JSON.stringify(data.siteContent));
        if (Array.isArray(data.orders) && data.orders.length) {
          try {
            const existing = await fetchOrders();
            const existingIds = new Set(existing.map(o => o.id));
            const missing = data.orders.filter(o => !existingIds.has(o.id));
            for (const order of missing) {
              await saveOrder(order);
            }
          } catch (err) {
            setMessage(`Menu and site content restored, but orders could not be restored (${err.message}).`);
            setBusy(false);
            setTimeout(() => window.location.reload(), 1200);
            return;
          }
        }
        setMessage('Backup restored. Reloading…');
        setTimeout(() => window.location.reload(), 800);
      } catch {
        setMessage('Could not read that file — make sure it\'s a valid backup JSON exported from this panel.');
        setBusy(false);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div style={{ ...cardStyle, display: 'grid', gap: '18px', maxWidth: '560px', fontFamily: font }}>
      <div>
        <h3 style={{ color: colors.accent, fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>Why this matters</h3>
        <p style={{ color: colors.textSecondary, fontSize: '13px', lineHeight: 1.7 }}>
          Orders are saved permanently in Netlify's storage, so they survive browser clearing or switching
          devices. Menu and site content still live only in this browser's storage — clearing it, or
          switching devices, means those are gone for good. Download a backup regularly, and keep the file
          somewhere safe.
        </p>
      </div>

      <div>
        <button onClick={handleExport} disabled={busy} style={{ ...primaryButtonStyle, opacity: busy ? 0.6 : 1, cursor: busy ? 'default' : 'pointer' }}>
          <Download size={16} /> {busy ? 'Preparing…' : 'Download Backup (.json)'}
        </button>
      </div>

      <div style={{ borderTop: `1px solid ${colors.borderLight}`, paddingTop: '18px' }}>
        <button onClick={handleImportClick} disabled={busy} style={{ ...secondaryButtonStyle, opacity: busy ? 0.6 : 1, cursor: busy ? 'default' : 'pointer' }}>
          <Upload size={16} /> Restore from Backup File
        </button>
        <input ref={fileInputRef} type="file" accept="application/json" onChange={handleFileChange} style={{ display: 'none' }} />
        {message && <p style={{ color: colors.textSecondary, fontSize: '12px', marginTop: '10px' }}>{message}</p>}
      </div>
    </div>
  );
}
