import { useState } from 'react';
import { useSiteContent } from '../../../lib/siteContentStore';
import { Field, TextArea } from './FieldInputs';
import { cardStyle, saveButtonStyle } from './styles';

export default function OrderCtaEditor() {
  const { content, updateSection } = useSiteContent();
  const [form, setForm] = useState(content.orderCta);
  const [saved, setSaved] = useState(false);
  const set = (field) => (value) => { setForm(f => ({ ...f, [field]: value })); setSaved(false); };

  return (
    <div style={{ ...cardStyle, display: 'grid', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Field label="Heading" value={form.heading} onChange={set('heading')} />
        <Field label="Heading — highlighted" value={form.headingHighlight} onChange={set('headingHighlight')} />
      </div>
      <TextArea label="Subtext" value={form.subtext} onChange={set('subtext')} rows={2} />
      <div>
        <button onClick={() => { updateSection('orderCta', form); setSaved(true); }} style={saveButtonStyle}>Save</button>
        {saved && <span style={{ color: '#4CAF50', fontSize: '12px', marginLeft: '12px' }}>Saved ✓</span>}
      </div>
    </div>
  );
}
