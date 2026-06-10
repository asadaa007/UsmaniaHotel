import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: '🌶️',
    title: 'Authentic Pakistani Taste',
    desc: 'Recipes passed down through generations, preserving the true essence of traditional Pakistani cuisine.',
    color: '#D4AF37',
  },
  {
    icon: '🌿',
    title: 'Fresh Ingredients Daily',
    desc: 'We source only the freshest vegetables, meats, and spices every morning to guarantee quality in every bite.',
    color: '#2A7A5C',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Family Friendly Environment',
    desc: 'A warm, welcoming atmosphere that has hosted generations of families for every occasion.',
    color: '#D4AF37',
  },
  {
    icon: '✨',
    title: 'Hygienic Food Preparation',
    desc: 'We maintain the highest standards of cleanliness and hygiene throughout our kitchen and dining area.',
    color: '#2A7A5C',
  },
  {
    icon: '💰',
    title: 'Affordable Pricing',
    desc: 'Premium traditional flavors at prices that make authentic Pakistani cuisine accessible to everyone.',
    color: '#D4AF37',
  },
  {
    icon: '⚡',
    title: 'Quick Service',
    desc: 'Whether dining in, taking away, or ordering delivery — we respect your time with prompt service.',
    color: '#2A7A5C',
  },
];

const services = [
  { icon: '🪑', label: 'Dine-In' },
  { icon: '🚗', label: 'Drive-Through' },
  { icon: '📦', label: 'Takeaway' },
  { icon: '🛵', label: 'Food Delivery' },
];

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      style={{
        background: '#F8F5EF',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
      ref={ref}
    >
      {/* Decorative */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-80px', right: '-80px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,61,46,0.06) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', fontWeight: 600, marginBottom: '14px' }}>
            WHY CHOOSE US
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: '#0F3D2E',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '16px',
          }}>
            What Makes Us{' '}
            <span style={{ color: '#D4AF37' }}>Faisalabad's Favorite</span>
          </h2>
          <p style={{ color: '#666', maxWidth: '560px', margin: '0 auto', fontSize: '16px', lineHeight: 1.7 }}>
            For generations, Usmania Hotel has set the standard for authentic Pakistani cuisine in Faisalabad.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '80px',
        }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 20px 45px rgba(15,61,46,0.12)' }}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '36px 30px',
                border: '1px solid rgba(15,61,46,0.08)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Accent corner */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '80px', height: '80px',
                background: `radial-gradient(circle at top right, ${f.color}15 0%, transparent 70%)`,
              }} />

              <div style={{
                width: '60px', height: '60px',
                background: `${f.color}15`,
                border: `2px solid ${f.color}30`,
                borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '20px',
              }}>
                {f.icon}
              </div>

              <div style={{
                width: '32px', height: '3px',
                background: `linear-gradient(90deg, ${f.color}, transparent)`,
                borderRadius: '2px',
                marginBottom: '14px',
              }} />

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                color: '#0F3D2E',
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '10px',
                lineHeight: 1.3,
              }}>{f.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Services banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            background: 'linear-gradient(135deg, #0F3D2E 0%, #1A5C44 100%)',
            borderRadius: '24px',
            padding: '48px 40px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 20px 60px rgba(15,61,46,0.25)',
          }}
        >
          <div>
            <p style={{ color: 'rgba(212,175,55,0.8)', fontSize: '12px', letterSpacing: '3px', fontWeight: 600, marginBottom: '8px' }}>
              AVAILABLE SERVICES
            </p>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              color: '#FFFFFF',
              fontSize: 'clamp(22px, 3vw, 30px)',
              fontWeight: 700,
            }}>
              We Serve You, Your Way
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {services.map(s => (
              <div
                key={s.label}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  borderRadius: '14px',
                  padding: '18px 24px',
                  textAlign: 'center',
                  minWidth: '110px',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
                <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
