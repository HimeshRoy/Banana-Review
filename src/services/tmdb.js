import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export const tmdb = axios.create({
  baseURL: BASE_URL,
});

export const endpoints = {
  trending: `/trending/movie/week?api_key=${API_KEY}`,
  popular: `/movie/popular?api_key=${API_KEY}`,
  topRated: `/movie/top_rated?api_key=${API_KEY}`,
   trending: `/trending/movie/week?api_key=${API_KEY}`,
  upcoming: `/movie/upcoming?api_key=${API_KEY}`,

  movieDetails: (id) =>
  `/movie/${id}?api_key=${API_KEY}`,

movieVideos: (id) =>
  `/movie/${id}/videos?api_key=${API_KEY}`,

movieCredits: (id) =>
  `/movie/${id}/credits?api_key=${API_KEY}`,

similarMovies: (id) =>
  `/movie/${id}/similar?api_key=${API_KEY}`,

searchMovies: (query) =>
  `/search/movie?api_key=${API_KEY}&query=${query}`,
};