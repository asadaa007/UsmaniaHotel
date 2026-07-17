import { useMemo, useState } from 'react';
import { Trash2, Pencil, Plus, UtensilsCrossed, Search, Check } from 'lucide-react';
import { useMenuStore } from '../../lib/menuStore';
import { useAddons } from '../../lib/addonsStore';
import { menuCategories } from '../../data/menu';
import { colors, font, cardStyle, fieldStyle, labelStyle, primaryButtonStyle, secondaryButtonStyle, iconButtonStyle, dangerButtonStyle } from './adminTheme';

const emptyForm = { name: '', name_ur: '', category: menuCategories[0], price: '', desc: '', image: '', badge: '' };

function AddonRow({ addon }) {
  const { updateAddonPrice } = useAddons();
  const [value, setValue] = useState(String(addon.price));
  const [saved, setSaved] = useState(false);

  const dirty = value !== String(addon.price);

  const save = () => {
    if (!dirty) return;
    updateAddonPrice(addon.id, Number(value) || 0);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
      padding: '12px 14px', borderRadius: '10px',
      background: colors.surfaceAlt, border: `1px solid ${colors.border}`,
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ color: colors.textPrimary, fontSize: '13px', fontWeight: 600 }}>
          {addon.name} <span className="ur" style={{ color: colors.accent, fontSize: '13px' }}>{addon.name_ur}</span>
        </div>
        <div style={{ color: colors.textMuted, fontSize: '11px' }}>Optional checkout side</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <span style={{ color: colors.textMuted, fontSize: '12px' }}>Rs</span>
        <input
          type="number"
          min="0"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') save(); }}
          style={{ ...fieldStyle, width: '90px', padding: '7px 10px' }}
          aria-label={`Price for ${addon.name}`}
        />
        <button
          onClick={save}
          disabled={!dirty}
          style={{
            ...primaryButtonStyle,
            padding: '7px 12px',
            opacity: dirty ? 1 : 0.5,
            cursor: dirty ? 'pointer' : 'default',
          }}
        >
          {saved ? <><Check size={14} /> Saved</> : 'Save'}
        </button>
      </div>
    </div>
  );
}

function AddonsSection() {
  const { addons } = useAddons();
  return (
    <div style={{ ...cardStyle, marginBottom: '20px' }}>
      <h3 style={{ color: colors.textPrimary, fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>Checkout Sides</h3>
      <p style={{ color: colors.textMuted, fontSize: '12px', margin: '0 0 14px', lineHeight: 1.6 }}>
        Optional add-ons customers can include at checkout. Update the price and click Save.
      </p>
      <div style={{ display: 'grid', gap: '10px' }}>
        {addons.map(addon => <AddonRow key={addon.id} addon={addon} />)}
      </div>
    </div>
  );
}

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
  const { menu, addItem, updateItem, deleteItem } = useMenuStore();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  const filteredMenu = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return menu;
    return menu.filter(i =>
      i.name?.toLowerCase().includes(q) ||
      i.name_ur?.includes(search.trim()) ||
      i.category?.toLowerCase().includes(q)
    );
  }, [menu, search]);

  return (
    <div style={{ fontFamily: font }}>
      <AddonsSection />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '340px' }}>
          <Search size={15} color={colors.textMuted} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search dishes by name or category…"
            aria-label="Search menu items"
            style={{ ...fieldStyle, paddingLeft: '34px' }}
          />
        </div>
        <button
          onClick={() => { setAdding(true); setEditingId(null); }}
          style={primaryButtonStyle}
        ><Plus size={14} /> Add Item</button>
      </div>

      <p style={{ color: colors.textMuted, fontSize: '12px', margin: '0 0 12px' }}>
        {search ? `${filteredMenu.length} of ${menu.length} items` : `${menu.length} items`}
      </p>

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
              {filteredMenu.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '30px 16px', textAlign: 'center', color: colors.textMuted, fontSize: '13px' }}>
                    No dishes match “{search}”.
                  </td>
                </tr>
              )}
              {filteredMenu.map(item => (
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
