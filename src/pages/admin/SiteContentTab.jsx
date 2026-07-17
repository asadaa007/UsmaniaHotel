import { useState } from 'react';
import { colors, font } from './adminTheme';
import BusinessEditor from './siteContent/BusinessEditor';
import HeroEditor from './siteContent/HeroEditor';
import AboutEditor from './siteContent/AboutEditor';
import StatsEditor from './siteContent/StatsEditor';
import WhyChooseUsEditor from './siteContent/WhyChooseUsEditor';
import GalleryEditor from './siteContent/GalleryEditor';
import ReviewsEditor from './siteContent/ReviewsEditor';
import FooterEditor from './siteContent/FooterEditor';
import OrderCtaEditor from './siteContent/OrderCtaEditor';

const sections = [
  { id: 'business', label: 'Business & Contact', Component: BusinessEditor },
  { id: 'hero', label: 'Hero', Component: HeroEditor },
  { id: 'about', label: 'About / Story', Component: AboutEditor },
  { id: 'stats', label: 'Stats', Component: StatsEditor },
  { id: 'why', label: 'Why Choose Us', Component: WhyChooseUsEditor },
  { id: 'gallery', label: 'Gallery', Component: GalleryEditor },
  { id: 'reviews', label: 'Reviews', Component: ReviewsEditor },
  { id: 'orderCta', label: 'Order CTA', Component: OrderCtaEditor },
  { id: 'footer', label: 'Footer', Component: FooterEditor },
];

export default function SiteContentTab() {
  const [active, setActive] = useState('business');
  const activeSection = sections.find(s => s.id === active);
  const ActiveComponent = activeSection.Component;

  return (
    <div style={{ fontFamily: font, display: 'flex', gap: '24px', alignItems: 'flex-start' }} className="site-content-layout">
      <div className="site-content-subnav" style={{
        width: '200px', flexShrink: 0,
        display: 'flex', flexDirection: 'column', gap: '2px',
      }}>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            aria-current={active === s.id}
            style={{
              textAlign: 'left', padding: '9px 12px', borderRadius: '8px', border: 'none',
              background: active === s.id ? colors.accentMuted : 'transparent',
              color: active === s.id ? colors.accent : colors.textSecondary,
              fontWeight: 600, fontSize: '13px', fontFamily: font, cursor: 'pointer',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 style={{ color: colors.textPrimary, fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>{activeSection.label}</h2>
        <ActiveComponent />
      </div>

      <style>{`
        @media (max-width: 700px) {
          .site-content-layout { flex-direction: column; }
          .site-content-subnav { width: 100%; flex-direction: row; flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}
