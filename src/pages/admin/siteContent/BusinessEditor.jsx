import { useState } from 'react';
import { useSiteContent } from '../../../lib/siteContentStore';
import { Field, TextArea } from './FieldInputs';
import { cardStyle, saveButtonStyle } from './styles';

export default function BusinessEditor() {
  const { content, updateSection } = useSiteContent();
  const [form, setForm] = useState(content.business);
  const [saved, setSaved] = useState(false);
  const set = (field) => (value) => { setForm(f => ({ ...f, [field]: value })); setSaved(false); };

  const handleSave = () => {
    updateSection('business', {
      ...form,
      ratingValue: Number(form.ratingValue),
      ratingCount: Number(form.ratingCount),
    });
    setSaved(true);
  };

  return (
    <div style={{ ...cardStyle, display: 'grid', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <Field label="Business Name" value={form.name} onChange={set('name')} />
        <Field label="Tagline / City" value={form.tagline} onChange={set('tagline')} />
        <Field label="Phone (display, e.g. +92 41 2641817)" value={form.phoneDisplay} onChange={set('phoneDisplay')} />
        <Field label="WhatsApp Number (digits only, e.g. 923020286286)" value={form.whatsappNumber} onChange={set('whatsappNumber')} />
        <Field label="Hours — Days" value={form.hoursDays} onChange={set('hoursDays')} />
        <Field label="Hours — Time" value={form.hoursTime} onChange={set('hoursTime')} />
        <Field label="Rating (e.g. 4.0)" type="number" value={form.ratingValue} onChange={set('ratingValue')} />
        <Field label="Rating Count" type="number" value={form.ratingCount} onChange={set('ratingCount')} />
      </div>
      <TextArea label="Address" value={form.address} onChange={set('address')} rows={2} />
      <Field label="Google Maps Link (Get Directions button)" value={form.mapsUrl} onChange={set('mapsUrl')} />
      <TextArea label="Google Maps Embed URL (iframe src)" value={form.mapsEmbedUrl} onChange={set('mapsEmbedUrl')} rows={3} />
      <div>
        <button onClick={handleSave} style={saveButtonStyle}>Save Business Info</button>
        {saved && <span style={{ color: '#4CAF50', fontSize: '12px', marginLeft: '12px' }}>Saved ✓</span>}
      </div>
    </div>
  );
}
