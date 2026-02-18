import { useEffect } from 'react';

function Crosshair() {
  useEffect(() => {
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
