import { useMemo, useState } from 'react';
import { Trash2, ChevronDown, ShoppingBag, Clock, CheckCircle2, DollarSign, AlertCircle } from 'lucide-react';
import { useOrders, updateOrderStatus, deleteOrder, ORDER_STATUSES } from '../../lib/orderStore';
import { colors, font, cardStyle, fieldStyle, badgeStyle, dangerButtonStyle } from './adminTheme';

const MONTH_FORMATTER = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });

function monthKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px' }}>
      <div style={{
        width: '38px', height: '38px', borderRadius: '9px', flexShrink: 0,
        background: accent ? colors.accentMuted : colors.surfaceHover,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} color={accent ? colors.accent : colors.textSecondary} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ color: colors.textPrimary, fontSize: '20px', fontWeight: 700, lineHeight: 1.2 }}>{value}</div>
        <div style={{ color: colors.textMuted, fontSize: '12px' }}>{label}</div>
      </div>
    </div>
  );
}

function OrderRow({ order, expanded, onToggle, onStatusChange, onDelete, busy }) {
  const orderDate = new Date(order.date);
  return (
    <>
      <tr
        onClick={onToggle}
        tabIndex={0}
        role="button"
        aria-expanded={expanded}
        aria-label={`Order ${order.id}, ${expanded ? 'collapse' : 'expand'} details`}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
        style={{ cursor: 'pointer', borderBottom: expanded ? 'none' : `1px solid ${colors.borderLight}` }}
      >
        <td style={tdStyle}>
          <span style={{ color: colors.textPrimary, fontWeight: 600, fontSize: '13px' }}>{order.id}</span>
        </td>
        <td style={tdStyle}>
          <div style={{ color: colors.textPrimary, fontSize: '13px' }}>{order.customer.name}</div>
          <div style={{ color: colors.textMuted, fontSize: '11px' }}>{order.customer.phone}</div>
        </td>
        <td style={tdStyle}>
          <span style={{ color: colors.textSecondary, fontSize: '13px' }}>{order.items.length} item{order.items.length === 1 ? '' : 's'}</span>
        </td>
        <td style={tdStyle}>
          <span style={{ color: colors.accent, fontWeight: 700, fontSize: '13px' }}>Rs {order.total}</span>
        </td>
        <td style={tdStyle}>
          <span style={badgeStyle(order.status)}>{order.status}</span>
        </td>
        <td style={tdStyle}>
          <span style={{ color: colors.textMuted, fontSize: '12px' }}>
            {orderDate.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
          </span>
        </td>
        <td style={{ ...tdStyle, width: '32px' }}>
          <ChevronDown size={16} color={colors.textMuted} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
        </td>
      </tr>
      {expanded && (
        <tr style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
          <td colSpan={7} style={{ padding: '0 16px 20px', background: colors.surfaceAlt }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', paddingTop: '16px' }}>
              <div>
                <div style={{ color: colors.textMuted, fontSize: '11px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.3px' }}>ITEMS</div>
                {order.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: colors.textSecondary, padding: '3px 0' }}>
                    <span>{item.name} × {item.qty}</span>
                    <span>Rs {item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: colors.textMuted, fontSize: '11px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.3px' }}>DELIVERY</div>
                <div style={{ fontSize: '13px', color: colors.textSecondary, lineHeight: 1.7 }}>
                  <div>{order.customer.address}</div>
                  {order.customer.notes && <div style={{ marginTop: '4px', fontStyle: 'italic' }}>"{order.customer.notes}"</div>}
                </div>
              </div>
              <div>
                <div style={{ color: colors.textMuted, fontSize: '11px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.3px' }}>ACTIONS</div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <select
                    value={order.status}
                    disabled={busy}
                    onChange={e => onStatusChange(order.id, e.target.value)}
                    style={{ ...fieldStyle, width: 'auto', padding: '6px 10px', fontSize: '12px', opacity: busy ? 0.6 : 1 }}
                  >
                    {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button
                    onClick={() => { if (confirm(`Delete order ${order.id}?`)) onDelete(order.id); }}
                    aria-label={`Delete order ${order.id}`}
                    disabled={busy}
                    style={{ ...dangerButtonStyle, opacity: busy ? 0.6 : 1 }}
                  ><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

const tdStyle = { padding: '14px 16px', textAlign: 'left', verticalAlign: 'middle' };
const thStyle = { padding: '10px 16px', textAlign: 'left', color: colors.textMuted, fontSize: '11px', fontWeight: 600, letterSpacing: '0.3px', borderBottom: `1px solid ${colors.border}` };

export default function OrdersTab() {
  const { orders, loading, error, refresh } = useOrders();
  const [expandedId, setExpandedId] = useState(null);
  const [monthFilter, setMonthFilter] = useState('all');
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState(null);

  const months = useMemo(() => {
    const map = new Map();
    orders.forEach(o => {
      const key = monthKey(o.date);
      if (!map.has(key)) map.set(key, MONTH_FORMATTER.format(new Date(o.date)));
    });
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (monthFilter === 'all') return orders;
    return orders.filter(o => monthKey(o.date) === monthFilter);
  }, [orders, monthFilter]);

  const stats = useMemo(() => {
    const pending = filteredOrders.filter(o => o.status === 'Pending').length;
    const revenue = filteredOrders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0);
    const today = new Date().toDateString();
    const todayCount = filteredOrders.filter(o => new Date(o.date).toDateString() === today).length;
    return { total: filteredOrders.length, pending, revenue, todayCount };
  }, [filteredOrders]);

  const handleStatusChange = async (id, status) => {
    setBusyId(id);
    setActionError(null);
    try {
      await updateOrderStatus(id, status);
      await refresh();
    } catch (err) {
      setActionError(err.message || 'Could not update order status.');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    setBusyId(id);
    setActionError(null);
    try {
      await deleteOrder(id);
      await refresh();
    } catch (err) {
      setActionError(err.message || 'Could not delete order.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div style={{ fontFamily: font }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: colors.textMuted, fontSize: '12px', fontWeight: 600 }}>Filter by month</span>
          <select
            value={monthFilter}
            onChange={e => setMonthFilter(e.target.value)}
            style={{ ...fieldStyle, width: 'auto', padding: '8px 12px', fontSize: '13px' }}
          >
            <option value="all">All time</option>
            {months.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
        </label>
      </div>

      {(error || actionError) && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'rgba(229,115,115,0.1)', border: '1px solid rgba(229,115,115,0.35)',
          borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
        }}>
          <AlertCircle size={16} color="#E57373" />
          <span style={{ color: '#E57373', fontSize: '13px' }}>{error || actionError}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard icon={ShoppingBag} label="Total Orders" value={stats.total} accent />
        <StatCard icon={Clock} label="Pending" value={stats.pending} />
        <StatCard icon={DollarSign} label="Revenue (Rs)" value={stats.revenue.toLocaleString()} />
        <StatCard icon={CheckCircle2} label="Today" value={stats.todayCount} />
      </div>

      {loading ? (
        <div style={{ ...cardStyle, textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ color: colors.textMuted, fontSize: '13px' }}>Loading orders…</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div style={{ ...cardStyle, textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ color: colors.textMuted, fontSize: '13px' }}>
            {orders.length === 0
              ? 'No orders yet. Orders placed via the website checkout will appear here.'
              : 'No orders in this month.'}
          </p>
        </div>
      ) : (
        <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Order</th>
                  <th style={thStyle}>Customer</th>
                  <th style={thStyle}>Items</th>
                  <th style={thStyle}>Total</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    expanded={expandedId === order.id}
                    onToggle={() => setExpandedId(id => id === order.id ? null : order.id)}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                    busy={busyId === order.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
