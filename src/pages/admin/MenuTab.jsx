import { useState } from 'react';
import { Trash2, Pencil, Plus, UtensilsCrossed } from 'lucide-react';
import { useMenuStore } from '../../lib/menuStore';
import { menuCategories } from '../../data/menu';
import { colors, font, cardStyle, fieldStyle, labelStyle, primaryButtonStyle, secondaryButtonStyle, iconButtonStyle, dangerButtonStyle } from './adminTheme';

const emptyForm = { name: '', name_ur: '', category: menuCategories[0], price: '', desc: '', image: '', badge: '' };

function ItemForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || emptyForm);
  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;
    onSave({ ...form, price: Number(form.price) });
  };

  return (
    <form onSubmit={handleSubmit} style={{
      ...cardStyle,
      display: 'grid',
      gap: '14px',
      marginBottom: '20px',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        <div>
          <label style={labelStyle}>Name (English) *</label>
          <input style={fieldStyle} value={form.name} onChange={update('name')} required />
        </div>
        <div>
          <label style={labelStyle}>Name (Urdu)</label>
          <input className="ur" style={fieldStyle} value={form.name_ur} onChange={update('name_ur')} />
        </div>
        <div>
          <label style={labelStyle}>Category</label>
          <select style={fieldStyle} value={form.category} onChange={update('category')}>
            {menuCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Price (Rs) *</label>
          <input type="number" min="0" style={fieldStyle} value={form.price} onChange={update('price')} required />
        </div>
        <div>
          <label style={labelStyle}>Badge (optional)</label>
          <input style={fieldStyle} value={form.badge} onChange={update('badge')} placeholder="🔥 Most Popular" />
        </div>
        <div>
          <label style={labelStyle}>Image URL (optional)</label>
          <input style={fieldStyle} value={form.image} onChange={update('image')} placeholder="https://..." />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Description (optional)</label>
        <textarea style={{ ...fieldStyle, minHeight: '60px', resize: 'vertical' }} value={form.desc} onChange={update('desc')} />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={primaryButtonStyle}>Save</button>
        <button type="button" onClick={onCancel} style={secondaryButtonStyle}>Cancel</button>
      </div>
    </form>
  );
}

const thStyle = { padding: '10px 16px', textAlign: 'left', color: colors.textMuted, fontSize: '11px', fontWeight: 600, letterSpacing: '0.3px', borderBottom: `1px solid ${colors.border}` };
const tdStyle = { padding: '10px 16px', verticalAlign: 'middle', borderBottom: `1px solid ${colors.borderLight}` };

export default function MenuTab() {
  const { menu, addItem, updateItem, deleteItem, resetToDefaults } = useMenuStore();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  return (
    <div style={{ fontFamily: font }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <p style={{ color: colors.textMuted, fontSize: '13px' }}>{menu.length} items</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => { if (confirm('Reset menu to the original default items? This discards any edits.')) resetToDefaults(); }}
            style={secondaryButtonStyle}
          >Reset to Defaults</button>
          <button
            onClick={() => { setAdding(true); setEditingId(null); }}
            style={primaryButtonStyle}
          ><Plus size={14} /> Add Item</button>
        </div>
      </div>

      {adding && (
        <ItemForm
          onSave={(item) => { addItem(item); setAdding(false); }}
          onCancel={() => setAdding(false)}
        />
      )}

      <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Item</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price</th>
                <th style={{ ...thStyle, width: '90px' }}></th>
              </tr>
            </thead>
            <tbody>
              {menu.map(item => (
                editingId === item.id ? (
                  <tr key={item.id}>
                    <td colSpan={4} style={{ padding: '14px 16px' }}>
                      <ItemForm
                        initial={item}
                        onSave={(updates) => { updateItem(item.id, updates); setEditingId(null); }}
                        onCancel={() => setEditingId(null)}
                      />
                    </td>
                  </tr>
                ) : (
                  <tr key={item.id}>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                          background: colors.surfaceHover, overflow: 'hidden',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {item.image ? (
                            <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <UtensilsCrossed size={16} color={colors.textMuted} />
                          )}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ color: colors.textPrimary, fontSize: '13px', fontWeight: 600 }}>{item.name}</div>
                          {item.name_ur && <div className="ur" style={{ color: colors.textMuted, fontSize: '12px' }}>{item.name_ur}</div>}
                        </div>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ color: colors.textSecondary, fontSize: '12px' }}>{item.category}</span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ color: colors.accent, fontWeight: 700, fontSize: '13px' }}>Rs {item.price}</span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => { setEditingId(item.id); setAdding(false); }}
                          aria-label={`Edit ${item.name}`}
                          style={iconButtonStyle}
                        ><Pencil size={14} /></button>
                        <button
                          onClick={() => { if (confirm(`Delete "${item.name}"?`)) deleteItem(item.id); }}
                          aria-label={`Delete ${item.name}`}
                          style={dangerButtonStyle}
                        ><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
