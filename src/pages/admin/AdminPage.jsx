import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, ShoppingBag, UtensilsCrossed, FileText, Archive, ChefHat } from 'lucide-react';
import { isAdminAuthed, logoutAdmin } from '../../lib/adminAuth';
import { useOrders } from '../../lib/orderStore';
import { useSiteContent } from '../../lib/siteContentStore';
import { colors, font } from './adminTheme';
import AdminLogin from './AdminLogin';
import OrdersTab from './OrdersTab';
import MenuTab from './MenuTab';
import SiteContentTab from './SiteContentTab';
import DataBackupTab from './DataBackupTab';

const navItems = [
  { id: 'orders', label: 'Orders', Icon: ShoppingBag },
  { id: 'menu', label: 'Menu Content', Icon: UtensilsCrossed },
  { id: 'content', label: 'Site Content', Icon: FileText },
  { id: 'backup', label: 'Backup & Restore', Icon: Archive },
];

const tabTitles = {
  orders: 'Orders',
  menu: 'Menu Content',
  content: 'Site Content',
  backup: 'Backup & Restore',
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(isAdminAuthed);
  const [tab, setTab] = useState('orders');
  const { orders } = useOrders();
  const { content } = useSiteContent();

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  const pendingCount = orders.filter(o => o.status === 'Pending').length;

  return (
    <div className="admin-shell" style={{ minHeight: '100vh', background: colors.bg, fontFamily: font, display: 'flex' }}>
      {/* Sidebar */}
      <nav className="admin-sidebar" style={{
        width: '240px',
        flexShrink: 0,
        background: colors.surface,
        borderRight: `1px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, bottom: 0, left: 0,
      }}>
        <div style={{ padding: '22px 20px', borderBottom: `1px solid ${colors.borderLight}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '8px',
            background: colors.accentMuted, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ChefHat size={18} color={colors.accent} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: colors.textPrimary, fontSize: '13px', fontWeight: 700, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {content.business.name}
            </div>
            <div style={{ color: colors.textMuted, fontSize: '11px' }}>Management</div>
          </div>
        </div>

        <div className="admin-nav-items" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              aria-current={tab === id}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '8px', border: 'none',
                background: tab === id ? colors.accentMuted : 'transparent',
                color: tab === id ? colors.accent : colors.textSecondary,
                fontSize: '13px', fontWeight: 600, fontFamily: font, cursor: 'pointer',
                textAlign: 'left', width: '100%', flexShrink: 0, whiteSpace: 'nowrap',
              }}
            >
              <Icon size={16} />
              <span className="admin-nav-label" style={{ flex: 1 }}>{label}</span>
              {id === 'orders' && pendingCount > 0 && (
                <span style={{
                  background: colors.accent, color: '#111827',
                  borderRadius: '999px', fontSize: '10px', fontWeight: 700,
                  padding: '1px 7px', minWidth: '18px', textAlign: 'center',
                }}>{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        <div className="admin-sidebar-footer" style={{ padding: '12px', borderTop: `1px solid ${colors.borderLight}`, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Link
            to="/"
            style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
              borderRadius: '8px', color: colors.textSecondary, fontSize: '13px', fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ← Back to site
          </Link>
          <button
            onClick={() => { logoutAdmin(); setAuthed(false); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
              borderRadius: '8px', border: 'none', background: 'transparent',
              color: colors.danger, fontSize: '13px', fontWeight: 600, fontFamily: font, cursor: 'pointer',
              width: '100%', textAlign: 'left',
            }}
          ><LogOut size={16} /> Sign Out</button>
        </div>
      </nav>

      {/* Main content */}
      <div className="admin-main" style={{ flex: 1, marginLeft: '240px', minWidth: 0 }}>
        <header style={{
          padding: '20px 32px',
          borderBottom: `1px solid ${colors.border}`,
          background: colors.bg,
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <h1 style={{ color: colors.textPrimary, fontSize: '18px', fontWeight: 700, margin: 0 }}>
            {tabTitles[tab]}
          </h1>
        </header>

        <main style={{ padding: '28px 32px', maxWidth: '1200px' }}>
          {tab === 'orders' && <OrdersTab />}
          {tab === 'menu' && <MenuTab />}
          {tab === 'content' && <SiteContentTab />}
          {tab === 'backup' && <DataBackupTab />}
        </main>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .admin-shell { flex-direction: column; }
          .admin-sidebar { width: 100% !important; position: static !important; border-right: none !important; border-bottom: 1px solid ${colors.border}; }
          .admin-main { margin-left: 0 !important; }
          .admin-nav-items { flex-direction: row !important; overflow-x: auto; padding: 10px 12px !important; }
          .admin-nav-items button { width: auto !important; }
          .admin-nav-label { display: none; }
          .admin-sidebar-footer { flex-direction: row !important; border-top: none !important; padding: 0 12px 12px !important; }
          .admin-sidebar-footer a, .admin-sidebar-footer button { width: auto !important; }
        }
      `}</style>
    </div>
  );
}
