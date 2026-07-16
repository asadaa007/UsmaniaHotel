import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, UtensilsCrossed } from 'lucide-react';
import { phoneToTel } from '../../config';
import { useSiteContent } from '../../lib/siteContentStore';
import QtyControl from './QtyControl';

export default function DishModal({ dish, open, onClose }) {
  const { content } = useSiteContent();
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      aria-hidden={!open}
      inert={!open}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(8px)',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      <motion.div
        animate={{ scale: open ? 1 : 0.85, y: open ? 0 : 40 }}
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
        {dish && (
          <>
            <div style={{ position: 'relative' }}>
              {dish.image ? (
                <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{
                  width: '100%', height: '180px',
                  background: 'linear-gradient(135deg, #0F3D2E, #1A5C44)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <UtensilsCrossed size={48} color="rgba(212,175,55,0.6)" />
                </div>
              )}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(15,61,46,0.8) 0%, transparent 50%)',
              }} />
              <button
                onClick={onClose}
                aria-label="Close dish details"
                style={{
                  position: 'absolute', top: '10px', right: '10px',
                  background: 'rgba(0,0,0,0.6)', border: 'none',
                  color: '#fff', borderRadius: '50%',
                  width: '44px', height: '44px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              ><X size={18} /></button>
              {dish.badge && (
                <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
                  <span style={{
                    background: 'rgba(212,175,55,0.9)',
                    color: '#0F3D2E', fontSize: '11px', fontWeight: 700,
                    padding: '4px 12px', borderRadius: '20px',
                  }}>{dish.badge}</span>
                </div>
              )}
            </div>
            <div style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <h3 id="dish-modal-title" style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#0F3D2E', fontSize: '26px', fontWeight: 700,
                }}>{dish.name}</h3>
                <span style={{ color: '#D4AF37', fontSize: '20px', fontWeight: 700 }}>Rs {dish.price}</span>
              </div>
              <p className="ur" style={{ color: '#0F3D2E', fontSize: '17px', marginBottom: '16px', textAlign: 'right' }}>{dish.name_ur}</p>
              {dish.desc && <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '20px', fontSize: '15px' }}>{dish.desc}</p>}
              {dish.tags && dish.tags.length > 0 && (
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
              )}
              <div style={{ display: 'flex', gap: '10px', marginTop: dish.tags && dish.tags.length > 0 ? 0 : '20px' }}>
                <div style={{ flex: 1 }}>
                  <QtyControl dish={dish} />
                </div>
                <a
                  href={phoneToTel(content.business.phoneDisplay)}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #0F3D2E, #1A5C44)',
                    color: '#D4AF37', textDecoration: 'none',
                    padding: '14px 0', borderRadius: '50px',
                    fontSize: '13px', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 6px 20px rgba(15,61,46,0.25)',
                  }}
                >
                  📞 Call to Order
                </a>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
