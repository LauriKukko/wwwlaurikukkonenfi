import React, { createContext, useContext, useState, useEffect } from 'react';

const LangContext = createContext();

/**
 * Detects whether visitor is in Finland via a free IP geolocation API.
 * Falls back to 'en' on any error.
 */
async function detectCountry() {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.country_code === 'FI' ? 'fi' : 'en';
  } catch {
    try {
      const res = await fetch('https://ip2c.org/s', { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error();
      const text = await res.text();
      // Format: "1;FI;FIN;Finland"
      const parts = text.split(';');
      return parts[1] === 'FI' ? 'fi' : 'en';
    } catch {
      return 'en';
    }
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(null); // null = loading
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check if user previously chose a language
    const saved = localStorage.getItem('site-lang');
    if (saved === 'fi' || saved === 'en') {
      setLang(saved);
      setReady(true);
      return;
    }

    detectCountry().then((detected) => {
      setLang(detected);
      setReady(true);
    });
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'fi' ? 'en' : 'fi';
      localStorage.setItem('site-lang', next);
      return next;
    });
  };

  if (!ready) return null; // Brief blank while detecting

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
