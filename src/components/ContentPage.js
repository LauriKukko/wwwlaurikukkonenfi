import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleTable from './RoleTable';
import ActorPhotoFolder from './ActorPhotoFolder';
import { useUI } from '../hooks/useContent';
import '../styles/ContentPage.css';

function ContentPage({ data, sectionId, embedded, tables }) {
  const navigate = useNavigate();
  const ui = useUI();
  const t = ui.content;

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

  if (!data) return null;

  return (
    <article
      className="content-page"
      style={embedded ? { paddingTop: 0, minHeight: 'auto' } : undefined}
      aria-labelledby={`title-${sectionId}`}
    >
      <div className="content-panel">
        <div className="content-title-bar">
          {t.sectionPrefix} — {data.title}
        </div>
        <div className="content-body">
          <h1 className="content-title" id={`title-${sectionId}`}>
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

          {sectionId === 'actor' && <ActorPhotoFolder />}

          {tables && tables.length > 0 && (
            <div className="role-tables-section">
              {tables.map((tableData, i) => (
                <RoleTable key={i} data={tableData} />
              ))}
            </div>
          )}

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

export default ContentPage;
