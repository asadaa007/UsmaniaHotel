import { motion } from 'framer-motion';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: '📘', label: 'Facebook', href: '#' },
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '🐦', label: 'Twitter', href: '#' },
  { icon: '📹', label: 'YouTube', href: '#' },
];

export default function Footer() {
  return (
    <footer style={{
      background: '#111111',
      padding: '80px 24px 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top gold line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #E8CC6A 50%, #D4AF37 70%, transparent)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '50px',
          marginBottom: '60px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px',
                boxShadow: '0 0 0 3px rgba(212,175,55,0.2)',
              }}>🍽️</div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37', fontSize: '20px', fontWeight: 700, lineHeight: 1 }}>
                  USMANIA
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', letterSpacing: '4px', marginTop: '2px' }}>
                  HOTEL
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.75, marginBottom: '24px', maxWidth: '260px' }}>
              Serving Faisalabad's most authentic traditional Pakistani cuisine for generations. A landmark of taste and heritage.
            </p>
            {/* Rating */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.25)',
              borderRadius: '10px', padding: '8px 14px',
            }}>
              <span style={{ color: '#D4AF37' }}>★★★★</span>
              <span style={{ color: '#D4AF37', fontWeight: 700 }}>4.0</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>619+ Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '3px', fontWeight: 600, marginBottom: '24px' }}>
              QUICK LINKS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    <span style={{ color: '#D4AF37', fontSize: '10px' }}>→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '3px', fontWeight: 600, marginBottom: '24px' }}>
              CONTACT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '16px', flexShrink: 0 }}>📍</span>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.7 }}>
                  Aminpur Bazar, Opposite Car Parking Goal,<br />
                  Katchery Bazar Clock Tower,<br />
                  Faisalabad, Pakistan
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '16px', flexShrink: 0 }}>📞</span>
                <a href="tel:+924126418171" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  +92 41 2641817
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '3px', fontWeight: 600, marginBottom: '24px' }}>
              OPENING HOURS
            </h4>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: '14px',
              padding: '20px',
              marginBottom: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Daily</span>
                <span style={{ color: '#D4AF37', fontWeight: 600, fontSize: '14px' }}>9:00 AM – 11:30 PM</span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(76,175,80,0.1)',
                border: '1px solid rgba(76,175,80,0.25)',
                borderRadius: '8px', padding: '6px 12px',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
                <span style={{ color: '#4CAF50', fontSize: '12px', fontWeight: 600 }}>Open 365 Days a Year</span>
              </div>
            </div>

            {/* Social */}
            <h4 style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '3px', fontWeight: 600, marginBottom: '14px' }}>
              FOLLOW US
            </h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.15)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            © {new Date().getFullYear()} Usmania Hotel · Faisalabad. All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px' }}>Rs 1 – 1,000 per person</span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px' }}>Dine-In · Drive-Through · Takeaway · Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
