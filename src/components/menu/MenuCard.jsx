import { motion } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';
import QtyControl from './QtyControl';

export default function MenuCard({ dish, index, onOpen }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => onOpen(dish)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${dish.name}`}
      onKeyDown={(e) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onOpen(dish); } }}
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
        {dish.image ? (
          <img
            src={dish.image}
            alt={dish.name}
            style={{ width: '100%', height: '220px', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
            loading="lazy"
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{
            width: '100%', height: '220px',
            background: 'linear-gradient(135deg, #0F3D2E, #1A5C44)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <UtensilsCrossed size={40} color="rgba(212,175,55,0.6)" />
          </div>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
        }} />
        {dish.badge && (
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <span style={{
              background: 'rgba(212,175,55,0.9)',
              color: '#1E1E1E', fontSize: '10px', fontWeight: 700,
              padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.5px',
            }}>{dish.badge}</span>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
          <span style={{
            background: 'rgba(15,61,46,0.9)',
            color: '#D4AF37', fontSize: '14px', fontWeight: 700,
            padding: '6px 14px', borderRadius: '20px',
            border: '1px solid rgba(212,175,55,0.3)',
          }}>Rs {dish.price}</span>
        </div>
      </div>
      <div style={{ padding: '24px' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          color: '#FFFFFF', fontSize: '20px', fontWeight: 600,
          marginBottom: '2px',
        }}>{dish.name}</h3>
        <p className="ur" style={{ color: 'rgba(212,175,55,0.8)', fontSize: '14px', marginBottom: '10px' }}>{dish.name_ur}</p>
        {dish.desc && (
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
            {dish.desc.substring(0, 90)}...
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginTop: dish.desc ? 0 : '8px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {(dish.tags || []).map(t => (
              <span key={t} style={{
                background: 'rgba(212,175,55,0.1)',
                color: '#D4AF37', fontSize: '11px', fontWeight: 600,
                padding: '3px 10px', borderRadius: '20px',
                border: '1px solid rgba(212,175,55,0.2)',
              }}>{t}</span>
            ))}
          </div>
          <QtyControl dish={dish} compact />
        </div>
      </div>
    </motion.div>
  );
}
