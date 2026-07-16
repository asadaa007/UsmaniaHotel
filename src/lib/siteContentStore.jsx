import { createContext, useContext, useEffect, useState } from 'react';
import { defaultSiteContent } from '../data/siteContent';

const STORAGE_KEY = 'usmania_site_content_v1';

function loadContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSiteContent;
    const parsed = JSON.parse(raw);
    // Merge over defaults so newly added fields/sections aren't missing for existing saved content.
    return { ...defaultSiteContent, ...parsed };
  } catch {
    return defaultSiteContent;
  }
}

function persist(content) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(loadContent);

  useEffect(() => {
    persist(content);
  }, [content]);

  const updateSection = (section, updates) => {
    setContent(prev => ({ ...prev, [section]: { ...prev[section], ...updates } }));
  };

  const replaceSection = (section, value) => {
    setContent(prev => ({ ...prev, [section]: value }));
  };

  const addToList = (section, item) => {
    const id = Date.now();
    setContent(prev => ({ ...prev, [section]: [...prev[section], { ...item, id }] }));
    return id;
  };

  const updateInList = (section, id, updates) => {
    setContent(prev => ({
      ...prev,
      [section]: prev[section].map(i => i.id === id ? { ...i, ...updates } : i),
    }));
  };

  const removeFromList = (section, id) => {
    setContent(prev => ({ ...prev, [section]: prev[section].filter(i => i.id !== id) }));
  };

  const addToNestedList = (section, key, item) => {
    const id = Date.now();
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: [...prev[section][key], { ...item, id }] },
    }));
    return id;
  };

  const updateInNestedList = (section, key, id, updates) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: prev[section][key].map(i => i.id === id ? { ...i, ...updates } : i),
      },
    }));
  };

  const removeFromNestedList = (section, key, id) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: prev[section][key].filter(i => i.id !== id) },
    }));
  };

  const resetToDefaults = () => setContent(defaultSiteContent);

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
