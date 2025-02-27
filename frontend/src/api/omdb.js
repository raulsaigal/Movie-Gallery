import axios from "axios";

const API_KEY = "9609ba4c"; // Use your OMDB API key
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (query = "Avengers") => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: query,      // 's' is for searching movies
        apikey: API_KEY
      }
    });
    return response.data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        i: id,      // 'i' is for fetching movie details by ID
        apikey: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
