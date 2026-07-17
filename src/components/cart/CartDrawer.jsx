import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { saveOrder } from '../../lib/orderStore';
import CartItems from './CartItems';
import CheckoutForm from './CheckoutForm';
import OrderConfirmation from './OrderConfirmation';

export default function CartDrawer() {
  const { isOpen, setIsOpen, clearCart, items, total } = useCart();
  const [step, setStep] = useState('cart');
  const [order, setOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep('cart');
      if (order) {
        clearCart();
        setOrder(null);
      }
    }, 300);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOrderSubmit = async (customer, addonItems = []) => {
    const allItems = [...items, ...addonItems];
    const addonsTotal = addonItems.reduce((sum, a) => sum + a.price * a.qty, 0);
    const newOrder = {
      customer,
      items: allItems,
      total: total + addonsTotal,
      id: `USM-${Date.now().toString().slice(-6)}`,
      date: new Date(),
    };
    setSubmitting(true);
    setSubmitError(null);
    try {
      await saveOrder(newOrder);
      setOrder(newOrder);
      setStep('confirmation');
    } catch (err) {
      setSubmitError(err.message || 'Could not place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      aria-hidden={!isOpen}
      inert={!isOpen}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 6000,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        onClick={e => e.stopPropagation()}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 6001,
          width: 'min(440px, 100vw)',
          background: '#1E1E1E',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(212,175,55,0.2)',
        }}>
          <h3 id="cart-drawer-title" style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37', fontSize: '20px', fontWeight: 700 }}>
            {step === 'cart' && 'Your Cart'}
            {step === 'checkout' && 'Delivery Details'}
            {step === 'confirmation' && 'Order Placed'}
          </h3>
          <button
            onClick={close}
            tabIndex={isOpen ? 0 : -1}
            aria-label="Close cart"
            style={{
              background: 'rgba(212,175,55,0.15)', border: 'none',
              color: '#D4AF37', borderRadius: '50%',
              width: '44px', height: '44px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          ><X size={18} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {step === 'cart' && <CartItems onCheckout={() => setStep('checkout')} />}
          {step === 'checkout' && (
            <CheckoutForm
              onBack={() => setStep('cart')}
              onSubmit={handleOrderSubmit}
              submitting={submitting}
              error={submitError}
            />
          )}
          {step === 'confirmation' && order && <OrderConfirmation order={order} onClose={close} />}
        </div>
      </motion.div>
    </motion.div>
  );
}
