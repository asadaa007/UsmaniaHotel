import { fieldStyle, labelStyle } from './styles';

export function Field({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} style={fieldStyle} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

export function TextArea({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <textarea style={{ ...fieldStyle, minHeight: `${rows * 22}px`, resize: 'vertical' }} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}
