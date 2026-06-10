import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function OrderCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, #0F3D2E 0%, #1A5C44 50%, #0F3D2E 100%)',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(212,175,55,0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(212,175,55,0.06) 0%, transparent 50%)
        `,
      }} />

      {/* Animated rings */}
      <div className="animate-spin-slow" style={{
        position: 'absolute', top: '-200px', right: '-200px',
        width: '600px', height: '600px', borderRadius: '50%',
        border: '1px solid rgba(212,175,55,0.08)',
      }} />
      <div style={{
        position: 'absolute', top: '-150px', right: '-150px',
        width: '500px', height: '500px', borderRadius: '50%',
        border: '1px solid rgba(212,175,55,0.06)',
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(212,175,55,0.15)',
            border: '1px solid rgba(212,175,55,0.4)',
            borderRadius: '50px',
            padding: '10px 24px',
            marginBottom: '28px',
          }}>
            <span style={{ color: '#D4AF37', fontSize: '18px' }}>🍽️</span>
            <span style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '3px', fontWeight: 600 }}>
              ORDER NOW
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: '#FFFFFF',
            fontSize: 'clamp(32px, 5vw, 62px)',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: '20px',
          }}>
            Craving Authentic{' '}
            <span style={{ color: '#D4AF37' }}>Pakistani Food?</span>
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: 'clamp(15px, 2vw, 18px)',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 48px',
          }}>
            Call us now, visit us in Aminpur Bazar, or get directions to experience
            Faisalabad's most legendary traditional Pakistani flavors.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}>
            <motion.a
              href="tel:+924126418171"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
                color: '#0F3D2E',
                textDecoration: 'none',
                padding: '18px 44px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 700,
                boxShadow: '0 10px 30px rgba(212,175,55,0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              📞 Call Now
            </motion.a>

            <motion.a
              href="https://maps.google.com/?q=Usmania+Hotel+Aminpur+Bazar+Faisalabad"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.4)',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '18px 44px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#FFFFFF'; }}
            >
              🗺️ Get Directions
            </motion.a>
          </div>

          {/* Phone number highlight */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: '16px',
            padding: '16px 28px',
          }}>
            <div className="animate-pulse-gold" style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: '#4CAF50',
            }} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Open Daily 9:00 AM – 11:30 PM</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <a href="tel:+924126418171" style={{ color: '#D4AF37', fontSize: '18px', fontWeight: 700, textDecoration: 'none', fontFamily: "'Playfair Display', serif" }}>
              +92 41 2641817
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
