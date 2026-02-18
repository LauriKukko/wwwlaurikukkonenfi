import React from 'react';
import { useLang } from '../hooks/useLang';

function LangToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <div className="lang-toggle" role="radiogroup" aria-label="Language">
      <button
        className={`lang-toggle-btn${lang === 'fi' ? ' active-fi' : ''}`}
        onClick={lang !== 'fi' ? toggleLang : undefined}
        aria-pressed={lang === 'fi'}
        aria-label="Suomi"
      >
        FIN
      </button>
      <span className="lang-toggle-sep">|</span>
      <button
        className={`lang-toggle-btn${lang === 'en' ? ' active-en' : ''}`}
        onClick={lang !== 'en' ? toggleLang : undefined}
        aria-pressed={lang === 'en'}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}

export default LangToggle;
