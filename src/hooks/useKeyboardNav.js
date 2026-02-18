import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Global keyboard shortcuts:
 * - Ctrl acts as Enter (submits forms, triggers navigation)
 * - F3 navigates back to main menu from any content page
 */
function useKeyboardNav() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // F3 => back to menu (unless already on landing or menu)
      if (e.key === 'F3') {
        e.preventDefault();
        if (location.pathname !== '/' && location.pathname !== '/menu') {
          navigate('/menu');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location.pathname]);
}

export default useKeyboardNav;
