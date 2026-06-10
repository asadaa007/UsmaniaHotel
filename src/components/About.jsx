import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: '#F8F5EF',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative corner */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '500px', height: '500px',
        background: 'radial-gradient(circle at top right, rgba(212,175,55,0.07) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '80px',
          alignItems: 'center',
        }}>
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(15,61,46,0.2)',
              position: 'relative',
            }}>
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Usmania Hotel Interior"
                style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(15,61,46,0.5) 0%, transparent 50%)',
              }} />
            </div>

            {/* Heritage badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: 'linear-gradient(135deg, #0F3D2E, #1A5C44)',
                border: '3px solid #D4AF37',
                borderRadius: '50%',
                width: '110px',
                height: '110px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                textAlign: 'center',
              }}
            >
              <span style={{ color: '#D4AF37', fontSize: '24px' }}>🏅</span>
              <span style={{ color: '#D4AF37', fontSize: '9px', fontWeight: 700, letterSpacing: '1px' }}>LEGENDARY</span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '8px' }}>TASTE</span>
            </motion.div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
                borderRadius: '16px',
                padding: '18px 24px',
                boxShadow: '0 10px 30px rgba(212,175,55,0.4)',
              }}
            >
              <div style={{ color: '#0F3D2E', fontSize: '28px', fontWeight: 800, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
                Generations
              </div>
              <div style={{ color: 'rgba(15,61,46,0.8)', fontSize: '11px', fontWeight: 600, marginTop: '4px' }}>
                OF AUTHENTIC FLAVORS
              </div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', fontWeight: 600, marginBottom: '14px' }}>
              OUR STORY
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: '#0F3D2E',
              fontSize: 'clamp(28px, 3.5vw, 46px)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '24px',
            }}>
              A Legacy of Taste,{' '}
              <span style={{ color: '#D4AF37' }}>Tradition</span>{' '}
              & Authentic Flavors
            </h2>

            <p style={{
              color: '#555',
              fontSize: '16px',
              lineHeight: 1.8,
              marginBottom: '20px',
            }}>
              Usmania Hotel has remained one of Faisalabad's most beloved restaurants for decades.
              Known for its authentic recipes, traditional cooking methods, and unforgettable flavors,
              generations of families continue to enjoy their favorite meals here.
            </p>

            <p style={{
              color: '#555',
              fontSize: '16px',
              lineHeight: 1.8,
              marginBottom: '40px',
            }}>
              Located in the heart of Aminpur Bazar near Katchery Bazar Clock Tower, our kitchen
              has been serving the same legendary Chicken Jalfrezi, Chapli Kabab, and traditional
              Pakistani dishes that have become synonymous with the finest dining in Faisalabad.
            </p>

            {/* Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
              {[
                { icon: '🍳', text: 'Traditional Recipes' },
                { icon: '🌿', text: 'Fresh Daily Ingredients' },
                { icon: '👨‍🍳', text: 'Expert Chefs' },
                { icon: '🏠', text: 'Family Atmosphere' },
              ].map(item => (
                <div
                  key={item.text}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(15,61,46,0.05)',
                    border: '1px solid rgba(15,61,46,0.1)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                  }}
                >
                  <span style={{ fontSize: '22px' }}>{item.icon}</span>
                  <span style={{ color: '#0F3D2E', fontSize: '14px', fontWeight: 600 }}>{item.text}</span>
                </div>
              ))}
            </div>

            <a
              href="#menu"
              style={{
                background: 'linear-gradient(135deg, #0F3D2E, #1A5C44)',
                color: '#D4AF37',
                textDecoration: 'none',
                padding: '16px 38px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '1px',
                display: 'inline-block',
                boxShadow: '0 8px 25px rgba(15,61,46,0.25)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 35px rgba(15,61,46,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(15,61,46,0.25)'; }}
            >
              Explore Our Menu →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
