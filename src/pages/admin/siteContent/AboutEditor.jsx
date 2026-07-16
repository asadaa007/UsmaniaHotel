import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteContent } from '../../../lib/siteContentStore';
import { Field, TextArea } from './FieldInputs';
import { cardStyle, saveButtonStyle, dangerButtonStyle, addButtonStyle, labelStyle, fieldStyle } from './styles';

export default function AboutEditor() {
  const { content, updateSection } = useSiteContent();
  const [form, setForm] = useState(content.about);
  const [saved, setSaved] = useState(false);
  const set = (field) => (value) => { setForm(f => ({ ...f, [field]: value })); setSaved(false); };

  const setHighlight = (id, field, value) => {
    setForm(f => ({ ...f, highlights: f.highlights.map(h => h.id === id ? { ...h, [field]: value } : h) }));
    setSaved(false);
  };
  const addHighlight = () => {
    setForm(f => ({ ...f, highlights: [...f.highlights, { id: Date.now(), icon: '⭐', text: 'New highlight' }] }));
    setSaved(false);
  };
  const removeHighlight = (id) => {
    setForm(f => ({ ...f, highlights: f.highlights.filter(h => h.id !== id) }));
    setSaved(false);
  };

  const handleSave = () => {
    updateSection('about', form);
    setSaved(true);
  };

  return (
    <div style={{ ...cardStyle, display: 'grid', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <Field label="Eyebrow" value={form.eyebrow} onChange={set('eyebrow')} />
        <Field label="Heading" value={form.heading} onChange={set('heading')} />
        <Field label="Heading — highlighted word(s)" value={form.headingHighlight} onChange={set('headingHighlight')} />
        <Field label="Heading — after highlight" value={form.headingAfter} onChange={set('headingAfter')} />
      </div>
      <TextArea label="Story Paragraph 1" value={form.paragraph1} onChange={set('paragraph1')} rows={3} />
      <TextArea label="Story Paragraph 2" value={form.paragraph2} onChange={set('paragraph2')} rows={3} />
      <Field label="Photo URL" value={form.image} onChange={set('image')} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Field label="Circular Badge Text" value={form.badgeTop} onChange={set('badgeTop')} />
        <Field label="Gold Badge Text" value={form.badgeBottom} onChange={set('badgeBottom')} />
      </div>

      <div>
        <label style={labelStyle}>Highlights (4 short badges)</label>
        <div style={{ display: 'grid', gap: '8px' }}>
          {form.highlights.map(h => (
            <div key={h.id} style={{ display: 'flex', gap: '8px' }}>
              <input style={{ ...fieldStyle, width: '60px', flexShrink: 0 }} value={h.icon} onChange={e => setHighlight(h.id, 'icon', e.target.value)} />
              <input style={fieldStyle} value={h.text} onChange={e => setHighlight(h.id, 'text', e.target.value)} />
              <button onClick={() => removeHighlight(h.id)} aria-label="Remove highlight" style={dangerButtonStyle}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
        <button onClick={addHighlight} style={{ ...addButtonStyle, marginTop: '10px' }}><Plus size={14} /> Add Highlight</button>
      </div>

      <div>
        <button onClick={handleSave} style={saveButtonStyle}>Save About Section</button>
        {saved && <span style={{ color: '#4CAF50', fontSize: '12px', marginLeft: '12px' }}>Saved ✓</span>}
      </div>
    </div>
  );
}
