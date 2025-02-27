import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Filter from "./Filter";

const MovieList = ({ movies, addToWatchlist, removeFromWatchlist, isWatchlist = false ,isDarkMode,searchQuery}) => {
  const [movieList, setMovieList] = useState([]);


  const API_KEY = "9609ba4c";
  const BASE_URL = "https://www.omdbapi.com/";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}?s=${searchQuery}&apikey=${API_KEY}`);

        if (response.data.Search) {
          setMovieList(response.data.Search);

          // Check if a new movie is added
          const newMovie = response.data.Search[0];
          if (newMovie && newMovie.imdbID !== lastMovie?.imdbID) {
            showNotification(newMovie.Title);
            setLastMovie(newMovie);
          }
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  // ✅ Function to show browser notification
  const showNotification = (movieTitle) => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("🎬 New Movie Available!", {
          body: `Check out ${movieTitle} now!`,
          icon: "/favicon.ico",
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("🎬 New Movie Available!", {
              body: `Check out ${movieTitle} now!`,
              icon: "/favicon.ico",
            });
          }
        });
      }
    }
  };


  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("https://www.omdbapi.com/?s=Batman&apikey=YOUR_OMDB_API_KEY");
      if (response.data.Search) {
        const moviesWithDetails = await Promise.all(
          response.data.Search.map(async (movie) => {
            const details = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=YOUR_OMDB_API_KEY`);
            return { ...movie, ...details.data };
          })
        );
        setMovies(moviesWithDetails);
        setFilteredMovies(moviesWithDetails); // Initialize filtered movies
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          addToWatchlist={addToWatchlist}
          removeFromWatchlist={removeFromWatchlist}
          isWatchlist={isWatchlist}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
};

export default MovieList;
