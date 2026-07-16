import { useCart } from '../../context/CartContext';

export default function QtyControl({ dish, compact = false }) {
  const { items, addItem, updateQty } = useCart();
  const inCart = items.find(i => i.id === dish.id);

  if (!inCart) {
    return (
      <button
        onClick={(e) => { e.stopPropagation(); addItem(dish); }}
        aria-label={`Add ${dish.name} to cart`}
        style={{
          background: 'linear-gradient(135deg, #D4AF37, #A8890A)',
          color: '#1E1E1E',
          border: 'none',
          borderRadius: '50px',
          minHeight: '36px',
          padding: compact ? '6px 16px' : '10px 20px',
          fontSize: compact ? '12px' : '13px',
          fontWeight: 700,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        + Add
      </button>
    );
  }

  return (
    <div
      onClick={e => e.stopPropagation()}
      style={{
        display: 'flex', alignItems: 'center', gap: '4px',
        background: 'rgba(212,175,55,0.12)',
        border: '1px solid rgba(212,175,55,0.4)',
        borderRadius: '50px',
        padding: '2px',
      }}
    >
      <button
        onClick={() => updateQty(dish.id, inCart.qty - 1)}
        aria-label={`Decrease quantity of ${dish.name}`}
        style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '16px', fontWeight: 700, cursor: 'pointer', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >−</button>
      <span aria-live="polite" style={{ color: '#D4AF37', fontSize: '14px', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>{inCart.qty}</span>
      <button
        onClick={() => updateQty(dish.id, inCart.qty + 1)}
        aria-label={`Increase quantity of ${dish.name}`}
        style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '16px', fontWeight: 700, cursor: 'pointer', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >+</button>
    </div>
  );
}
