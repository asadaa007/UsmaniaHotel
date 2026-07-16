import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LogOut, ShoppingBag, UtensilsCrossed, FileText, Archive, ChefHat,
  LayoutDashboard, Bell,
} from 'lucide-react';
import { useAdminAuth, logoutAdmin } from '../../lib/adminAuth';
import { useOrders } from '../../lib/orderStore';
import { useOrderAlertWatcher } from '../../lib/orderAlerts';
import { useSiteContent } from '../../lib/siteContentStore';
import { colors, font, sectionLabelStyle } from './adminTheme';
import AdminLogin from './AdminLogin';
import OverviewTab from './OverviewTab';
import OrdersTab from './OrdersTab';
import MenuTab from './MenuTab';
import SiteContentTab from './SiteContentTab';
import NotificationsTab from './NotificationsTab';
import DataBackupTab from './DataBackupTab';

const navGroups = [
  {
    label: 'Overview',
    items: [{ id: 'overview', label: 'Dashboard', Icon: LayoutDashboard }],
  },
  {
    label: 'Operations',
    items: [
      { id: 'orders', label: 'Orders', Icon: ShoppingBag },
      { id: 'menu', label: 'Menu Content', Icon: UtensilsCrossed },
      { id: 'content', label: 'Site Content', Icon: FileText },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'notifications', label: 'Notifications', Icon: Bell },
      { id: 'backup', label: 'Backup & Restore', Icon: Archive },
    ],
  },
];

const tabMeta = {
  overview: { title: 'Dashboard', subtitle: 'A quick look at how the business is doing' },
  orders: { title: 'Orders', subtitle: 'Manage incoming orders and delivery status' },
  menu: { title: 'Menu Content', subtitle: 'Add, edit, or remove dishes from the menu' },
  content: { title: 'Site Content', subtitle: 'Edit the text and images shown on the website' },
  notifications: { title: 'Notifications', subtitle: 'Configure how you get alerted about new orders' },
  backup: { title: 'Backup & Restore', subtitle: 'Export or restore your data as a JSON file' },
};

export default function AdminPage() {
  const { user, authed, loading } = useAdminAuth();
  const [tab, setTab] = useState('overview');
  const { orders } = useOrders();
  const { content } = useSiteContent();

  useOrderAlertWatcher(orders);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: colors.textMuted, fontFamily: font, fontSize: '13px' }}>Loading…</p>
      </div>
    );
  }

  if (!authed) {
    return <AdminLogin />;
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

        <div className="admin-nav-items" style={{ padding: '8px 12px 16px', display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
          {navGroups.map(group => (
            <div key={group.label} className="admin-nav-group">
              <div className="admin-section-label" style={sectionLabelStyle}>{group.label}</div>
              {group.items.map(({ id, label, Icon }) => (
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
                    marginBottom: '2px',
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
          ))}
        </div>

        <div className="admin-sidebar-footer" style={{ padding: '12px', borderTop: `1px solid ${colors.borderLight}` }}>
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
        </div>
      </nav>

      {/* Main content */}
      <div className="admin-main" style={{ flex: 1, marginLeft: '240px', minWidth: 0 }}>
        <header style={{
          padding: '18px 32px',
          borderBottom: `1px solid ${colors.border}`,
          background: colors.bg,
          position: 'sticky', top: 0, zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap',
        }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ color: colors.textPrimary, fontSize: '18px', fontWeight: 700, margin: 0 }}>
              {tabMeta[tab].title}
            </h1>
            <p style={{ color: colors.textMuted, fontSize: '12px', margin: '2px 0 0' }}>{tabMeta[tab].subtitle}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            {user?.email && (
              <span style={{
                color: colors.textSecondary, fontSize: '12px', fontWeight: 600,
                background: colors.surfaceHover, border: `1px solid ${colors.border}`,
                borderRadius: '999px', padding: '6px 12px',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px',
              }}>{user.email}</span>
            )}
            <button
              onClick={() => logoutAdmin()}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px',
                borderRadius: '8px', border: `1px solid ${colors.border}`, background: 'transparent',
                color: colors.danger, fontSize: '13px', fontWeight: 600, fontFamily: font, cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            ><LogOut size={15} /> Sign Out</button>
          </div>
        </header>

        <main style={{ padding: '28px 32px' }}>
          {tab === 'overview' && <OverviewTab />}
          {tab === 'orders' && <OrdersTab />}
          {tab === 'menu' && <MenuTab />}
          {tab === 'content' && <SiteContentTab />}
          {tab === 'notifications' && <NotificationsTab />}
          {tab === 'backup' && <DataBackupTab />}
        </main>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .admin-shell { flex-direction: column; }
          .admin-sidebar { width: 100% !important; position: static !important; border-right: none !important; border-bottom: 1px solid ${colors.border}; }
          .admin-main { margin-left: 0 !important; }
          .admin-nav-items { flex-direction: row !important; overflow-x: auto; padding: 10px 12px !important; }
          .admin-nav-group { display: flex; flex-direction: row; flex-shrink: 0; }
          .admin-section-label { display: none !important; }
          .admin-nav-items button { width: auto !important; margin-bottom: 0 !important; }
          .admin-nav-label { display: none; }
          .admin-sidebar-footer { padding: 8px 12px !important; }
        }
      `}</style>
    </div>
  );
}
