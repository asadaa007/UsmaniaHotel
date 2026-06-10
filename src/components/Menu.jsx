import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const dishes = [
  {
    id: 1,
    name: 'Chicken Jalfrezi',
    category: 'Mains',
    desc: "Restaurant's most famous dish — tender chicken pieces cooked with bell peppers, tomatoes, and aromatic spices in a rich, tangy gravy.",
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80',
    badge: '🔥 Most Popular',
    price: 'Rs 380',
    tags: ['Spicy', 'Signature'],
  },
  {
    id: 2,
    name: 'Special Chapli Kabab',
    category: 'BBQ',
    desc: 'Traditional Peshawari-style flat kababs made with minced beef, pomegranate seeds, fresh herbs, and secret spices. Crispy outside, juicy inside.',
    image: 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=600&q=80',
    badge: '⭐ Must Try',
    price: 'Rs 120',
    tags: ['Grilled', 'Traditional'],
  },
  {
    id: 3,
    name: 'Chicken Leg Roast',
    category: 'Grilled',
    desc: 'Signature slow-cooked chicken leg marinated in a blend of Pakistani spices, yogurt, and herbs. Perfectly charred for an unforgettable smoky flavor.',
    image: 'https://images.unsplash.com/photo-1736952332338-44dc07283462?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    badge: '🌟 Signature',
    price: 'Rs 450',
    tags: ['Grilled', 'Spicy'],
  },
  {
    id: 4,
    name: 'Kabab Takkay',
    category: 'BBQ',
    desc: 'Authentic Pakistani BBQ kababs skewered and grilled over hot coals. Seasoned with aromatic spices for the perfect smoky, savory bite.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    badge: '💎 Classic',
    price: 'Rs 160',
    tags: ['BBQ', 'Traditional'],
  },
  {
    id: 5,
    name: 'Daal Fry',
    category: 'Vegetarian',
    desc: 'Traditional comfort food — slow-cooked lentils tempered with cumin, garlic, red chilies, and fresh coriander. A staple that warms the soul.',
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&q=80',
    badge: '💚 Comfort Food',
    price: 'Rs 220',
    tags: ['Vegetarian', 'Mild'],
  },
  {
    id: 6,
    name: 'Malai Boti',
    category: 'BBQ',
    desc: "Customer favorite — succulent chicken chunks marinated in cream, cheese, and mild spices. Silky smooth texture with a rich, melt-in-your-mouth taste.",
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
    badge: '❤️ Fan Favorite',
    price: 'Rs 520',
    tags: ['Creamy', 'Mild'],
  },
];

const categories = ['All', 'Mains', 'BBQ', 'Grilled', 'Vegetarian'];

function DishModal({ dish, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '24px',
          overflow: 'hidden',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ position: 'relative' }}>
          <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(15,61,46,0.8) 0%, transparent 50%)',
          }} />
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'rgba(0,0,0,0.6)', border: 'none',
              color: '#fff', borderRadius: '50%',
              width: '36px', height: '36px', cursor: 'pointer',
              fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
          <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
            <span style={{
              background: 'rgba(212,175,55,0.9)',
              color: '#0F3D2E', fontSize: '11px', fontWeight: 700,
              padding: '4px 12px', borderRadius: '20px',
            }}>{dish.badge}</span>
          </div>
        </div>
        <div style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              color: '#0F3D2E', fontSize: '26px', fontWeight: 700,
            }}>{dish.name}</h3>
            <span style={{ color: '#D4AF37', fontSize: '20px', fontWeight: 700 }}>{dish.price}</span>
          </div>
          <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '20px', fontSize: '15px' }}>{dish.desc}</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {dish.tags.map(t => (
              <span key={t} style={{
                background: 'rgba(15,61,46,0.08)',
                color: '#0F3D2E', fontSize: '12px', fontWeight: 600,
                padding: '4px 12px', borderRadius: '20px',
                border: '1px solid rgba(15,61,46,0.15)',
              }}>{t}</span>
            ))}
          </div>
          <a
            href="tel:+924126418171"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
              color: '#0F3D2E', textDecoration: 'none',
              padding: '14px 0', borderRadius: '50px',
              fontSize: '14px', fontWeight: 700,
              display: 'block', textAlign: 'center',
              boxShadow: '0 6px 20px rgba(212,175,55,0.35)',
            }}
          >
            📞 Order Now: +92 41 2641817
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDish, setSelectedDish] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = activeCategory === 'All' ? dishes : dishes.filter(d => d.category === activeCategory);

  return (
    <section
      id="menu"
      ref={ref}
      style={{
        background: '#1E1E1E',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(15,61,46,0.3) 0%, transparent 50%)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', fontWeight: 600, marginBottom: '14px' }}>
            OUR SIGNATURE DISHES
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: '#FFFFFF',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '16px',
          }}>
            Flavors That Have{' '}
            <span style={{ color: '#D4AF37' }}>Stood the Test</span>{' '}
            of Time
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '560px', margin: '0 auto', fontSize: '16px', lineHeight: 1.7 }}>
            Each dish is crafted with traditional recipes passed down through generations, using only the freshest ingredients.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex', justifyContent: 'center',
            gap: '10px', marginBottom: '50px', flexWrap: 'wrap',
          }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 24px',
                borderRadius: '50px',
                border: activeCategory === cat ? '2px solid #D4AF37' : '2px solid rgba(255,255,255,0.15)',
                background: activeCategory === cat
                  ? 'linear-gradient(135deg, #D4AF37, #A8890A)'
                  : 'rgba(255,255,255,0.05)',
                color: activeCategory === cat ? '#1E1E1E' : 'rgba(255,255,255,0.7)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.5px',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Dishes Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '28px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((dish, i) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setSelectedDish(dish)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 24px 50px rgba(0,0,0,0.4)',
                  borderColor: 'rgba(212,175,55,0.4)',
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{ width: '100%', height: '220px', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                    loading="lazy"
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                  }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span style={{
                      background: 'rgba(212,175,55,0.9)',
                      color: '#1E1E1E', fontSize: '10px', fontWeight: 700,
                      padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.5px',
                    }}>{dish.badge}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                    <span style={{
                      background: 'rgba(15,61,46,0.9)',
                      color: '#D4AF37', fontSize: '14px', fontWeight: 700,
                      padding: '6px 14px', borderRadius: '20px',
                      border: '1px solid rgba(212,175,55,0.3)',
                    }}>{dish.price}</span>
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#FFFFFF', fontSize: '20px', fontWeight: 600,
                    marginBottom: '8px',
                  }}>{dish.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
                    {dish.desc.substring(0, 90)}...
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {dish.tags.map(t => (
                      <span key={t} style={{
                        background: 'rgba(212,175,55,0.1)',
                        color: '#D4AF37', fontSize: '11px', fontWeight: 600,
                        padding: '3px 10px', borderRadius: '20px',
                        border: '1px solid rgba(212,175,55,0.2)',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '60px' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '20px', fontSize: '14px' }}>
            Prices may vary · Rs 1 – 1,000 per person
          </p>
          <a
            href="tel:+924126418171"
            style={{
              background: 'transparent',
              border: '2px solid #D4AF37',
              color: '#D4AF37',
              textDecoration: 'none',
              padding: '14px 40px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '1px',
              display: 'inline-block',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.color = '#1E1E1E'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#D4AF37'; }}
          >
            📞 Order via Call
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedDish && <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />}
      </AnimatePresence>
    </section>
  );
}
