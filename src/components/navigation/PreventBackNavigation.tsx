import { useEffect } from 'react';

const PreventBackNavigation = () => {
  useEffect(() => {
    const handlePopState = () => {
      // Push the current state back to the history stack
      window.history.pushState(null, document.title);
    };

    // Push an initial state to prevent immediate back
    window.history.pushState(null, document.title);

    // Listen for the popstate event
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
};

export default PreventBackNavigation;