import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteContent } from '../../../lib/siteContentStore';
import { TextArea } from './FieldInputs';
import { cardStyle, saveButtonStyle, dangerButtonStyle, addButtonStyle, labelStyle, fieldStyle } from './styles';

export default function FooterEditor() {
  const { content, updateSection, addToNestedList, updateInNestedList, removeFromNestedList } = useSiteContent();
  const { footer } = content;
  const [tagline, setTagline] = useState(footer.tagline);
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ ...cardStyle, display: 'grid', gap: '12px' }}>
        <TextArea label="Footer Tagline" value={tagline} onChange={v => { setTagline(v); setSaved(false); }} rows={2} />
        <div>
          <button onClick={() => { updateSection('footer', { tagline }); setSaved(true); }} style={saveButtonStyle}>Save Tagline</button>
          {saved && <span style={{ color: '#4CAF50', fontSize: '12px', marginLeft: '12px' }}>Saved ✓</span>}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Social Links</label>
        <div style={{ display: 'grid', gap: '8px' }}>
          {footer.socialLinks.map(s => (
            <div key={s.id} style={{ display: 'flex', gap: '8px' }}>
              <input style={{ ...fieldStyle, width: '50px', flexShrink: 0 }} value={s.icon} onChange={e => updateInNestedList('footer', 'socialLinks', s.id, { icon: e.target.value })} />
              <input style={fieldStyle} value={s.label} onChange={e => updateInNestedList('footer', 'socialLinks', s.id, { label: e.target.value })} placeholder="Label" />
              <input style={fieldStyle} value={s.href} onChange={e => updateInNestedList('footer', 'socialLinks', s.id, { href: e.target.value })} placeholder="URL" />
              <button onClick={() => removeFromNestedList('footer', 'socialLinks', s.id)} aria-label={`Remove ${s.label}`} style={dangerButtonStyle}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
        <button
          onClick={() => addToNestedList('footer', 'socialLinks', { icon: '🔗', label: 'New Link', href: '#' })}
          style={{ ...addButtonStyle, marginTop: '10px' }}
        ><Plus size={14} /> Add Social Link</button>
      </div>
    </div>
  );
}
