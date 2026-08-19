import { createAction } from '@reduxjs/toolkit';

import type { DownloadedVideo } from '../../utils/types';

export const videoDownloaded = createAction<DownloadedVideo>(
  'downloads/videoDownloaded',
);

export const downloadedVideoRemoved = createAction<string>(
  'downloads/downloadedVideoRemoved',
);

export const downloadsCleared = createAction('downloads/downloadsCleared');
