import { Plus, Trash2 } from 'lucide-react';
import { useSiteContent } from '../../../lib/siteContentStore';
import { fieldStyle, labelStyle, dangerButtonStyle, addButtonStyle, cardStyle } from './styles';

export default function StatsEditor() {
  const { content, updateInList, addToList, removeFromList } = useSiteContent();

  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      {content.stats.map(s => (
        <div key={s.id} style={{ ...cardStyle, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr)) auto', gap: '10px', alignItems: 'end' }}>
          <div>
            <label style={labelStyle}>Icon</label>
            <input style={fieldStyle} value={s.icon} onChange={e => updateInList('stats', s.id, { icon: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Value</label>
            <input type="number" style={fieldStyle} value={s.value} onChange={e => updateInList('stats', s.id, { value: Number(e.target.value) })} />
          </div>
          <div>
            <label style={labelStyle}>Suffix</label>
            <input style={fieldStyle} value={s.suffix} onChange={e => updateInList('stats', s.id, { suffix: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Label</label>
            <input style={fieldStyle} value={s.label} onChange={e => updateInList('stats', s.id, { label: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Sub-label</label>
            <input style={fieldStyle} value={s.sub} onChange={e => updateInList('stats', s.id, { sub: e.target.value })} />
          </div>
          <button onClick={() => removeFromList('stats', s.id)} aria-label={`Remove stat ${s.label}`} style={dangerButtonStyle}><Trash2 size={14} /></button>
        </div>
      ))}
      <button
        onClick={() => addToList('stats', { icon: '⭐', value: 0, suffix: '', label: 'New Stat', sub: '' })}
        style={addButtonStyle}
      ><Plus size={14} /> Add Stat</button>
    </div>
  );
}
