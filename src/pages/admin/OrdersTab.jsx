import { useMemo, useState } from 'react';
import { Trash2, ChevronDown, ShoppingBag, Clock, CheckCircle2, DollarSign, AlertCircle, Phone, MapPin, StickyNote, Search } from 'lucide-react';
import { useOrders, updateOrderStatus, deleteOrder, ORDER_STATUSES } from '../../lib/orderStore';
import { phoneToTel } from '../../config';
import { colors, font, cardStyle, fieldStyle, badgeStyle, dangerButtonStyle } from './adminTheme';
import { MONTH_FORMATTER, TIME_FORMATTER, SHORT_TIME_FORMATTER, safeDate, formatDate, monthKey } from './orderUtils';
import StatCard from './StatCard';

function OrderRow({ order, expanded, onToggle, onStatusChange, onDelete, busy }) {
  const initials = (order.customer?.name || '?').trim().slice(0, 1).toUpperCase();

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
          <span style={{ color: colors.textPrimary, fontWeight: 700, fontSize: '13px' }}>{order.id}</span>
        </td>
        <td style={tdStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
              background: colors.accentMuted, color: colors.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 700,
            }}>{initials}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: colors.textPrimary, fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.customer?.name}</div>
              <div style={{ color: colors.textMuted, fontSize: '11px' }}>{order.customer?.phone}</div>
            </div>
          </div>
        </td>
        <td style={tdStyle}>
          <span style={{ color: colors.textSecondary, fontSize: '13px' }}>{order.items?.length || 0} item{(order.items?.length || 0) === 1 ? '' : 's'}</span>
        </td>
        <td style={tdStyle}>
          <span style={{ color: colors.accent, fontWeight: 700, fontSize: '13px' }}>Rs {order.total}</span>
        </td>
        <td style={tdStyle}>
          <span style={badgeStyle(order.status)}>{order.status}</span>
        </td>
        <td style={tdStyle}>
          <span style={{ color: colors.textSecondary, fontSize: '12px' }}>
            {formatDate(order.date, SHORT_TIME_FORMATTER)}
          </span>
        </td>
        <td style={{ ...tdStyle, width: '32px' }}>
          <ChevronDown size={16} color={colors.textMuted} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
        </td>
      </tr>
      {expanded && (
        <tr style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
          <td colSpan={7} style={{ padding: '0 16px 20px', background: colors.surfaceAlt }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px',
              marginTop: '16px',
            }}>
              {/* Receipt-style items + total */}
              <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '10px', padding: '16px', overflow: 'hidden' }}>
                <div style={{ color: colors.textMuted, fontSize: '11px', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.4px' }}>ORDER ITEMS</div>
                {(order.items || []).map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '7px 0', borderBottom: `1px dashed ${colors.borderLight}` }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '13px', color: colors.textPrimary, fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: '11px', color: colors.textMuted }}>Rs {item.price} × {item.qty}</div>
                    </div>
                    <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 700, whiteSpace: 'nowrap' }}>Rs {item.price * item.qty}</div>
                  </div>
                ))}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginTop: '12px', padding: '10px 12px', borderRadius: '8px',
                  background: colors.accentMuted,
                }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: colors.accent, letterSpacing: '0.3px' }}>TOTAL</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: colors.accent }}>Rs {order.total}</span>
                </div>
              </div>

              {/* Customer + delivery */}
              <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '10px', padding: '16px' }}>
                <div style={{ color: colors.textMuted, fontSize: '11px', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.4px' }}>CUSTOMER & DELIVERY</div>
                <div style={{ display: 'grid', gap: '10px', fontSize: '13px', color: colors.textSecondary }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Phone size={14} color={colors.textMuted} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <a href={phoneToTel(order.customer?.phone || '')} style={{ color: colors.textSecondary, textDecoration: 'none' }}>{order.customer?.phone}</a>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <MapPin size={14} color={colors.textMuted} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{order.customer?.address}</span>
                  </div>
                  {order.customer?.notes && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <StickyNote size={14} color={colors.textMuted} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontStyle: 'italic' }}>"{order.customer.notes}"</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Clock size={14} color={colors.textMuted} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Placed {formatDate(order.date, TIME_FORMATTER)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '10px', padding: '16px' }}>
                <div style={{ color: colors.textMuted, fontSize: '11px', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.4px' }}>ACTIONS</div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '11px', marginBottom: '6px' }}>Status</label>
                <select
                  value={order.status}
                  disabled={busy}
                  onChange={e => onStatusChange(order.id, e.target.value)}
                  style={{ ...fieldStyle, marginBottom: '12px', opacity: busy ? 0.6 : 1 }}
                >
                  {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button
                  onClick={() => { if (confirm(`Delete order ${order.id}?`)) onDelete(order.id); }}
                  disabled={busy}
                  style={{
                    ...dangerButtonStyle,
                    width: '100%', height: 'auto', padding: '9px 0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    fontSize: '12px', fontWeight: 600, fontFamily: font,
                    opacity: busy ? 0.6 : 1,
                  }}
                ><Trash2 size={14} /> Delete Order</button>
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
  const [search, setSearch] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState(null);

  const months = useMemo(() => {
    const map = new Map();
    orders.forEach(o => {
      const key = monthKey(o.date);
      const d = safeDate(o.date);
      if (!map.has(key)) map.set(key, d ? MONTH_FORMATTER.format(d) : 'Unknown date');
    });
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter(o => {
      if (monthFilter !== 'all' && monthKey(o.date) !== monthFilter) return false;
      if (!q) return true;
      return (
        o.id?.toLowerCase().includes(q) ||
        o.customer?.name?.toLowerCase().includes(q) ||
        o.customer?.phone?.toLowerCase().includes(q) ||
        o.customer?.address?.toLowerCase().includes(q)
      );
    });
  }, [orders, monthFilter, search]);

  const stats = useMemo(() => {
    const pending = filteredOrders.filter(o => o.status === 'Pending').length;
    const revenue = filteredOrders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + (o.total || 0), 0);
    const today = new Date().toDateString();
    const todayCount = filteredOrders.filter(o => safeDate(o.date)?.toDateString() === today).length;
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
        <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: '380px' }}>
          <Search size={15} color={colors.textMuted} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by order #, name, phone, or address…"
            aria-label="Search orders"
            style={{ ...fieldStyle, paddingLeft: '34px' }}
          />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <span style={{ color: colors.textMuted, fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Filter by month</span>
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
              : search.trim()
              ? `No orders match your search${monthFilter !== 'all' ? ' in this month' : ''}.`
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
                  <th style={thStyle}>Placed</th>
                  <th style={{ ...thStyle, width: '32px' }}></th>
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
