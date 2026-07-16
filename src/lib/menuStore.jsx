import { createContext, useContext, useEffect, useState } from 'react';
import { defaultMenu } from '../data/menu';

const STORAGE_KEY = 'usmania_menu_v1';

function loadMenu() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultMenu;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultMenu;
  } catch {
    return defaultMenu;
  }
}

function persistMenu(menu) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(menu));
}

const MenuStoreContext = createContext(null);

export function MenuStoreProvider({ children }) {
  const [menu, setMenu] = useState(loadMenu);

  useEffect(() => {
    persistMenu(menu);
  }, [menu]);

  const addItem = (item) => {
    const id = Date.now();
    setMenu(prev => [...prev, { ...item, id }]);
    return id;
  };

  const updateItem = (id, updates) => {
    setMenu(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteItem = (id) => {
    setMenu(prev => prev.filter(i => i.id !== id));
  };

  const resetToDefaults = () => setMenu(defaultMenu);

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
