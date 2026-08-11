const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

const viewCountFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const publishedDateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
});

export const formatViewCount = (viewCount: number): string => {
  return viewCountFormatter.format(viewCount);
};

export const formatPublishedDate = (publishedAt: string): string => {
  const publishedDate = new Date(publishedAt);

  if (Number.isNaN(publishedDate.getTime())) {
    return '';
  }

  return publishedDateFormatter.format(publishedDate);
};

export const formatPublishedAt = (publishedAt: string): string => {
  const publishedTime = new Date(publishedAt).getTime();

  if (Number.isNaN(publishedTime)) {
    return '';
  }

  const differenceInDays = Math.floor(
    (Date.now() - publishedTime) / MILLISECONDS_PER_DAY,
  );

  if (differenceInDays < 1) {
    return 'Today';
  }

  if (differenceInDays < 30) {
    return `${differenceInDays}d ago`;
  }

  if (differenceInDays < 365) {
    return `${Math.floor(differenceInDays / 30)}mo ago`;
  }

  return `${Math.floor(differenceInDays / 365)}y ago`;
};
