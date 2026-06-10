import { motion } from 'framer-motion';

export default function FloatingButtons() {
  return (
    <>
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/924126418171?text=Hi!%20I'd%20like%20to%20order%20from%20Usmania%20Hotel"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3.5, type: 'spring', stiffness: 200 }}
        title="Chat on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          zIndex: 5000,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '26px',
          boxShadow: '0 6px 20px rgba(37,211,102,0.4)',
          textDecoration: 'none',
          cursor: 'pointer',
          animation: 'pulseWA 2s infinite',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
      >
        💬
      </motion.a>

      {/* Mobile sticky call bar */}
      <div
        className="mobile-call-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4999,
          display: 'none',
          padding: '0',
        }}
      >
        <a
          href="tel:+924126418171"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
            color: '#0F3D2E',
            textDecoration: 'none',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: 700,
          }}
        >
          📞 Call Now: +92 41 2641817
        </a>
      </div>

      <style>{`
        @keyframes pulseWA {
          0%, 100% { box-shadow: 0 6px 20px rgba(37,211,102,0.4); }
          50% { box-shadow: 0 6px 30px rgba(37,211,102,0.7); }
        }
        @media (max-width: 768px) {
          .mobile-call-bar { display: block !important; }
        }
      `}</style>
    </>
  );
}
