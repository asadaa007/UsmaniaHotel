import { useState } from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { useSiteContent } from '../../../lib/siteContentStore';
import { fieldStyle, dangerButtonStyle, addButtonStyle, cardStyle } from './styles';

function ReviewRow({ review }) {
  const { updateInList, removeFromList } = useSiteContent();
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={cardStyle}>
      <button
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        style={{
          width: '100%', boxSizing: 'border-box', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: 0,
        }}
      >
        <div style={{ textAlign: 'left', minWidth: 0 }}>
          <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{review.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{review.rating}★ · {review.date}</div>
        </div>
        <ChevronDown size={16} color="rgba(255,255,255,0.5)" style={{ transform: expanded ? 'rotate(180deg)' : 'none', flexShrink: 0 }} />
      </button>
      {expanded && (
        <div style={{ display: 'grid', gap: '8px', marginTop: '14px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input style={fieldStyle} value={review.name} onChange={e => updateInList('reviews', review.id, { name: e.target.value })} placeholder="Name" />
            <input style={{ ...fieldStyle, width: '80px', flexShrink: 0 }} value={review.date} onChange={e => updateInList('reviews', review.id, { date: e.target.value })} placeholder="Date" />
            <select style={{ ...fieldStyle, width: '70px', flexShrink: 0 }} value={review.rating} onChange={e => updateInList('reviews', review.id, { rating: Number(e.target.value) })}>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}★</option>)}
            </select>
          </div>
          <textarea style={{ ...fieldStyle, minHeight: '60px', resize: 'vertical' }} value={review.text} onChange={e => updateInList('reviews', review.id, { text: e.target.value })} />
          <button
            onClick={() => removeFromList('reviews', review.id)}
            style={{ ...dangerButtonStyle, width: 'auto', padding: '6px 14px', gap: '6px' }}
          ><Trash2 size={14} /> Delete Review</button>
        </div>
      )}
    </div>
  );
}

export default function ReviewsEditor() {
  const { content, addToList } = useSiteContent();

  return (
    <div style={{ display: 'grid', gap: '10px' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>{content.reviews.length} reviews</p>
      <button
        onClick={() => addToList('reviews', { name: 'New Customer', initial: 'NC', color: '#D4AF37', rating: 5, date: 'Just now', text: 'Great food!' })}
        style={addButtonStyle}
      ><Plus size={14} /> Add Review</button>
      <div style={{ display: 'grid', gap: '8px', maxHeight: '600px', overflowY: 'auto', paddingRight: '4px' }}>
        {content.reviews.map(r => <ReviewRow key={r.id} review={r} />)}
      </div>
    </div>
  );
}
