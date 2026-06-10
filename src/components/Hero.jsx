import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1567337710282-00832b415979?w=1920&q=80',
  'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1920&q=80',
  'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=1920&q=80',
];

export default function Hero() {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setImgIdx(i => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Images */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === imgIdx ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            transform: i === imgIdx ? 'scale(1.03)' : 'scale(1)',
            transitionProperty: 'opacity, transform',
            transitionDuration: '1.2s, 8s',
          }}
        />
      ))}

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,61,46,0.88) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.3) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />

      {/* Gold decorative lines */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
      }} />

      {/* Floating gold orbs */}
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
        top: '10%', left: '-5%',
      }} />
      <div style={{
        position: 'absolute', width: '300px', height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
        bottom: '10%', right: '5%',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        maxWidth: '1280px',
        width: '100%',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0',
      }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.7 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(212,175,55,0.15)',
            border: '1px solid rgba(212,175,55,0.4)',
            borderRadius: '50px',
            padding: '8px 18px',
            marginBottom: '24px',
          }}
        >
          <span style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '2px', fontWeight: 600 }}>
            ✦ FAISALABAD'S LEGENDARY RESTAURANT ✦
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.95, duration: 0.8 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#FFFFFF',
            fontSize: 'clamp(32px, 5.5vw, 74px)',
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: '760px',
            textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            marginBottom: '20px',
          }}
        >
          Serving Faisalabad's Favorite{' '}
          <span style={{ color: '#D4AF37' }}>Traditional</span>{' '}
          Flavors Since Generations
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.7 }}
          style={{
            color: 'rgba(255,255,255,0.82)',
            fontSize: 'clamp(14px, 2vw, 18px)',
            lineHeight: 1.7,
            maxWidth: '540px',
            marginBottom: '36px',
          }}
        >
          Experience authentic Pakistani cuisine, signature Chicken Jalfrezi, Chapli Kabab,
          and family recipes that have made Usmania Hotel a local landmark.
        </motion.p>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.15, duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '40px',
          }}
        >
          <div style={{
            background: 'rgba(212,175,55,0.2)',
            border: '1px solid rgba(212,175,55,0.5)',
            borderRadius: '8px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: '#D4AF37', fontSize: '18px' }}>★★★★</span>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>4.0</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>/ 5.0</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>619+ Reviews</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.25, duration: 0.6 }}
          style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
        >
          <a
            href="#menu"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
              color: '#0F3D2E',
              textDecoration: 'none',
              padding: '16px 38px',
              borderRadius: '50px',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              boxShadow: '0 8px 25px rgba(212,175,55,0.4)',
              transition: 'all 0.3s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(212,175,55,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(212,175,55,0.4)'; }}
          >
            🍽️ View Menu
          </a>
          <a
            href="tel:+924126418171"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.5)',
              color: '#fff',
              textDecoration: 'none',
              padding: '16px 38px',
              borderRadius: '50px',
              fontSize: '15px',
              fontWeight: 600,
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = '#D4AF37'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff'; }}
          >
            📞 Call Now
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '11px',
          letterSpacing: '2px',
          cursor: 'pointer',
        }}
        onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ color: '#D4AF37', fontSize: '18px' }}
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Image dots */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        right: '40px',
        display: 'flex',
        gap: '8px',
      }}>
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setImgIdx(i)}
            style={{
              width: i === imgIdx ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === imgIdx ? '#D4AF37' : 'rgba(255,255,255,0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
