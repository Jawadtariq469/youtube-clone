import axios from 'axios';

export const searchSuggestionsApi = axios.create({
  baseURL: '/search-suggestions/complete/search',

  timeout: 5000,
});
