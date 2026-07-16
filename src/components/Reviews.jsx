import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteContent } from '../lib/siteContentStore';

function Stars({ count }) {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < count ? '#D4AF37' : 'rgba(212,175,55,0.25)', fontSize: '16px' }}>★</span>
      ))}
    </span>
  );
}

export default function Reviews() {
  const { content } = useSiteContent();
  const { reviews, business } = content;
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(t);
  }, [reviews.length]);

  const prev = () => setCurrent(c => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent(c => (c + 1) % reviews.length);

  return (
    <section
      id="reviews"
      ref={ref}
      style={{
        background: 'linear-gradient(160deg, #0F3D2E 0%, #1E1E1E 60%, #1E1E1E 100%)',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'rgba(212,175,55,0.04)',
        border: '1px solid rgba(212,175,55,0.08)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(15,61,46,0.3)',
        border: '1px solid rgba(212,175,55,0.06)',
      }} />

      {/* Giant quote */}
      <div style={{
        position: 'absolute', top: '60px', left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '200px', color: 'rgba(212,175,55,0.04)',
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>"</div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', fontWeight: 600, marginBottom: '14px' }}>
            WHAT PEOPLE SAY
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: '#FFFFFF',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.2,
          }}>
            Voices of Our{' '}
            <span style={{ color: '#D4AF37' }}>Loyal Customers</span>
          </h2>
        </motion.div>

        {/* Review Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '60px',
        }}>
          {reviews.slice(0, 3).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6, borderColor: 'rgba(212,175,55,0.4)' }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '32px',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Quote icon */}
              <div style={{ color: '#D4AF37', fontSize: '32px', lineHeight: 1, marginBottom: '16px', fontFamily: 'serif' }}>"</div>

              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.75, marginBottom: '24px', fontStyle: 'italic' }}>
                {review.text}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${review.color}, ${review.color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '16px',
                  flexShrink: 0,
                  border: '2px solid rgba(212,175,55,0.3)',
                }}>
                  {review.initial}
                </div>
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '15px' }}>{review.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <Stars count={review.rating} />
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{review.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured large review */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(15,61,46,0.4) 100%)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '24px',
            padding: '48px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          }} />

          <div style={{ marginBottom: '24px' }}>
            <Stars count={5} />
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#FFFFFF',
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                lineHeight: 1.6,
                maxWidth: '700px',
                margin: '0 auto 28px',
                fontStyle: 'italic',
              }}
            >
              "{reviews[current].text}"
            </motion.p>
          </AnimatePresence>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${reviews[current].color}, ${reviews[current].color}88)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '16px',
              border: '2px solid rgba(212,175,55,0.4)',
            }}>
              {reviews[current].initial}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: '#D4AF37', fontWeight: 600 }}>{reviews[current].name}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{reviews[current].date}</div>
            </div>
          </div>

          {/* Prev / Next */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '32px' }}>
            <button
              onClick={prev}
              aria-label="Previous review"
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)',
                color: '#D4AF37', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            ><ChevronLeft size={18} /></button>
            <span aria-live="polite" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', minWidth: '70px', textAlign: 'center' }}>
              {current + 1} / {reviews.length}
            </span>
            <button
              onClick={next}
              aria-label="Next review"
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)',
                color: '#D4AF37', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            ><ChevronRight size={18} /></button>
          </div>
        </motion.div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          style={{
            textAlign: 'center',
            marginTop: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: '12px',
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ color: '#D4AF37', fontSize: '28px', fontWeight: 700 }}>{business.ratingValue.toFixed(1)}</span>
            <div>
              <Stars count={Math.round(business.ratingValue)} />
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '2px' }}>{business.ratingCount}+ Reviews on Google</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
