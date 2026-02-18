import { useEffect } from 'react';

function isMobileDevice() {
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

function Crosshair() {
  useEffect(() => {
    if (isMobileDevice()) return;

    const h = document.createElement('div');
    const v = document.createElement('div');
    h.id = 'crosshair-h';
    v.id = 'crosshair-v';
    document.body.appendChild(h);
    document.body.appendChild(v);

    const onMove = (e) => {
      h.style.top = e.clientY + 'px';
      v.style.left = e.clientX + 'px';
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      h.remove();
      v.remove();
    };
  }, []);

  return null;
}

export default Crosshair;
