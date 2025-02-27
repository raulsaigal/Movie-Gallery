import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // ✅ Ensure watchlist is an array
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(Array.isArray(savedWatchlist) ? savedWatchlist : []);
  }, []);

  // ✅ Function to remove movie from watchlist
  const removeFromWatchlist = (imdbID) => {
    const updatedList = watchlist.filter((movie) => movie.imdbID !== imdbID);
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📌 Your Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-400 text-center">No movies added to watchlist yet.</p>
      ) : (
        <MovieList movies={watchlist} removeFromWatchlist={removeFromWatchlist} isWatchlist={true} />
      )}
    </div>
  );
};

export default Watchlist;




