import { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { defaultSiteContent } from '../data/siteContent';

const SITE_DOC = doc(db, 'content', 'site');

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(defaultSiteContent);

  useEffect(() => {
    const unsubscribe = onSnapshot(SITE_DOC, (snap) => {
      if (snap.exists()) {
        // Merge over defaults so newly added fields/sections aren't missing for existing saved content.
        setContent({ ...defaultSiteContent, ...snap.data() });
      } else {
        // Seeds Firestore with the built-in defaults the first time an admin is signed in;
        // anonymous visitors can't write, so this silently no-ops for them until then.
        setDoc(SITE_DOC, defaultSiteContent).catch(() => {});
      }
    });
    return unsubscribe;
  }, []);

  const persist = (next) => {
    setContent(next);
    setDoc(SITE_DOC, next);
  };

  const updateSection = (section, updates) => {
    persist({ ...content, [section]: { ...content[section], ...updates } });
  };

  const replaceSection = (section, value) => {
    persist({ ...content, [section]: value });
  };

  const addToList = (section, item) => {
    const id = Date.now();
    persist({ ...content, [section]: [...content[section], { ...item, id }] });
    return id;
  };

  const updateInList = (section, id, updates) => {
    persist({
      ...content,
      [section]: content[section].map(i => i.id === id ? { ...i, ...updates } : i),
    });
  };

  const removeFromList = (section, id) => {
    persist({ ...content, [section]: content[section].filter(i => i.id !== id) });
  };

  const addToNestedList = (section, key, item) => {
    const id = Date.now();
    persist({
      ...content,
      [section]: { ...content[section], [key]: [...content[section][key], { ...item, id }] },
    });
    return id;
  };

  const updateInNestedList = (section, key, id, updates) => {
    persist({
      ...content,
      [section]: {
        ...content[section],
        [key]: content[section][key].map(i => i.id === id ? { ...i, ...updates } : i),
      },
    });
  };

  const removeFromNestedList = (section, key, id) => {
    persist({
      ...content,
      [section]: { ...content[section], [key]: content[section][key].filter(i => i.id !== id) },
    });
  };

  const resetToDefaults = () => persist(defaultSiteContent);

  const value = {
    content,
    updateSection,
    replaceSection,
    addToList,
    updateInList,
    removeFromList,
    addToNestedList,
    updateInNestedList,
    removeFromNestedList,
    resetToDefaults,
  };

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used within a SiteContentProvider');
  return ctx;
}
