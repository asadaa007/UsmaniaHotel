import { Plus, Trash2 } from 'lucide-react';
import { useSiteContent } from '../../../lib/siteContentStore';
import { fieldStyle, dangerButtonStyle, addButtonStyle, cardStyle } from './styles';

export default function GalleryEditor() {
  const { content, updateInList, addToList, removeFromList } = useSiteContent();

  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      {content.gallery.map(img => (
        <div key={img.id} style={{ ...cardStyle, display: 'grid', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input style={fieldStyle} value={img.src} onChange={e => updateInList('gallery', img.id, { src: e.target.value })} placeholder="Image URL" />
            <button onClick={() => removeFromList('gallery', img.id)} aria-label="Remove image" style={dangerButtonStyle}><Trash2 size={14} /></button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input style={fieldStyle} value={img.alt} onChange={e => updateInList('gallery', img.id, { alt: e.target.value })} placeholder="Alt text / caption" />
            <select style={{ ...fieldStyle, width: '140px', flexShrink: 0 }} value={img.span} onChange={e => updateInList('gallery', img.id, { span: e.target.value })}>
              <option value="single">Single width</option>
              <option value="double">Double width</option>
            </select>
          </div>
        </div>
      ))}
      <button
        onClick={() => addToList('gallery', { src: '', alt: 'New photo', span: 'single' })}
        style={addButtonStyle}
      ><Plus size={14} /> Add Photo</button>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
        Photos need a direct image URL (e.g. from Unsplash or your own hosting).
      </p>
    </div>
  );
}
