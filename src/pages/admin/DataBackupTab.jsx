import { useRef, useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { colors, font, cardStyle, primaryButtonStyle, secondaryButtonStyle } from './adminTheme';
import { fetchOrders, saveOrder } from '../../lib/orderStore';

const MENU_DOC = doc(db, 'content', 'menu');
const SITE_DOC = doc(db, 'content', 'site');

export default function DataBackupTab() {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    setBusy(true);
    setMessage('');
    try {
      const [menuSnap, siteSnap, orders] = await Promise.all([
        getDoc(MENU_DOC),
        getDoc(SITE_DOC),
        fetchOrders(),
      ]);
      const backup = {
        exportedAt: new Date().toISOString(),
        menu: menuSnap.exists() ? menuSnap.data().items : null,
        siteContent: siteSnap.exists() ? siteSnap.data() : null,
        orders,
      };
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `usmania-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setMessage(`Could not export backup (${err.message}).`);
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
        if (Array.isArray(data.menu)) await setDoc(MENU_DOC, { items: data.menu });
        if (data.siteContent) await setDoc(SITE_DOC, data.siteContent);
        if (Array.isArray(data.orders) && data.orders.length) {
          const existing = await fetchOrders();
          const existingIds = new Set(existing.map(o => o.id));
          const missing = data.orders.filter(o => !existingIds.has(o.id));
          for (const order of missing) {
            await saveOrder(order);
          }
        }
        setMessage('Backup restored.');
      } catch (err) {
        setMessage(`Could not restore that backup (${err.message}).`);
      } finally {
        setBusy(false);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div style={{ ...cardStyle, display: 'grid', gap: '18px', fontFamily: font }}>
      <div>
        <h3 style={{ color: colors.accent, fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>Why this matters</h3>
        <p style={{ color: colors.textSecondary, fontSize: '13px', lineHeight: 1.7 }}>
          Menu, site content, and orders all live permanently in Firestore now, so they survive browser
          clearing and work the same on any device you sign into. A downloaded backup is still worth keeping
          as your own independent copy — download one regularly and keep the file somewhere safe.
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
