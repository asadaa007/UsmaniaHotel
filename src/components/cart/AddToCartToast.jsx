import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function AddToCartToast() {
  const { toast, dismissToast, setIsOpen } = useCart();
  const visible = !!toast;

  const handleCheckout = () => {
    dismissToast();
    setIsOpen(true);
  };

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      inert={!visible}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -16 }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      style={{
        position: 'fixed',
        top: '90px',
        left: 0,
        right: 0,
        margin: '0 auto',
        zIndex: 5500,
        width: 'min(360px, calc(100vw - 32px))',
        background: '#1E1E1E',
        border: '1px solid rgba(212,175,55,0.3)',
        borderRadius: '16px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        padding: '16px 18px',
        pointerEvents: visible ? 'auto' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <CheckCircle2 size={20} color="#D4AF37" style={{ flexShrink: 0, marginTop: '1px' }} />
        <p style={{ color: '#FFFFFF', fontSize: '14px', lineHeight: 1.4, margin: 0 }}>
          <strong>{toast?.name}</strong> added to your cart
        </p>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="button"
          onClick={dismissToast}
          tabIndex={visible ? 0 : -1}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.85)',
            borderRadius: '50px',
            padding: '10px 0',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Continue Shopping
        </button>
        <button
          type="button"
          onClick={handleCheckout}
          tabIndex={visible ? 0 : -1}
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
            border: 'none',
            color: '#1E1E1E',
            borderRadius: '50px',
            padding: '10px 0',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Checkout
        </button>
      </div>
    </motion.div>
  );
}
