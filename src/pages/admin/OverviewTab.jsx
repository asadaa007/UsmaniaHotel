import { useMemo } from 'react';
import { ShoppingBag, Clock, DollarSign, CheckCircle2, UtensilsCrossed } from 'lucide-react';
import { useOrders } from '../../lib/orderStore';
import { useMenuStore } from '../../lib/menuStore';
import { colors, font, cardStyle, badgeStyle } from './adminTheme';
import { safeDate, formatDate, SHORT_TIME_FORMATTER } from './orderUtils';
import StatCard from './StatCard';

const DAY_LABEL = new Intl.DateTimeFormat('en-GB', { weekday: 'short' });

function last7DaysBuckets(orders) {
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push({ key: d.toDateString(), label: DAY_LABEL.format(d), count: 0 });
  }
  const byKey = new Map(days.map(d => [d.key, d]));
  orders.forEach(o => {
    const d = safeDate(o.date);
    if (!d) return;
    const bucket = byKey.get(d.toDateString());
    if (bucket) bucket.count += 1;
  });
  return days;
}

function OrdersChart({ orders }) {
  const days = useMemo(() => last7DaysBuckets(orders), [orders]);
  const max = Math.max(1, ...days.map(d => d.count));

  return (
    <div style={{ ...cardStyle, fontFamily: font }}>
      <div style={{ color: colors.textPrimary, fontSize: '14px', fontWeight: 700, marginBottom: '18px' }}>Orders — Last 7 Days</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '140px' }}>
        {days.map(d => (
          <div key={d.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
            <span style={{ color: colors.textSecondary, fontSize: '11px', fontWeight: 600 }}>{d.count}</span>
            <div
              style={{
                width: '100%',
                maxWidth: '36px',
                height: `${Math.max(4, (d.count / max) * 92)}px`,
                borderRadius: '6px 6px 2px 2px',
                background: d.count > 0 ? `linear-gradient(180deg, ${colors.accentHover}, ${colors.accent})` : colors.surfaceHover,
              }}
            />
            <span style={{ color: colors.textMuted, fontSize: '11px' }}>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentOrders({ orders }) {
  const recent = orders.slice(0, 5);
  return (
    <div style={{ ...cardStyle, padding: 0, overflow: 'hidden', fontFamily: font }}>
      <div style={{ padding: '18px 20px 14px', color: colors.textPrimary, fontSize: '14px', fontWeight: 700 }}>Recent Orders</div>
      {recent.length === 0 ? (
        <p style={{ color: colors.textMuted, fontSize: '13px', padding: '0 20px 20px' }}>No orders yet.</p>
      ) : (
        <div>
          {recent.map(order => (
            <div
              key={order.id}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                padding: '12px 20px', borderTop: `1px solid ${colors.borderLight}`,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ color: colors.textPrimary, fontSize: '13px', fontWeight: 600 }}>{order.customer?.name || 'Unknown'}</div>
                <div style={{ color: colors.textMuted, fontSize: '11px' }}>{order.id} · {formatDate(order.date, SHORT_TIME_FORMATTER)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                <span style={{ color: colors.accent, fontWeight: 700, fontSize: '13px' }}>Rs {order.total}</span>
                <span style={badgeStyle(order.status)}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OverviewTab() {
  const { orders } = useOrders();
  const { menu } = useMenuStore();

  const stats = useMemo(() => {
    const pending = orders.filter(o => o.status === 'Pending').length;
    const revenue = orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + (o.total || 0), 0);
    const today = new Date().toDateString();
    const todayCount = orders.filter(o => safeDate(o.date)?.toDateString() === today).length;
    return { total: orders.length, pending, revenue, todayCount };
  }, [orders]);

  return (
    <div style={{ fontFamily: font }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <StatCard icon={ShoppingBag} label="Total Orders" value={stats.total} accent />
        <StatCard icon={Clock} label="Pending" value={stats.pending} />
        <StatCard icon={DollarSign} label="Total Revenue (Rs)" value={stats.revenue.toLocaleString()} />
        <StatCard icon={CheckCircle2} label="Today" value={stats.todayCount} />
        <StatCard icon={UtensilsCrossed} label="Menu Items" value={menu.length} />
      </div>

      <div className="overview-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)', gap: '16px' }}>
        <OrdersChart orders={orders} />
        <RecentOrders orders={orders} />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .overview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
