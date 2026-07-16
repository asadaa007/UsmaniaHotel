import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, X, ShoppingCart } from 'lucide-react';
import { phoneToTel } from '../config';
import { useSiteContent } from '../lib/siteContentStore';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const { content } = useSiteContent();
  const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const nameParts = content.business.name.split(' ');
  const nameLine1 = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0];
  const nameLine2 = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

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
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', boxShadow: '0 0 0 2px rgba(212,175,55,0.3)',
          }}>🍽️</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37', fontSize: '18px', fontWeight: 700, lineHeight: 1, textTransform: 'uppercase' }}>
              {nameLine1}
            </div>
            {nameLine2 && (
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '9px', letterSpacing: '3px', marginTop: '2px', textTransform: 'uppercase' }}>
                {nameLine2}
              </div>
            )}
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map(link => {
            const linkStyle = {
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
            };
            return link.href.includes('#') ? (
              <a key={link.label} href={link.href} onClick={() => setActive(link.label)} style={linkStyle}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href} onClick={() => setActive(link.label)} style={linkStyle}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* CTA */}
          <a
            href={phoneToTel(content.business.phoneDisplay)}
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

          {/* Cart */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label={`View cart, ${count} item${count === 1 ? '' : 's'}`}
            style={{
              position: 'relative',
              background: 'rgba(212,175,55,0.15)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '8px',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#D4AF37',
            }}
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span aria-hidden="true" style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#0F3D2E',
                color: '#D4AF37',
                border: '2px solid #0F3D2E',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {count}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            style={{
              background: 'rgba(212,175,55,0.15)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '8px',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#D4AF37',
            }}
          >
            {menuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        id="mobile-nav-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        animate={{ opacity: menuOpen ? 1 : 0, height: menuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'rgba(15,61,46,0.98)',
          overflow: 'hidden',
          borderTop: menuOpen ? '1px solid rgba(212,175,55,0.2)' : 'none',
        }}
      >
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navLinks.map(link => {
                const mobileLinkStyle = {
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.04)',
                  display: 'block',
                };
                const onLinkClick = () => { setActive(link.label); setMenuOpen(false); };
                return link.href.includes('#') ? (
                  <a key={link.label} href={link.href} onClick={onLinkClick} style={mobileLinkStyle}>
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} to={link.href} onClick={onLinkClick} style={mobileLinkStyle}>
                    {link.label}
                  </Link>
                );
              })}
              <a
                href={phoneToTel(content.business.phoneDisplay)}
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
                📞 Call Now: {content.business.phoneDisplay}
              </a>
            </div>
      </motion.div>

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
