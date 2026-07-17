import { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// Optional checkout sides. Fixed set — admins edit the prices, not the list.
const defaultAddons = [
  { id: 'addon-roti', name: 'Bread / Roti', name_ur: 'چپاتی', price: 20 },
  { id: 'addon-raita', name: 'Raita', name_ur: 'رائیتہ', price: 60 },
  { id: 'addon-salad', name: 'Salad', name_ur: 'سلاد', price: 80 },
];

const ADDONS_DOC = doc(db, 'content', 'addons');

// Merge saved prices over the built-in list so the set of sides stays fixed
// even if the stored doc is partial or from an older shape.
function mergeAddons(saved) {
  if (!Array.isArray(saved)) return defaultAddons;
  return defaultAddons.map(def => {
    const match = saved.find(s => s.id === def.id);
    return match ? { ...def, price: Number(match.price) || def.price } : def;
  });
}

const AddonsContext = createContext(null);

export function AddonsProvider({ children }) {
  const [addons, setAddons] = useState(defaultAddons);

  useEffect(() => {
    const unsubscribe = onSnapshot(ADDONS_DOC, (snap) => {
      if (snap.exists() && Array.isArray(snap.data().items)) {
        setAddons(mergeAddons(snap.data().items));
      } else {
        setDoc(ADDONS_DOC, { items: defaultAddons }).catch(() => {});
      }
    });
    return unsubscribe;
  }, []);

  const updateAddonPrice = (id, price) => {
    const next = addons.map(a => a.id === id ? { ...a, price: Number(price) || 0 } : a);
    setAddons(next);
    setDoc(ADDONS_DOC, { items: next });
  };

  return (
    <AddonsContext.Provider value={{ addons, updateAddonPrice }}>
      {children}
    </AddonsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAddons() {
  const ctx = useContext(AddonsContext);
  if (!ctx) throw new Error('useAddons must be used within an AddonsProvider');
  return ctx;
}
