import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartButton() {
  const { count, setIsOpen } = useCart();
  const visible = count > 0;

  return (
    <motion.button
      animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onClick={() => setIsOpen(true)}
      aria-label={`View cart, ${count} item${count === 1 ? '' : 's'}`}
      aria-hidden={!visible}
      inert={!visible}
      style={{
        position: 'fixed',
        bottom: '170px',
        right: '24px',
        zIndex: 5000,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(212,175,55,0.5)',
        cursor: 'pointer',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      whileHover={visible ? { scale: 1.08 } : {}}
      whileTap={visible ? { scale: 0.93 } : {}}
    >
      <ShoppingCart size={24} color="#1E1E1E" />
      <span aria-hidden="true" style={{
        position: 'absolute',
        top: '-4px',
        right: '-4px',
        background: '#0F3D2E',
        color: '#D4AF37',
        border: '2px solid #fff',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        fontSize: '12px',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {count}
      </span>
    </motion.button>
  );
}
