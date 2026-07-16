import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';
import { useSiteContent } from '../lib/siteContentStore';

export default function Gallery() {
  const { content } = useSiteContent();
  const galleryImages = content.gallery;
  const [lightbox, setLightbox] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const openLightbox = (img) => { setLightbox(img); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen]);

  return (
    <section
      id="gallery"
      ref={ref}
      style={{
        background: '#F8F5EF',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', fontWeight: 600, marginBottom: '14px' }}>
            OUR GALLERY
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: '#0F3D2E',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '16px',
          }}>
            A Feast for the{' '}
            <span style={{ color: '#D4AF37' }}>Eyes & Soul</span>
          </h2>
          <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto', fontSize: '16px', lineHeight: 1.7 }}>
            Glimpse the vibrant flavors and warm ambiance that make every visit to Usmania Hotel memorable.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div id="gallery-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
          gap: '16px',
        }}>
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => openLightbox(img)}
              role="button"
              tabIndex={0}
              aria-label={`View larger image: ${img.alt}`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(img); } }}
              style={{
                gridColumn: img.span === 'double' ? 'span 2' : 'span 1',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                height: img.span === 'double' ? '340px' : '280px',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  display: 'block',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(15,61,46,0.8) 0%, transparent 50%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                display: 'flex', alignItems: 'flex-end',
                padding: '20px',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0'}
              >
                <div>
                  <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{img.alt}</p>
                  <p style={{ color: 'rgba(212,175,55,0.8)', fontSize: '12px' }}>Click to view</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={lightbox ? lightbox.alt : 'Image viewer'}
        aria-hidden={!lightboxOpen}
        inert={!lightboxOpen}
        animate={{ opacity: lightboxOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={closeLightbox}
        style={{
          position: 'fixed', inset: 0, zIndex: 3000,
          background: 'rgba(0,0,0,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          pointerEvents: lightboxOpen ? 'auto' : 'none',
        }}
      >
        {lightbox && (
          <motion.div
            animate={{ scale: lightboxOpen ? 1 : 0.8, opacity: lightboxOpen ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={e => e.stopPropagation()}
            style={{ position: 'relative', maxWidth: '900px', width: '100%' }}
          >
            <img
              src={lightbox.src.replace('w=600', 'w=900').replace('w=800', 'w=1200')}
              alt={lightbox.alt}
              style={{
                width: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '16px',
                display: 'block',
              }}
            />
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <p style={{ color: '#D4AF37', fontSize: '16px', fontWeight: 600 }}>{lightbox.alt}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Usmania Hotel · Faisalabad</p>
            </div>
            <button
              onClick={closeLightbox}
              aria-label="Close image"
              style={{
                position: 'absolute', top: '-16px', right: '-16px',
                background: '#D4AF37', border: 'none',
                color: '#0F3D2E', borderRadius: '50%',
                width: '44px', height: '44px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              }}
            ><X size={20} /></button>
          </motion.div>
        )}
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #gallery-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          #gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
