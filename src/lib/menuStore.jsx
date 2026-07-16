import { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { defaultMenu } from '../data/menu';

const MENU_DOC = doc(db, 'content', 'menu');

const MenuStoreContext = createContext(null);

export function MenuStoreProvider({ children }) {
  const [menu, setMenu] = useState(defaultMenu);

  useEffect(() => {
    const unsubscribe = onSnapshot(MENU_DOC, (snap) => {
      if (snap.exists() && Array.isArray(snap.data().items) && snap.data().items.length > 0) {
        setMenu(snap.data().items);
      } else {
        // Seeds Firestore with the built-in defaults the first time an admin is signed in;
        // anonymous visitors can't write, so this silently no-ops for them until then.
        setDoc(MENU_DOC, { items: defaultMenu }).catch(() => {});
      }
    });
    return unsubscribe;
  }, []);

  const persist = (items) => {
    setMenu(items);
    setDoc(MENU_DOC, { items });
  };

  const addItem = (item) => {
    const id = Date.now();
    persist([...menu, { ...item, id }]);
    return id;
  };

  const updateItem = (id, updates) => {
    persist(menu.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteItem = (id) => {
    persist(menu.filter(i => i.id !== id));
  };

  const resetToDefaults = () => persist(defaultMenu);

  return (
    <MenuStoreContext.Provider value={{ menu, addItem, updateItem, deleteItem, resetToDefaults }}>
      {children}
    </MenuStoreContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMenuStore() {
  const ctx = useContext(MenuStoreContext);
  if (!ctx) throw new Error('useMenuStore must be used within a MenuStoreProvider');
  return ctx;
}
