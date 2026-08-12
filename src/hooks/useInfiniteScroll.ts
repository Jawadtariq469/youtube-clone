import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;

  /*
   * Re-arms the detector when locally visible
   * items or fetched items change.
   */
  resetKey?: string | number;
}

const LOAD_AHEAD_DISTANCE = 600;

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  resetKey,
}: UseInfiniteScrollOptions) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const sentinelElement = sentinelRef.current;

    if (!sentinelElement) {
      return;
    }

    let animationFrameId: number | null = null;
    let hasTriggered = false;

    const checkSentinelPosition = (): void => {
      animationFrameId = null;

      if (hasTriggered) {
        return;
      }

      /*
       * On mobile the sentinel is display:none because
       * mobile uses the Show more button.
       */
      if (sentinelElement.getClientRects().length === 0) {
        return;
      }

      const sentinelTop = sentinelElement.getBoundingClientRect().top;

      const loadMorePosition = window.innerHeight + LOAD_AHEAD_DISTANCE;

      if (sentinelTop > loadMorePosition) {
        return;
      }

      hasTriggered = true;
      onLoadMore();
    };

    const schedulePositionCheck = (): void => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(checkSentinelPosition);
    };

    /*
     * Check immediately because the user may already
     * be near or below the sentinel.
     */
    schedulePositionCheck();

    window.addEventListener('scroll', schedulePositionCheck, {
      passive: true,
    });

    window.addEventListener('resize', schedulePositionCheck);

    return () => {
      window.removeEventListener('scroll', schedulePositionCheck);

      window.removeEventListener('resize', schedulePositionCheck);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore, resetKey]);

  return sentinelRef;
};
