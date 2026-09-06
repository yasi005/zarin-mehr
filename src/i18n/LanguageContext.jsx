import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'zarin_lang';

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function applyDocumentLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  document.documentElement.dataset.lang = lang;
  document.body.classList.toggle('lang-en', lang === 'en');
  document.body.classList.toggle('lang-fa', lang === 'fa');
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' || saved === 'fa' ? saved : 'fa';
  });

  const setLang = useCallback((next) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'fa' ? 'en' : 'fa');
  }, [lang, setLang]);

  const t = useCallback(
    (key, vars) => {
      const value = getByPath(translations[lang], key);
      if (typeof value !== 'string') {
        return key;
      }
      if (!vars) {
        return value;
      }
      return Object.entries(vars).reduce(
        (text, [name, replacement]) => text.replaceAll(`{${name}}`, String(replacement)),
        value,
      );
    },
    [lang],
  );

  const tList = useCallback(
    (key) => {
      const value = getByPath(translations[lang], key);
      return Array.isArray(value) ? value : [];
    },
    [lang],
  );

  useLayoutEffect(() => {
    applyDocumentLanguage(lang);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t,
      tList,
      dir: lang === 'fa' ? 'rtl' : 'ltr',
      isFa: lang === 'fa',
    }),
    [lang, setLang, toggleLang, t, tList],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
