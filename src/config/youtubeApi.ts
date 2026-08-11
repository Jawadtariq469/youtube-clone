import axios from 'axios';

const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

if (!youtubeApiKey) {
  throw new Error('VITE_YOUTUBE_API_KEY is missing.');
}

export const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',

  params: {
    key: youtubeApiKey,
  },
});
