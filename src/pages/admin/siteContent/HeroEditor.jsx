import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteContent } from '../../../lib/siteContentStore';
import { Field, TextArea } from './FieldInputs';
import { cardStyle, saveButtonStyle, dangerButtonStyle, addButtonStyle, labelStyle, fieldStyle } from './styles';

export default function HeroEditor() {
  const { content, updateSection } = useSiteContent();
  const [form, setForm] = useState(content.hero);
  const [saved, setSaved] = useState(false);
  const set = (field) => (value) => { setForm(f => ({ ...f, [field]: value })); setSaved(false); };

  const setImage = (i, value) => {
    setForm(f => ({ ...f, images: f.images.map((img, idx) => idx === i ? value : img) }));
    setSaved(false);
  };
  const addImage = () => { setForm(f => ({ ...f, images: [...f.images, ''] })); setSaved(false); };
  const removeImage = (i) => { setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) })); setSaved(false); };

  const handleSave = () => {
    updateSection('hero', { ...form, images: form.images.filter(Boolean) });
    setSaved(true);
  };

  return (
    <div style={{ ...cardStyle, display: 'grid', gap: '16px' }}>
      <Field label="Badge Text" value={form.badge} onChange={set('badge')} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <Field label="Heading — before highlight" value={form.headingBefore} onChange={set('headingBefore')} />
        <Field label="Heading — highlighted word(s)" value={form.headingHighlight} onChange={set('headingHighlight')} />
        <Field label="Heading — after highlight" value={form.headingAfter} onChange={set('headingAfter')} />
      </div>
      <TextArea label="Subtext" value={form.subtext} onChange={set('subtext')} rows={3} />

      <div>
        <label style={labelStyle}>Background Images (slideshow)</label>
        <div style={{ display: 'grid', gap: '8px' }}>
          {form.images.map((img, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px' }}>
              <input style={fieldStyle} value={img} onChange={e => setImage(i, e.target.value)} placeholder="https://..." />
              <button onClick={() => removeImage(i)} aria-label={`Remove image ${i + 1}`} style={dangerButtonStyle}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
        <button onClick={addImage} style={{ ...addButtonStyle, marginTop: '10px' }}><Plus size={14} /> Add Image</button>
      </div>

      <div>
        <button onClick={handleSave} style={saveButtonStyle}>Save Hero Section</button>
        {saved && <span style={{ color: '#4CAF50', fontSize: '12px', marginLeft: '12px' }}>Saved ✓</span>}
      </div>
    </div>
  );
}
