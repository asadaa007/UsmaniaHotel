import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useMenuStore } from '../lib/menuStore';
import { pickRandom } from '../lib/random';
import { phoneToTel } from '../config';
import { useSiteContent } from '../lib/siteContentStore';
import MenuCard from './menu/MenuCard';
import DishModal from './menu/DishModal';

export default function FeaturedMenu() {
  const { menu } = useMenuStore();
  const { content } = useSiteContent();
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const openDishModal = (dish) => { setSelectedDish(dish); setDishModalOpen(true); };
  const closeDishModal = () => setDishModalOpen(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const featured = useMemo(() => pickRandom(menu, 6), [menu]);

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
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(15,61,46,0.3) 0%, transparent 50%)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', fontWeight: 600, marginBottom: '14px' }}>
            FROM OUR MENU
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
            A taste of what's on offer — every visit to this page brings a different sample from our full menu.
          </p>
        </motion.div>

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '28px',
          }}
        >
          {featured.map((dish, i) => (
            <MenuCard key={dish.id} dish={dish} index={i} onOpen={openDishModal} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '60px', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}
        >
          <Link
            to="/menu"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
              color: '#1E1E1E',
              textDecoration: 'none',
              padding: '14px 40px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              display: 'inline-block',
            }}
          >
            View Full Menu →
          </Link>
          <a
            href={phoneToTel(content.business.phoneDisplay)}
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
            📞 Order by Call: {content.business.phoneDisplay}
          </a>
        </motion.div>
      </div>

      <DishModal dish={selectedDish} open={dishModalOpen} onClose={closeDishModal} />
    </section>
  );
}
