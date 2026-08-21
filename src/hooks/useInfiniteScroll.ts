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

const SCROLLABLE_OVERFLOW_VALUES = new Set(['auto', 'scroll', 'overlay']);

const findScrollableAncestor = (element: HTMLElement): HTMLElement | null => {
  let currentElement = element.parentElement;

  while (
    currentElement &&
    currentElement !== document.body &&
    currentElement !== document.documentElement
  ) {
    const { overflowY } = window.getComputedStyle(currentElement);

    if (SCROLLABLE_OVERFLOW_VALUES.has(overflowY)) {
      return currentElement;
    }

    currentElement = currentElement.parentElement;
  }

  return null;
};

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

    const scrollableAncestor = findScrollableAncestor(sentinelElement);

    const scrollEventTarget: EventTarget = scrollableAncestor ?? window;

    let animationFrameId: number | null = null;

    let hasTriggered = false;

    const checkSentinelPosition = (): void => {
      animationFrameId = null;

      if (hasTriggered) {
        return;
      }

      /*
       * The sentinel is hidden on smaller screens
       * because they use a manual load-more button.
       */
      if (sentinelElement.getClientRects().length === 0) {
        return;
      }

      const sentinelTop = sentinelElement.getBoundingClientRect().top;

      const visibleAreaBottom = scrollableAncestor
        ? scrollableAncestor.getBoundingClientRect().bottom
        : window.innerHeight;

      const loadMorePosition = visibleAreaBottom + LOAD_AHEAD_DISTANCE;

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
     * Check immediately so enough content is loaded
     * to fill the selected scrollable column.
     */
    schedulePositionCheck();

    scrollEventTarget.addEventListener('scroll', schedulePositionCheck, {
      passive: true,
    });

    window.addEventListener('resize', schedulePositionCheck);

    return () => {
      scrollEventTarget.removeEventListener('scroll', schedulePositionCheck);

      window.removeEventListener('resize', schedulePositionCheck);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore, resetKey]);

  return sentinelRef;
};
