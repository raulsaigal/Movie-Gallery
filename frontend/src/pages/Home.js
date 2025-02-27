import React, { useEffect, useState } from "react";  
import axios from "axios";
import MovieList from "../components/MovieList";
import { FaSearch } from "react-icons/fa";
import Filter from "../components/Filter";

const API_KEY = "9609ba4c"; // Replace with your OMDB API key

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });
  const [query, setQuery] = useState("Batman"); // Default search term
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies(query);
  }, [query]);

  // ✅ Fetch movies from OMDB API
  const fetchMovies = async (searchQuery) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`);
      if (response.data.Search) {
        setMovies(response.data.Search);
        setFilteredMovies(response.data.Search);
        setError(null);
      } else {
        setMovies([]);
        setFilteredMovies([]);
        setError("No movies found! Try another search.");
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to fetch movies. Please try again.");
    }
  };

  // ✅ Add movie to Watchlist (Prevent Duplicates)
  const addToWatchlist = (movie) => {
    if (!watchlist.some((item) => item.imdbID === movie.imdbID)) {
      const updatedList = [...watchlist, movie];
      setWatchlist(updatedList);
      localStorage.setItem("watchlist", JSON.stringify(updatedList)); // Save to LocalStorage
    } else {
      console.log("⚠️ Movie already in watchlist!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🎬 Movie Recommendations</h1>

    {/* ✅ Search Bar with Icon */}
    <div className="flex items-center border rounded-lg p-2 bg-slate-800 dark:bg-gray-800">
        <input
          type="text"
          placeholder="Search Movies..."
          className="w-full p-2 bg-transparent text-gray-300 dark:text-white outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={(e) => e.key === "Enter" && fetchMovies()} // Press Enter to Search
        />
        <button
          onClick={fetchMovies}
          className="p-2 text-gray-600 dark:text-gray-300"
        >
          <FaSearch size={20} />
        </button>
      </div>

      {/* ✅ Filter Component */}
      <Filter movies={movies} setFilteredMovies={setFilteredMovies} />

      {/* ✅ Display Error Messages */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* ✅ Movie List */}
      <MovieList movies={filteredMovies} addToWatchlist={addToWatchlist} />
    </div>
  );
};

export default Home;
