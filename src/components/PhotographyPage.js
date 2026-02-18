import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGallery from '../hooks/useOneDriveGallery';
import Carousel from './Carousel';
import { useContent, useUI } from '../hooks/useContent';
import { useLang } from '../hooks/useLang';
import '../styles/ContentPage.css';

function PhotographyPage({ embedded }) {
  const navigate = useNavigate();
  const { lang } = useLang();
  const { photos, loading, error } = useGallery(lang);
  const content = useContent();
  const ui = useUI();
  const t = ui.content;
  const data = content.photography;

  useEffect(() => {
    if (embedded) return;
    const handleKey = (e) => {
      if (e.key === 'F3') {
        e.preventDefault();
        navigate('/menu');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [embedded, navigate]);

  return (
    <article
      className="content-page"
      style={embedded ? { paddingTop: 0, minHeight: 'auto' } : undefined}
      aria-labelledby="title-photography"
    >
      <div className="content-panel">
        <div className="content-title-bar">
          {t.sectionPrefix} — {data.title}
        </div>
        <div className="content-body">
          <h1 className="content-title" id="title-photography">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="content-subtitle">{data.subtitle}</p>
          )}
          <div className="content-text">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {loading && (
            <p style={{ color: 'var(--text-dim)', marginTop: '20px' }}>
              {t.loadingFeed}
            </p>
          )}
          {error && (
            <p style={{ color: '#ff4444', marginTop: '20px' }}>
              {t.feedError} {error}
            </p>
          )}
          {!loading && !error && <Carousel photos={photos} />}

          {!embedded && (
            <button
              className="content-back-btn"
              onClick={() => navigate('/menu')}
            >
              {t.backButton}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default PhotographyPage;
