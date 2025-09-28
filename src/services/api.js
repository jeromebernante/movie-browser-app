const API_KEY = "e81fcfa4b26e7c5e91723c183e8ea3c1";
const BASE_URL = "https://api.themoviedb.org/3";

// Get popular movies
export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch popular movies");

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 🔍 Search movies
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1&include_adult=true`
    );
    if (!response.ok) throw new Error("Failed to search movies");

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get top rated movies
export const getTopRatedMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch top rated movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get upcoming movies
export const getUpcomingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch upcoming movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get now playing movies
export const getNowPlayingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch now playing movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get popular TV shows
export const getPopularTV = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch popular TV shows");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get top rated TV shows
export const getTopRatedTV = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch top rated TV shows");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get currently airing TV shows
export const getAiringTodayTV = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch airing today TV shows");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};


// Get trending (movies + TV)
export const getTrending = async (timeWindow = "week") => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/all/${timeWindow}?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch trending content");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};


// Latest Movies
export const getLatestMovies = async (page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    if (!res.ok) throw new Error("Failed to fetch latest movies");
    return await res.json();
  } catch (err) {
    console.error(err);
    return { results: [] };
  }
};


// Latest TV Shows
export const getLatestTV = async (page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    if (!res.ok) throw new Error("Failed to fetch latest tv shows");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { results: [] };
  }
};

// 🎥 Get Movie Details
export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error("Failed to fetch movie details");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
