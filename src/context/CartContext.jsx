import { createContext, useContext, useMemo, useRef, useState } from 'react';

const CartContext = createContext(null);

const TOAST_DURATION_MS = 30000;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const toastSeq = useRef(0);

  const dismissToast = () => {
    clearTimeout(toastTimer.current);
    setToast(null);
  };

  const addItem = (dish) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === dish.id);
      if (existing) {
        return prev.map(i => i.id === dish.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: dish.id, name: dish.name, name_ur: dish.name_ur, price: dish.price, qty: 1 }];
    });

    toastSeq.current += 1;
    const seq = toastSeq.current;
    setToast({ name: dish.name, name_ur: dish.name_ur, seq });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast(t => (t && t.seq === seq ? null : t));
    }, TOAST_DURATION_MS);
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value = { items, addItem, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen, toast, dismissToast };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
