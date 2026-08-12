const YOUTUBE_DURATION_PATTERN =
  /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;

export const getYoutubeDurationInSeconds = (duration: string): number => {
  const match = duration.match(YOUTUBE_DURATION_PATTERN);

  if (!match) {
    return 0;
  }

  const days = Number(match[1] ?? 0);
  const hours = Number(match[2] ?? 0);
  const minutes = Number(match[3] ?? 0);
  const seconds = Number(match[4] ?? 0);

  return days * 86_400 + hours * 3_600 + minutes * 60 + seconds;
};

export const formatYoutubeDuration = (duration: string): string => {
  const totalSeconds = getYoutubeDurationInSeconds(duration);

  const hours = Math.floor(totalSeconds / 3_600);

  const minutes = Math.floor((totalSeconds % 3_600) / 60);

  const seconds = totalSeconds % 60;

  const formattedSeconds = String(seconds).padStart(2, '0');

  if (hours > 0) {
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${minutes}:${formattedSeconds}`;
};
