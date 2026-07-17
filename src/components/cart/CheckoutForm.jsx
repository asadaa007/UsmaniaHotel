import { useMemo, useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';

// Optional sides offered at checkout. IDs are strings so they never collide with
// numeric menu-item IDs, and each carries the same shape as a cart line item.
const ADDONS = [
  { id: 'addon-roti', name: 'Bread / Roti', name_ur: 'چپاتی', price: 20 },
  { id: 'addon-raita', name: 'Raita', name_ur: 'رائیتہ', price: 60 },
  { id: 'addon-salad', name: 'Salad', name_ur: 'سلاد', price: 80 },
];

const fieldStyle = {
  width: '100%',
  boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '12px',
  padding: '12px 14px',
  color: '#FFFFFF',
  fontSize: '14px',
};

const labelStyle = {
  display: 'block',
  color: 'rgba(255,255,255,0.6)',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.5px',
  marginBottom: '8px',
};

export default function CheckoutForm({ onBack, onSubmit, submitting, error }) {
  const { total } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });
  const [addonQty, setAddonQty] = useState({});
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const setQty = (id, qty) => setAddonQty(prev => ({ ...prev, [id]: Math.max(0, qty) }));

  const addonItems = useMemo(
    () => ADDONS.filter(a => (addonQty[a.id] || 0) > 0).map(a => ({ ...a, qty: addonQty[a.id] })),
    [addonQty]
  );
  const addonsTotal = useMemo(
    () => addonItems.reduce((sum, a) => sum + a.price * a.qty, 0),
    [addonItems]
  );
  const grandTotal = total + addonsTotal;

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    if (!form.address.trim()) next.address = 'Delivery address is required';
    setErrors(next);
    if (next.name) nameRef.current?.focus();
    else if (next.phone) phoneRef.current?.focus();
    else if (next.address) addressRef.current?.focus();
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && !submitting) onSubmit(form, addonItems);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} noValidate>
      <div>
        <label htmlFor="checkout-name" style={labelStyle}>Full Name *</label>
        <input
          id="checkout-name"
          ref={nameRef}
          className="form-input"
          style={fieldStyle}
          value={form.name}
          onChange={update('name')}
          placeholder="Your name"
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'checkout-name-error' : undefined}
        />
        {errors.name && <p id="checkout-name-error" role="alert" style={errorStyle}>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="checkout-phone" style={labelStyle}>Phone Number *</label>
        <input
          id="checkout-phone"
          ref={phoneRef}
          className="form-input"
          style={fieldStyle}
          value={form.phone}
          onChange={update('phone')}
          placeholder="03XX-XXXXXXX"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          aria-required="true"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'checkout-phone-error' : undefined}
        />
        {errors.phone && <p id="checkout-phone-error" role="alert" style={errorStyle}>{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="checkout-address" style={labelStyle}>Delivery Address *</label>
        <textarea
          id="checkout-address"
          ref={addressRef}
          className="form-input"
          style={{ ...fieldStyle, resize: 'vertical', minHeight: '70px' }}
          value={form.address}
          onChange={update('address')}
          placeholder="House #, street, area, landmark"
          autoComplete="street-address"
          aria-required="true"
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? 'checkout-address-error' : undefined}
        />
        {errors.address && <p id="checkout-address-error" role="alert" style={errorStyle}>{errors.address}</p>}
      </div>
      <div>
        <label htmlFor="checkout-notes" style={labelStyle}>Notes (optional)</label>
        <textarea
          id="checkout-notes"
          className="form-input"
          style={{ ...fieldStyle, resize: 'vertical', minHeight: '50px' }}
          value={form.notes}
          onChange={update('notes')}
          placeholder="Less spicy, no onions, etc."
        />
      </div>

      {/* Optional add-on sides */}
      <div>
        <label style={labelStyle}>Add sides (optional)</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {ADDONS.map(addon => {
            const qty = addonQty[addon.id] || 0;
            return (
              <div
                key={addon.id}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${qty > 0 ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: '12px', padding: '10px 12px',
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
                    {addon.name} <span className="ur" style={{ color: 'rgba(212,175,55,0.8)', fontSize: '13px' }}>{addon.name_ur}</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Rs {addon.price} each</div>
                </div>
                {qty === 0 ? (
                  <button
                    type="button"
                    onClick={() => setQty(addon.id, 1)}
                    aria-label={`Add ${addon.name}`}
                    style={{
                      flexShrink: 0,
                      background: 'rgba(212,175,55,0.15)',
                      border: '1px solid rgba(212,175,55,0.4)',
                      color: '#D4AF37', borderRadius: '50px',
                      padding: '7px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    + Add
                  </button>
                ) : (
                  <div style={{
                    flexShrink: 0,
                    display: 'flex', alignItems: 'center', gap: '4px',
                    background: 'rgba(212,175,55,0.12)',
                    border: '1px solid rgba(212,175,55,0.4)',
                    borderRadius: '50px', padding: '2px',
                  }}>
                    <button
                      type="button"
                      onClick={() => setQty(addon.id, qty - 1)}
                      aria-label={`Decrease ${addon.name}`}
                      style={qtyButtonStyle}
                    >−</button>
                    <span aria-live="polite" style={{ color: '#D4AF37', fontSize: '14px', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(addon.id, qty + 1)}
                      aria-label={`Increase ${addon.name}`}
                      style={qtyButtonStyle}
                    >+</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        background: 'rgba(212,175,55,0.08)',
        border: '1px solid rgba(212,175,55,0.25)',
        borderRadius: '12px',
        padding: '14px',
        display: 'flex', flexDirection: 'column', gap: '8px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}>
          <span>Items</span>
          <span>Rs {total}</span>
        </div>
        {addonsTotal > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}>
            <span>Sides</span>
            <span>Rs {addonsTotal}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '8px' }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>Total (Cash on Delivery)</span>
          <span style={{ color: '#D4AF37', fontSize: '18px', fontWeight: 700 }}>Rs {grandTotal}</span>
        </div>
      </div>

      {error && (
        <p role="alert" style={{
          background: 'rgba(229,115,115,0.12)',
          border: '1px solid rgba(229,115,115,0.4)',
          borderRadius: '10px',
          padding: '10px 14px',
          color: '#E57373',
          fontSize: '13px',
          margin: 0,
        }}>
          {error}
        </p>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          style={{
            flex: '0 0 auto',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.7)',
            borderRadius: '50px', padding: '14px 20px',
            fontSize: '13px', fontWeight: 600,
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.6 : 1,
          }}
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={submitting}
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
            color: '#1E1E1E', border: 'none',
            borderRadius: '50px', padding: '14px 0',
            fontSize: '14px', fontWeight: 700,
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? 'Placing Order…' : error ? 'Retry Order' : 'Place Order'}
        </button>
      </div>
    </form>
  );
}

const errorStyle = { color: '#E57373', fontSize: '12px', marginTop: '6px' };

const qtyButtonStyle = {
  background: 'none', border: 'none', color: '#D4AF37',
  fontSize: '16px', fontWeight: 700, cursor: 'pointer',
  width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
};
