import { Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { phoneToTel } from '../../config';
import { useSiteContent } from '../../lib/siteContentStore';

export default function CartItems({ onCheckout }) {
  const { items, updateQty, removeItem, total } = useCart();
  const { content } = useSiteContent();

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.5)' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🛒</div>
        <p style={{ fontSize: '14px' }}>Your cart is empty. Add some dishes from the menu!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        {items.map(item => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            padding: '14px',
          }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>{item.name}</div>
              {item.name_ur && <div className="ur" style={{ color: 'rgba(212,175,55,0.8)', fontSize: '14px', marginTop: '2px' }}>{item.name_ur}</div>}
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>Rs {item.price} × {item.qty}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label={`Decrease quantity of ${item.name}`} style={qtyBtnStyle}>−</button>
              <span aria-live="polite" style={{ color: '#D4AF37', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label={`Increase quantity of ${item.name}`} style={qtyBtnStyle}>+</button>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name} from cart`}
              title="Remove"
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', flexShrink: 0, width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            ><Trash2 size={16} /></button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 0', borderTop: '1px solid rgba(212,175,55,0.2)',
          marginBottom: '16px',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>Total</span>
          <span style={{ color: '#D4AF37', fontSize: '22px', fontWeight: 700 }}>Rs {total}</span>
        </div>

        <button
          onClick={onCheckout}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
            color: '#1E1E1E', border: 'none',
            borderRadius: '50px', padding: '16px 0',
            fontSize: '15px', fontWeight: 700, cursor: 'pointer',
            marginBottom: '12px',
          }}
        >
          Proceed to Checkout
        </button>

        <a
          href={phoneToTel(content.business.phoneDisplay)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            width: '100%', boxSizing: 'border-box',
            background: 'transparent',
            border: '2px solid rgba(212,175,55,0.4)',
            color: '#D4AF37', textDecoration: 'none',
            borderRadius: '50px', padding: '14px 0',
            fontSize: '13px', fontWeight: 700,
          }}
        >
          📞 Or Order by Call: {content.business.phoneDisplay}
        </a>
      </div>
    </div>
  );
}

const qtyBtnStyle = {
  background: 'rgba(212,175,55,0.15)',
  border: 'none',
  color: '#D4AF37',
  width: '32px', height: '32px',
  borderRadius: '50%',
  fontSize: '14px', fontWeight: 700,
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
