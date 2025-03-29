import React, { useState,useEffect } from "react";
import axios from "axios";
import { fetchMovieDetails } from "../utils/rating_api";
import { FaWhatsapp, FaTwitter, FaFacebook,FaCopy } from "react-icons/fa";

const MovieCard = ({ movie, addToWatchlist, removeFromWatchlist, isWatchlist ,isDarkMode}) => {
const [trailerUrl, setTrailerUrl] = useState(null);
const [loading, setLoading] = useState(false);

const fetchTrailer = async (movieTitle) => {
  try {
    const response = await axios.get(`https://movie-gallery-fbwk.onrender.com/api/search`, {
      params: { query: `${movieTitle} official trailer` },
    });

    console.log("🎥 API Response:", response.data); // ✅ Debugging

    // ✅ Fix: Check if "id.videoId" exists in the response
    if (response.data && response.data.id && response.data.id.videoId) {
      const videoId = response.data.id.videoId;
      const trailerUrl = `https://www.youtube.com/watch?v=${videoId}`;

      // ✅ Open YouTube trailer in new tab
      window.open(trailerUrl, "_blank");
    } else {
      console.warn(`⚠️ No valid trailer found for: ${movieTitle}`);
    }
  } catch (error) {
    console.error("❌ Error fetching YouTube trailer:", error.response?.data || error.message);
  }
};

// When we hovered on movies posters
const [hovered, setHovered] = useState(false);

// gives the actual rating of movies
const [rating, setRating] = useState("N/A");

useEffect(() => {
  const getMovieRating = async () => {
    const data = await fetchMovieDetails(movie.imdbID);
    if (data && data.imdbRating) {
      setRating(data.imdbRating);
    }
  };

  getMovieRating();
}, [movie.imdbID]);

// share the movies url in social media
const { Title, Year, imdbID, Poster } = movie;

  const movieUrl = `https://www.imdb.com/title/${imdbID}`; // IMDb Link

  // Function to share on WhatsApp, Twitter, and Facebook
  const shareMovie = (platform) => {
    let shareUrl = "";
    const text = `Check out this movie: ${Title} (${Year}) ${movieUrl}`;

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(movieUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  const [copied, setCopied] = useState(false);
  // Function to copy the movie link
  const copyLink = () => {
    navigator.clipboard.writeText(movieUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset message after 2 sec
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    // <div className="border border-gray-800 rounded-lg shadow-lg p-4">

    // <div className={`movie-card ${isDarkMode ? "dark" : ""}`}>
    <div
      className="relative bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
        alt={movie.Title || "No Title"}
        className="w-full h-[28rem] object-cover rounded-lg"
      />

       {/* ✅ YouTube Trailer */}
        {/* {trailerId && (
        <YouTube videoId={trailerId} opts={{ width: "100%", height: "200px" }} />
      )} */}
      <h2 className="text-xl font-bold mt-2 text-orange-800">{movie.Title || "Unknown Title"}</h2>
      <p className="text-blue-300 font-bold">{movie.Year || "Unknown Year"}</p> 

 {/* 🔍 Fetch Trailer Button */}
  {/* Overlay for Hover Effect */}
  {hovered && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-center p-4 transition-opacity duration-300">
          <h2 className="text-xl font-bold">{movie.Title}</h2>
          <p className="text-sm">📅 Year: {movie.Year}</p>
          <p className="text-sm">⭐ Rating: {movie.imdbRating || "N/A" ? rating : "Not Avialable"}</p>
  <button
        onClick={() =>fetchTrailer(movie.Title)}
        className="bg-blue-500 text-white px-3 py-1 mt-2 rounded hover:bg-blue-600"
      >
        {loading ? "Loading..." : "Watch Trailer"}
      </button>

      {/* 🎥 Show Trailer Link */}
      {trailerUrl && (
        <a
          href={trailerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-blue-400 hover:underline"
        >
          🎥 Watch Trailer on YouTube
        </a>
      )} 

      {isWatchlist ? (
        <button
          className="bg-red-500 text-white px-4 py-2 mt-2 rounded-lg w-full hover:bg-red-700"
          onClick={() => removeFromWatchlist(movie.imdbID)}
        >
          Remove from Watchlist
        </button>
      ) : (
        <button
          className="bg-slate-800 text-white px-4 py-2 mt-2 rounded-lg w-full hover:bg-slate-700"
          onClick={() => addToWatchlist(movie)}
        >
          Add to Watchlist
        </button>
        
      )};

       {/* Share Buttons */}
       {/* <div className="share-buttons">
       <button className="whatsapp" onClick={() => shareMovie("whatsapp")}> <FaWhatsapp size={20} /> WhatsApp</button>
       <button className="twitter" onClick={() => shareMovie("twitter")}><FaTwitter size={20} /> Twitter</button>
       <button className="facebook" onClick={() => shareMovie("facebook")}><FaFacebook size={20} /> Facebook</button>
       <br />
       <br />
       <button className="copy" onClick={copyLink}>
          <FaCopy size={20} /> {copied ? "Copied!" : "Copy Link"}
        </button>
     </div> */}
<div className="share-buttons">
        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=Check out this movie: ${movieUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp"
        >
          <FaWhatsapp size={20} /> WhatsApp
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${movieUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="facebook"
        >
          <FaFacebook size={20} /> Facebook
        </a>

        {/* Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?url=${movieUrl}&text=Check out this movie!`}
          target="_blank"
          rel="noopener noreferrer"
          className="twitter"
        >
          <FaTwitter size={20} /> Twitter
        </a>

        {/* Copy Link */}
        <button className="copy" onClick={copyLink}>
          <FaCopy size={20} /> {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

        </div>
        
      )}
    </div>

  );
  
};
  

export default MovieCard;

