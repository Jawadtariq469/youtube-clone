import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

export const useScrollToTop = (): void => {
  const location = useLocation();

  useLayoutEffect(() => {
    const scrollToTop = (): void => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    };

    scrollToTop();

    /*
     * Run once more after the browser completes
     * the current layout.
     */
    const animationFrameId = window.requestAnimationFrame(scrollToTop);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [location.key]);
};
