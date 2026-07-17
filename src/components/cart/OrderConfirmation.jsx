import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { PartyPopper } from 'lucide-react';
import Receipt from './Receipt';
import { phoneToTel, whatsappLink } from '../../config';
import { useSiteContent } from '../../lib/siteContentStore';

function buildWhatsappSummary(order) {
  const lines = [
    `*New Order — ${order.id}*`,
    '',
    ...order.items.map(i => `• ${i.name} (${i.name_ur}) × ${i.qty} — Rs ${i.price * i.qty}`),
    '',
    `*Total: Rs ${order.total}*`,
    '',
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `Address: ${order.customer.address}`,
  ];
  if (order.customer.notes) lines.push(`Notes: ${order.customer.notes}`);
  lines.push('', 'Payment: Cash on Delivery');
  return lines.join('\n');
}

export default function OrderConfirmation({ order, onClose }) {
  const { content } = useSiteContent();
  const receiptRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  const renderReceiptCanvas = async () => {
    if (!receiptRef.current) return null;
    return html2canvas(receiptRef.current, { scale: 2, backgroundColor: '#ffffff' });
  };

  const downloadReceipt = async () => {
    setDownloading(true);
    try {
      const canvas = await renderReceiptCanvas();
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `usmania-order-${order.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const sendOnWhatsapp = async () => {
    const summary = buildWhatsappSummary(order);
    setSharing(true);
    try {
      const canvas = await renderReceiptCanvas();
      const blob = canvas ? await new Promise(resolve => canvas.toBlob(resolve, 'image/png')) : null;
      if (blob) {
        const file = new File([blob], `usmania-order-${order.id}.png`, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text: summary, title: `Order ${order.id}` });
          return;
        }
      }
      window.open(whatsappLink(content.business.whatsappNumber, summary), '_blank', 'noopener,noreferrer');
    } catch (err) {
      if (err?.name !== 'AbortError') {
        window.open(whatsappLink(content.business.whatsappNumber, summary), '_blank', 'noopener,noreferrer');
      }
    } finally {
      setSharing(false);
    }
  };

  return (
    <>
      {/* Off-screen full-size receipt — the source for the downloaded/shared PNG. */}
      <div aria-hidden="true" style={{ position: 'fixed', left: '-9999px', top: 0, pointerEvents: 'none' }}>
        <Receipt ref={receiptRef} order={order} items={order.items} total={order.total} />
      </div>

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-thanks-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 6500,
          background: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{
            width: 'min(460px, 100%)',
            maxHeight: '92vh',
            overflowY: 'auto',
            background: '#1E1E1E',
            border: '1px solid rgba(212,175,55,0.35)',
            borderRadius: '18px',
            padding: '26px 22px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            background: 'rgba(212,175,55,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
          }}>
            <PartyPopper size={24} color="#D4AF37" />
          </div>
          <h3 id="order-thanks-title" style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF', fontSize: '20px', fontWeight: 700, margin: '0 0 6px' }}>
            Thank you for your order!
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.6, margin: '0 0 18px' }}>
            Order <strong style={{ color: '#D4AF37' }}>#{order.id}</strong> — here's your receipt. Download it and send
            it to us on WhatsApp, or call to confirm.
          </p>

          {/* Receipt preview */}
          <div className="receipt-preview" style={{
            display: 'flex', justifyContent: 'center', overflow: 'hidden',
            borderRadius: '14px', border: '1px solid rgba(212,175,55,0.25)', marginBottom: '18px',
          }}>
            <div className="receipt-preview-inner">
              <Receipt order={order} items={order.items} total={order.total} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={downloadReceipt}
              disabled={downloading}
              style={{
                width: '100%',
                background: 'rgba(212,175,55,0.12)',
                border: '1px solid rgba(212,175,55,0.4)',
                color: '#D4AF37', borderRadius: '50px', padding: '13px 0',
                fontSize: '14px', fontWeight: 700, cursor: downloading ? 'default' : 'pointer',
                opacity: downloading ? 0.6 : 1,
              }}
            >
              {downloading ? 'Preparing…' : '⬇ Download Receipt'}
            </button>
            <button
              onClick={sendOnWhatsapp}
              disabled={sharing}
              style={{
                width: '100%',
                background: '#25D366', border: 'none', color: '#fff',
                borderRadius: '50px', padding: '13px 0',
                fontSize: '14px', fontWeight: 700, cursor: sharing ? 'default' : 'pointer',
                opacity: sharing ? 0.7 : 1,
              }}
            >
              {sharing ? 'Preparing…' : '💬 Send via WhatsApp'}
            </button>
            <a
              href={phoneToTel(content.business.phoneDisplay)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                width: '100%', boxSizing: 'border-box',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                borderRadius: '50px', padding: '12px 0',
                fontSize: '13px', fontWeight: 600,
              }}
            >
              📞 Or Call to Confirm: {content.business.phoneDisplay}
            </a>
            <button
              onClick={onClose}
              style={{
                background: 'none', border: 'none',
                color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', padding: '6px 0', marginTop: '2px',
              }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .receipt-preview-inner { width: 420px; }
        @media (max-width: 470px) {
          .receipt-preview-inner { zoom: 0.82; }
        }
        @media (max-width: 400px) {
          .receipt-preview-inner { zoom: 0.72; }
        }
        @media (max-width: 350px) {
          .receipt-preview-inner { zoom: 0.62; }
        }
      `}</style>
    </>
  );
}
