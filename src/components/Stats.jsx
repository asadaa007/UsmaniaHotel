import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function Counter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { icon: '⭐', value: 619, suffix: '+', label: 'Customer Reviews', sub: 'On Google Maps' },
  { icon: '🏆', value: 4, suffix: '.0/5', label: 'Star Rating', sub: 'Highly Rated' },
  { icon: '🕐', value: 365, suffix: '', label: 'Days Open', sub: 'Every Year' },
  { icon: '👨‍👩‍👧‍👦', value: 1000, suffix: '+', label: 'Happy Families', sub: 'Served Daily' },
];

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="stats"
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, #0F3D2E 0%, #1A5C44 100%)',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative */}
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(212,175,55,0.05)',
        border: '1px solid rgba(212,175,55,0.1)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-40px', left: '-40px',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'rgba(212,175,55,0.04)',
        border: '1px solid rgba(212,175,55,0.08)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', fontWeight: 600, marginBottom: '12px' }}>
            OUR LEGACY
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: '#FFFFFF',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            lineHeight: 1.2,
          }}>
            Trusted by Thousands of Families
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '20px',
                padding: '40px 30px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              whileHover={{
                y: -6,
                background: 'rgba(212,175,55,0.08)',
                borderColor: 'rgba(212,175,55,0.5)',
              }}
            >
              <div style={{ fontSize: '44px', marginBottom: '16px' }}>{s.icon}</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                color: '#D4AF37',
                fontSize: 'clamp(36px, 4vw, 52px)',
                fontWeight: 700,
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                {s.label}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                {s.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
