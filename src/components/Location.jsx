import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const hours = [
  { day: 'Monday – Sunday', time: '9:00 AM – 11:30 PM', open: true },
];

export default function Location() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: '#1E1E1E',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', fontWeight: 600, marginBottom: '14px' }}>
            FIND US
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: '#FFFFFF',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.2,
          }}>
            Visit Us in{' '}
            <span style={{ color: '#D4AF37' }}>Faisalabad</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Address */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '20px',
              padding: '28px',
            }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', flexShrink: 0,
                }}>📍</div>
                <div>
                  <h4 style={{ color: '#D4AF37', fontSize: '13px', letterSpacing: '2px', fontWeight: 600, marginBottom: '8px' }}>ADDRESS</h4>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.6 }}>
                    Aminpur Bazar, Opposite Car Parking Goal,<br />
                    Katchery Bazar Clock Tower,<br />
                    Faisalabad, Pakistan
                  </p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Usmania+Hotel+Aminpur+Bazar+Faisalabad"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  color: '#D4AF37',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'inline-block',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.color = '#1E1E1E'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; e.currentTarget.style.color = '#D4AF37'; }}
              >
                🗺️ Get Directions
              </a>
            </div>

            {/* Phone */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '20px',
              padding: '28px',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
            }}>
              <div style={{
                width: '48px', height: '48px',
                background: 'rgba(212,175,55,0.15)',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', flexShrink: 0,
              }}>📞</div>
              <div>
                <h4 style={{ color: '#D4AF37', fontSize: '13px', letterSpacing: '2px', fontWeight: 600, marginBottom: '6px' }}>PHONE</h4>
                <a
                  href="tel:+924126418171"
                  style={{
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '22px',
                    fontWeight: 700,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  +92 41 2641817
                </a>
              </div>
            </div>

            {/* Hours */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '20px',
              padding: '28px',
            }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', flexShrink: 0,
                }}>🕐</div>
                <div>
                  <h4 style={{ color: '#D4AF37', fontSize: '13px', letterSpacing: '2px', fontWeight: 600, marginBottom: '4px' }}>OPENING HOURS</h4>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: 'rgba(42,122,92,0.2)',
                    border: '1px solid rgba(42,122,92,0.4)',
                    borderRadius: '20px', padding: '2px 10px',
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
                    <span style={{ color: '#4CAF50', fontSize: '11px', fontWeight: 600 }}>OPEN TODAY</span>
                  </div>
                </div>
              </div>
              {hours.map(h => (
                <div
                  key={h.day}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{h.day}</span>
                  <span style={{ color: h.open ? '#D4AF37' : 'rgba(255,255,255,0.4)', fontSize: '14px', fontWeight: 600 }}>{h.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '2px solid rgba(212,175,55,0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              height: '520px',
              position: 'relative',
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.069!2d73.0812!3d31.4178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39226578c97bd0a3%3A0x2651c47cd8a3d4f0!2sUsmania%20Hotel!5e0!3m2!1sen!2spk!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              title="Usmania Hotel Location"
            />
            {/* Map overlay pin */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(15,61,46,0.95)',
              border: '1px solid rgba(212,175,55,0.4)',
              borderRadius: '12px',
              padding: '12px 16px',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ color: '#D4AF37', fontSize: '13px', fontWeight: 700 }}>📍 Usmania Hotel</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Aminpur Bazar, Faisalabad</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
