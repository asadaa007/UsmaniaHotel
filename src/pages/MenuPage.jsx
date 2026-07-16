import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMenuStore } from '../lib/menuStore';
import { menuCategories } from '../data/menu';
import { phoneToTel } from '../config';
import { useSiteContent } from '../lib/siteContentStore';
import MenuCard from '../components/menu/MenuCard';
import DishModal from '../components/menu/DishModal';

export default function MenuPage() {
  const { menu } = useMenuStore();
  const { content } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const openDishModal = (dish) => { setSelectedDish(dish); setDishModalOpen(true); };
  const closeDishModal = () => setDishModalOpen(false);

  const categories = useMemo(() => ['All', ...menuCategories.filter(c => menu.some(d => d.category === c))], [menu]);
  const filtered = activeCategory === 'All' ? menu : menu.filter(d => d.category === activeCategory);

  return (
    <div style={{ background: '#1E1E1E', minHeight: '100vh' }}>
      <div style={{
        padding: '160px 24px 60px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #0F3D2E 0%, #1A5C44 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <p style={{ color: 'rgba(212,175,55,0.7)', fontSize: '13px', marginBottom: '16px' }}>
            <Link to="/" style={{ color: 'rgba(212,175,55,0.7)', textDecoration: 'none' }}>Home</Link> / Menu
          </p>
          <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', fontWeight: 600, marginBottom: '14px' }}>
            OUR COMPLETE MENU
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            color: '#FFFFFF',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.2,
          }}>
            Every Dish, <span style={{ color: '#D4AF37' }}>Every Flavor</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '560px', margin: '16px auto 0', fontSize: '16px', lineHeight: 1.7 }}>
            {menu.length} dishes across {menuCategories.length} categories — traditional recipes, authentic Pakistani flavors.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px 100px' }}>
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '10px', marginBottom: '50px', flexWrap: 'wrap',
        }}>
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
        </div>

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {filtered.map((dish, i) => (
            <MenuCard key={dish.id} dish={dish} index={i} onOpen={openDishModal} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '60px 0' }}>
            No dishes in this category yet.
          </p>
        )}

        <div style={{ textAlign: 'center', marginTop: '70px' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '20px', fontSize: '14px' }}>
            Prefer to order by phone?
          </p>
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
            }}
          >
            📞 Order by Call: {content.business.phoneDisplay}
          </a>
        </div>
      </div>

      <DishModal dish={selectedDish} open={dishModalOpen} onClose={closeDishModal} />
    </div>
  );
}
