import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentPage from './ContentPage';
import PhotographyPage from './PhotographyPage';
import { useContent, useUI } from '../hooks/useContent';
import '../styles/MainMenu.css';
import '../styles/ContentPage.css';

const MENU_PATHS = ['/about', '/it', '/actor', '/photography'];
const MENU_IDS = ['about', 'it', 'actor', 'photography'];

function MainMenu() {
  const [commandInput, setCommandInput] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const content = useContent();
  const ui = useUI();
  const t = ui.menu;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const submitCommand = () => {
    const num = parseInt(commandInput, 10);
    if (num >= 1 && num <= 4) {
      navigate(MENU_PATHS[num - 1]);
    }
    setCommandInput('');
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    submitCommand();
  };

  const handleCommandKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Control') {
      e.preventDefault();
      submitCommand();
    }
  };

  const sectionData = {
    about: content.about,
    it: content.it,
    actor: content.actor,
  };

  return (
    <>
      <section className="main-menu" role="main" aria-label="Main Menu">
        <div className="menu-panel">
          <div className="menu-title-bar">
            <span>{t.titleBar}</span>
            <span>www.laurikukkonen.fi</span>
          </div>

          <div className="menu-body">
            <h1 className="menu-heading">{t.heading}</h1>
            <p className="menu-subheading">{t.subheading}</p>

            <ul className="menu-options" role="list">
              {t.items.map((label, i) => (
                <li
                  key={i}
                  className="menu-option"
                  role="listitem"
                  tabIndex={0}
                  onClick={() => handleMenuClick(MENU_PATHS[i])}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Control')
                      handleMenuClick(MENU_PATHS[i]);
                  }}
                >
                  <span className="menu-option-num">{i + 1}</span>
                  <span className="menu-option-label">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <form
            className="menu-command-line"
            onSubmit={handleCommandSubmit}
            role="search"
          >
            <label className="menu-command-label" htmlFor="cmd-input">
              {t.commandLabel}
            </label>
            <input
              id="cmd-input"
              ref={inputRef}
              className="menu-command-input"
              type="text"
              maxLength={1}
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleCommandKeyDown}
              aria-label="Enter option number 1-4"
              autoComplete="off"
            />
          </form>

          <p className="menu-footer">{t.footer}</p>
        </div>
      </section>

      {MENU_IDS.map((id, i) => (
        <React.Fragment key={id}>
          <div
            className="content-page"
            style={{ minHeight: 'auto', paddingTop: 0 }}
          >
            <div className="tron-divider">
              <span className="tron-divider-title">{t.items[i]}</span>
            </div>
          </div>
          <section id={id}>
            {id === 'photography' ? (
              <PhotographyPage embedded />
            ) : (
              <ContentPage
                data={sectionData[id]}
                sectionId={id}
                embedded
                tables={content.tables[id]}
              />
            )}
          </section>
        </React.Fragment>
      ))}
    </>
  );
}

export default MainMenu;
