import { useMemo, useState } from 'react';
import { ShoppingBag, Clock, DollarSign, CheckCircle2, UtensilsCrossed, Eye, EyeOff, TrendingUp, Trophy } from 'lucide-react';
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

function RevenueCard({ value, revealed, onToggle }) {
  return (
    <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px' }}>
      <div style={{
        width: '38px', height: '38px', borderRadius: '9px', flexShrink: 0,
        background: colors.accentMuted, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <DollarSign size={18} color={colors.accent} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ color: colors.textPrimary, fontSize: '20px', fontWeight: 700, lineHeight: 1.2, letterSpacing: revealed ? 0 : '2px' }}>
          {revealed ? `Rs ${value.toLocaleString()}` : '••••••'}
        </div>
        <div style={{ color: colors.textMuted, fontSize: '12px' }}>Total Revenue</div>
      </div>
      <button
        onClick={onToggle}
        aria-label={revealed ? 'Hide revenue' : 'Show revenue'}
        style={{
          background: colors.surfaceHover, border: `1px solid ${colors.border}`,
          borderRadius: '8px', width: '32px', height: '32px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
      >
        {revealed ? <EyeOff size={15} color={colors.textSecondary} /> : <Eye size={15} color={colors.textSecondary} />}
      </button>
    </div>
  );
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

function TopSellingItems({ items }) {
  const max = Math.max(1, ...items.map(i => i.qty));
  return (
    <div style={{ ...cardStyle, fontFamily: font }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Trophy size={16} color={colors.accent} />
        <span style={{ color: colors.textPrimary, fontSize: '14px', fontWeight: 700 }}>Top Selling Items</span>
      </div>
      {items.length === 0 ? (
        <p style={{ color: colors.textMuted, fontSize: '13px', margin: 0 }}>No sales yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {items.map((item, idx) => (
            <div key={item.name} style={{ display: 'grid', gridTemplateColumns: '20px 1fr auto', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: colors.textMuted, fontSize: '12px', fontWeight: 700 }}>{idx + 1}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '5px' }}>
                  <span style={{ color: colors.textPrimary, fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
                </div>
                <div style={{ height: '6px', borderRadius: '999px', background: colors.surfaceHover, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(item.qty / max) * 100}%`, borderRadius: '999px', background: `linear-gradient(90deg, ${colors.accentHover}, ${colors.accent})` }} />
                </div>
              </div>
              <span style={{ color: colors.textSecondary, fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>{item.qty} sold</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBreakdown({ counts, total, avgOrderValue, revealed }) {
  const rows = [
    { label: 'Pending', key: 'Pending' },
    { label: 'Confirmed', key: 'Confirmed' },
    { label: 'Out for Delivery', key: 'Out for Delivery' },
    { label: 'Delivered', key: 'Delivered' },
    { label: 'Cancelled', key: 'Cancelled' },
  ];
  return (
    <div style={{ ...cardStyle, fontFamily: font }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <TrendingUp size={16} color={colors.accent} />
        <span style={{ color: colors.textPrimary, fontSize: '14px', fontWeight: 700 }}>Order Insights</span>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 12px', borderRadius: '8px', background: colors.accentMuted, marginBottom: '14px',
      }}>
        <span style={{ color: colors.textSecondary, fontSize: '12px', fontWeight: 600 }}>Avg. order value</span>
        <span style={{ color: colors.accent, fontSize: '15px', fontWeight: 700, letterSpacing: revealed ? 0 : '1px' }}>
          {revealed ? `Rs ${Math.round(avgOrderValue).toLocaleString()}` : '••••'}
        </span>
      </div>

      <div style={{ display: 'grid', gap: '9px' }}>
        {rows.map(r => (
          <div key={r.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={badgeStyle(r.key)}>{r.label}</span>
            <span style={{ color: colors.textSecondary, fontSize: '13px', fontWeight: 600 }}>
              {counts[r.key] || 0}
              <span style={{ color: colors.textMuted, fontWeight: 400 }}> {total > 0 ? `(${Math.round(((counts[r.key] || 0) / total) * 100)}%)` : ''}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OverviewTab() {
  const { orders } = useOrders();
  const { menu } = useMenuStore();
  const [revealRevenue, setRevealRevenue] = useState(false);

  const stats = useMemo(() => {
    const nonCancelled = orders.filter(o => o.status !== 'Cancelled');
    const pending = orders.filter(o => o.status === 'Pending').length;
    const revenue = nonCancelled.reduce((sum, o) => sum + (o.total || 0), 0);
    const today = new Date().toDateString();
    const todayCount = orders.filter(o => safeDate(o.date)?.toDateString() === today).length;
    const avgOrderValue = nonCancelled.length ? revenue / nonCancelled.length : 0;
    return { total: orders.length, pending, revenue, todayCount, avgOrderValue };
  }, [orders]);

  const statusCounts = useMemo(() => {
    return orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {});
  }, [orders]);

  const topItems = useMemo(() => {
    const map = new Map();
    orders.forEach(o => {
      if (o.status === 'Cancelled') return;
      (o.items || []).forEach(item => {
        const prev = map.get(item.name) || 0;
        map.set(item.name, prev + (item.qty || 0));
      });
    });
    return Array.from(map.entries())
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);
  }, [orders]);

  return (
    <div style={{ fontFamily: font }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <StatCard icon={ShoppingBag} label="Total Orders" value={stats.total} accent />
        <StatCard icon={Clock} label="Pending" value={stats.pending} />
        <RevenueCard value={stats.revenue} revealed={revealRevenue} onToggle={() => setRevealRevenue(v => !v)} />
        <StatCard icon={CheckCircle2} label="Today" value={stats.todayCount} />
        <StatCard icon={UtensilsCrossed} label="Menu Items" value={menu.length} />
      </div>

      <div className="overview-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)', gap: '16px', marginBottom: '16px' }}>
        <OrdersChart orders={orders} />
        <RecentOrders orders={orders} />
      </div>

      <div className="overview-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '16px' }}>
        <TopSellingItems items={topItems} />
        <StatusBreakdown counts={statusCounts} total={stats.total} avgOrderValue={stats.avgOrderValue} revealed={revealRevenue} />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .overview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
