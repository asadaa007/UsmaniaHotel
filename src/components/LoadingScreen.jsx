import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0F3D2E',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
          }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🍽️</div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#D4AF37',
                fontSize: 'clamp(28px, 5vw, 40px)',
                fontWeight: 700,
                letterSpacing: '2px',
              }}
            >
              USMANIA HOTEL
            </h1>
            <p style={{ color: 'rgba(212,175,55,0.7)', fontSize: '13px', letterSpacing: '4px', marginTop: '4px' }}>
              FAISALABAD
            </p>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
              borderRadius: '1px',
            }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '12px',
              letterSpacing: '3px',
            }}
          >
            PREPARING YOUR EXPERIENCE...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
