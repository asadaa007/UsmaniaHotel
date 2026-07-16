import { useEffect, useRef, useState } from 'react';
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
  const [generating, setGenerating] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const autoDownloaded = useRef(false);

  const renderReceiptCanvas = async () => {
    if (!receiptRef.current) return null;
    return html2canvas(receiptRef.current, { scale: 2, backgroundColor: '#ffffff' });
  };

  const downloadReceipt = async () => {
    setGenerating(true);
    try {
      const canvas = await renderReceiptCanvas();
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `usmania-order-${order.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (autoDownloaded.current) return;
    autoDownloaded.current = true;
    downloadReceipt().then(() => setShowThanks(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>✅</div>
        <p style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 600 }}>Order #{order.id} is ready to send</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>
          Your receipt image has been downloaded automatically. Send it to us on WhatsApp to confirm.
        </p>
      </div>

      <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.25)' }}>
        <Receipt ref={receiptRef} order={order} items={order.items} total={order.total} />
      </div>

      <button
        onClick={downloadReceipt}
        disabled={generating}
        style={{
          width: '100%',
          background: 'rgba(212,175,55,0.12)',
          border: '1px solid rgba(212,175,55,0.4)',
          color: '#D4AF37', borderRadius: '50px', padding: '14px 0',
          fontSize: '14px', fontWeight: 700, cursor: generating ? 'default' : 'pointer',
          opacity: generating ? 0.6 : 1,
        }}
      >
        {generating ? 'Generating…' : '⬇ Download Receipt Image Again'}
      </button>

      <button
        onClick={sendOnWhatsapp}
        disabled={sharing}
        style={{
          width: '100%',
          background: '#25D366',
          border: 'none',
          color: '#fff', borderRadius: '50px', padding: '14px 0',
          fontSize: '14px', fontWeight: 700, cursor: sharing ? 'default' : 'pointer',
          opacity: sharing ? 0.7 : 1,
        }}
      >
        {sharing ? 'Preparing…' : '💬 Send Order via WhatsApp'}
      </button>

      <a
        href={phoneToTel(content.business.phoneDisplay)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          width: '100%', boxSizing: 'border-box',
          background: 'transparent',
          border: '2px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
          borderRadius: '50px', padding: '13px 0',
          fontSize: '13px', fontWeight: 600,
        }}
      >
        📞 Or Call to Confirm: {content.business.phoneDisplay}
      </a>

      <button
        onClick={onClose}
        style={{
          background: 'none', border: 'none',
          color: 'rgba(255,255,255,0.4)', fontSize: '13px',
          cursor: 'pointer', padding: '4px 0',
        }}
      >
        Done
      </button>

      {showThanks && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-thanks-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 6500,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              width: 'min(360px, 100%)',
              background: '#1E1E1E',
              border: '1px solid rgba(212,175,55,0.35)',
              borderRadius: '18px',
              padding: '28px 24px',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'rgba(212,175,55,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <PartyPopper size={26} color="#D4AF37" />
            </div>
            <h3 id="order-thanks-title" style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF', fontSize: '19px', fontWeight: 700, margin: '0 0 8px' }}>
              Thank you for your order!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.6, margin: '0 0 22px' }}>
              We've downloaded your receipt as <strong style={{ color: '#D4AF37' }}>usmania-order-{order.id}.png</strong>.
              Please check it, then send it to us on WhatsApp or call to confirm your order.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={async () => { setShowThanks(false); await sendOnWhatsapp(); }}
                disabled={sharing}
                style={{
                  width: '100%',
                  background: '#25D366', border: 'none', color: '#fff',
                  borderRadius: '50px', padding: '13px 0',
                  fontSize: '14px', fontWeight: 700, cursor: sharing ? 'default' : 'pointer',
                  opacity: sharing ? 0.7 : 1,
                }}
              >
                💬 Send via WhatsApp
              </button>
              <button
                onClick={onClose}
                style={{
                  width: '100%',
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.75)',
                  borderRadius: '50px', padding: '12px 0',
                  fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
