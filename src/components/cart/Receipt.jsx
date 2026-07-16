import { forwardRef } from 'react';
import { useSiteContent } from '../../lib/siteContentStore';

const Receipt = forwardRef(function Receipt({ order, items, total }, ref) {
  const { content } = useSiteContent();
  return (
    <div
      ref={ref}
      style={{
        width: '420px',
        background: '#FFFFFF',
        fontFamily: "'Inter', system-ui, sans-serif",
        color: '#1E1E1E',
        padding: '32px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px dashed #D4AF37' }}>
        <div style={{ fontSize: '32px', marginBottom: '4px' }}>🍽️</div>
        <div style={{ fontFamily: "'Playfair Display', serif", color: '#0F3D2E', fontSize: '22px', fontWeight: 700 }}>{content.business.name}</div>
        <div style={{ color: '#888', fontSize: '11px', marginTop: '6px', lineHeight: 1.5 }}>{content.business.address}</div>
        <div style={{ color: '#888', fontSize: '11px', marginTop: '2px' }}>{content.business.phoneDisplay}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#555', marginBottom: '18px' }}>
        <span>Order #{order.id}</span>
        <span>{order.date.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      <div style={{ marginBottom: '18px' }}>
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <div style={{ flex: 1, paddingRight: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.name}</div>
              {item.name_ur && <div className="ur" style={{ fontSize: '13px', color: '#666' }}>{item.name_ur}</div>}
              <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Rs {item.price} × {item.qty}</div>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap' }}>Rs {item.price * item.qty}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '2px solid #0F3D2E', marginBottom: '18px' }}>
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F3D2E' }}>Total</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#0F3D2E' }}>Rs {total}</span>
      </div>

      <div style={{ background: '#F8F5EF', borderRadius: '10px', padding: '14px', marginBottom: '18px', fontSize: '12px', lineHeight: 1.8 }}>
        <div><strong>Name:</strong> {order.customer.name}</div>
        <div><strong>Phone:</strong> {order.customer.phone}</div>
        <div><strong>Address:</strong> {order.customer.address}</div>
        {order.customer.notes && <div><strong>Notes:</strong> {order.customer.notes}</div>}
      </div>

      <div style={{
        textAlign: 'center',
        background: '#0F3D2E',
        color: '#D4AF37',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.5px',
      }}>
        Payment: Cash on Delivery
      </div>
    </div>
  );
});

export default Receipt;
