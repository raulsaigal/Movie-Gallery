import axios from "axios";

const API_KEY = "9609ba4c";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);

    if (response.data && response.data.Response === "True") {
      return response.data;
    } else {
      console.error("Error: Movie details not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
