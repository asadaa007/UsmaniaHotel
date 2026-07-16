import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteContent } from '../../../lib/siteContentStore';
import { Field, TextArea } from './FieldInputs';
import { cardStyle, saveButtonStyle, dangerButtonStyle, addButtonStyle, labelStyle, fieldStyle } from './styles';

export default function WhyChooseUsEditor() {
  const { content, updateSection, addToNestedList, updateInNestedList, removeFromNestedList } = useSiteContent();
  const { whyChooseUs } = content;
  const [header, setHeader] = useState({ eyebrow: whyChooseUs.eyebrow, heading: whyChooseUs.heading, subtext: whyChooseUs.subtext });
  const [saved, setSaved] = useState(false);

  const saveHeader = () => { updateSection('whyChooseUs', header); setSaved(true); };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ ...cardStyle, display: 'grid', gap: '14px' }}>
        <Field label="Eyebrow" value={header.eyebrow} onChange={v => { setHeader(h => ({ ...h, eyebrow: v })); setSaved(false); }} />
        <Field label="Heading" value={header.heading} onChange={v => { setHeader(h => ({ ...h, heading: v })); setSaved(false); }} />
        <TextArea label="Subtext" value={header.subtext} onChange={v => { setHeader(h => ({ ...h, subtext: v })); setSaved(false); }} rows={2} />
        <div>
          <button onClick={saveHeader} style={saveButtonStyle}>Save Section Header</button>
          {saved && <span style={{ color: '#4CAF50', fontSize: '12px', marginLeft: '12px' }}>Saved ✓</span>}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Features</label>
        <div style={{ display: 'grid', gap: '10px' }}>
          {whyChooseUs.features.map(f => (
            <div key={f.id} style={{ ...cardStyle, display: 'grid', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input style={{ ...fieldStyle, width: '60px', flexShrink: 0 }} value={f.icon} onChange={e => updateInNestedList('whyChooseUs', 'features', f.id, { icon: e.target.value })} />
                <input style={fieldStyle} value={f.title} onChange={e => updateInNestedList('whyChooseUs', 'features', f.id, { title: e.target.value })} placeholder="Title" />
                <input type="color" style={{ width: '40px', flexShrink: 0, border: 'none', borderRadius: '6px' }} value={f.color} onChange={e => updateInNestedList('whyChooseUs', 'features', f.id, { color: e.target.value })} />
                <button onClick={() => removeFromNestedList('whyChooseUs', 'features', f.id)} aria-label={`Remove ${f.title}`} style={dangerButtonStyle}><Trash2 size={14} /></button>
              </div>
              <textarea style={{ ...fieldStyle, minHeight: '50px', resize: 'vertical' }} value={f.desc} onChange={e => updateInNestedList('whyChooseUs', 'features', f.id, { desc: e.target.value })} />
            </div>
          ))}
        </div>
        <button
          onClick={() => addToNestedList('whyChooseUs', 'features', { icon: '⭐', title: 'New Feature', desc: 'Description', color: '#D4AF37' })}
          style={{ ...addButtonStyle, marginTop: '10px' }}
        ><Plus size={14} /> Add Feature</button>
      </div>

      <div>
        <label style={labelStyle}>Services</label>
        <div style={{ display: 'grid', gap: '8px' }}>
          {whyChooseUs.services.map(s => (
            <div key={s.id} style={{ display: 'flex', gap: '8px' }}>
              <input style={{ ...fieldStyle, width: '60px', flexShrink: 0 }} value={s.icon} onChange={e => updateInNestedList('whyChooseUs', 'services', s.id, { icon: e.target.value })} />
              <input style={fieldStyle} value={s.label} onChange={e => updateInNestedList('whyChooseUs', 'services', s.id, { label: e.target.value })} />
              <button onClick={() => removeFromNestedList('whyChooseUs', 'services', s.id)} aria-label={`Remove ${s.label}`} style={dangerButtonStyle}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
        <button
          onClick={() => addToNestedList('whyChooseUs', 'services', { icon: '⭐', label: 'New Service' })}
          style={{ ...addButtonStyle, marginTop: '10px' }}
        ><Plus size={14} /> Add Service</button>
      </div>
    </div>
  );
}
