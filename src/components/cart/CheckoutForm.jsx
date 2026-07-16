import { useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';

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
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

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
    if (validate() && !submitting) onSubmit(form);
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

      <div style={{
        background: 'rgba(212,175,55,0.08)',
        border: '1px solid rgba(212,175,55,0.25)',
        borderRadius: '12px',
        padding: '14px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>Total (Cash on Delivery)</span>
        <span style={{ color: '#D4AF37', fontSize: '18px', fontWeight: 700 }}>Rs {total}</span>
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
