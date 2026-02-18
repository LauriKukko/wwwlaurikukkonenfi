import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../hooks/useContent';
import '../styles/LandingPage.css';

const ASCII_ART = `
.##......##.##......##.##......##.....##..........###....##.....##.########..####.##....##.##.....##.##....##.##....##..#######..##....##.########.##....##.....########.####
.##..##..##.##..##..##.##..##..##.....##.........##.##...##.....##.##.....##..##..##...##..##.....##.##...##..##...##..##.....##.###...##.##.......###...##.....##........##.
.##..##..##.##..##..##.##..##..##.....##........##...##..##.....##.##.....##..##..##..##...##.....##.##..##...##..##...##.....##.####..##.##.......####..##.....##........##.
.##..##..##.##..##..##.##..##..##.....##.......##.....##.##.....##.########...##..#####....##.....##.#####....#####....##.....##.##.##.##.######...##.##.##.....######....##.
.##..##..##.##..##..##.##..##..##.....##.......#########.##.....##.##...##....##..##..##...##.....##.##..##...##..##...##.....##.##..####.##.......##..####.....##........##.
.##..##..##.##..##..##.##..##..##.###.##.......##.....##.##.....##.##....##...##..##...##..##.....##.##...##..##...##..##.....##.##...###.##.......##...###.###.##........##.
..###..###...###..###...###..###..###.########.##.....##..#######..##.....##.####.##....##..#######..##....##.##....##..#######..##....##.########.##....##.###.##.......####
`;

function LandingPage({ onEnter }) {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggSeen, setEasterEggSeen] = useState(false);
  const navigate = useNavigate();
  const ui = useUI();
  const t = ui.landing;

  const goToMenu = useCallback(() => {
    onEnter();
    navigate('/menu');
  }, [onEnter, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (showEasterEgg) return;
        goToMenu();
      }

      if (e.key === 'Control') {
        if (showEasterEgg && easterEggSeen) {
          setShowEasterEgg(false);
          goToMenu();
        } else if (!showEasterEgg) {
          setShowEasterEgg(true);
          setEasterEggSeen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToMenu, showEasterEgg, easterEggSeen]);

  return (
    <main className="landing" role="main">
      <pre className="landing-ascii" aria-label="www.laurikukkonen.fi">
        {ASCII_ART}
      </pre>

      <p className="landing-welcome">{t.welcome}</p>
      <p className="landing-prompt">{t.prompt}</p>

      <button
        className="landing-enter-btn"
        onClick={goToMenu}
        aria-label="Enter site"
      >
        ENTER
      </button>

      <p className="landing-hint">{t.hint}</p>

      {showEasterEgg && (
        <div
          className="easter-egg-overlay"
          role="dialog"
          aria-label="Hidden message"
        >
          <div className="easter-egg-box">
            <h2>{t.easterEggTitle}</h2>
            <p>{t.easterEggP1}</p>
            <p>{t.easterEggP2}</p>
            <p>{t.easterEggP3}</p>
            <p className="egg-continue blink">{t.easterEggContinue}</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default LandingPage;
