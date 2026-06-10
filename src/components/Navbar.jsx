import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 2.7 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled
          ? 'rgba(15,61,46,0.97)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.2)' : 'none',
        transition: 'all 0.4s ease',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', boxShadow: '0 0 0 2px rgba(212,175,55,0.3)',
          }}>🍽️</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37', fontSize: '18px', fontWeight: 700, lineHeight: 1 }}>
              USMANIA
            </div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '9px', letterSpacing: '3px', marginTop: '2px' }}>
              HOTEL
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              style={{
                color: active === link.label ? '#D4AF37' : 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '1px',
                padding: '8px 14px',
                borderRadius: '6px',
                position: 'relative',
                transition: 'all 0.2s',
                borderBottom: active === link.label ? '2px solid #D4AF37' : '2px solid transparent',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="tel:+924126418171"
          className="hidden-mobile"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
            color: '#0F3D2E',
            textDecoration: 'none',
            padding: '10px 22px',
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
            transition: 'all 0.3s',
          }}
        >
          📞 Call Now
        </a>

        {/* Hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'rgba(212,175,55,0.15)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            color: '#D4AF37',
            fontSize: '18px',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(15,61,46,0.98)',
              overflow: 'hidden',
              borderTop: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => { setActive(link.label); setMenuOpen(false); }}
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    display: 'block',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+924126418171"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
                  color: '#0F3D2E',
                  textDecoration: 'none',
                  padding: '12px 24px',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textAlign: 'center',
                  marginTop: '8px',
                  display: 'block',
                }}
              >
                📞 Call Now: +92 41 2641817
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
