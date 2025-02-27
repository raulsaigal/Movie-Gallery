import React from "react";
// import Watchlist from "../components/Watchlist";
import Watchlist from "../components/WatchList";

const WatchlistPage = ({ watchlist, removeFromWatchlist }) => {
  return (
    <div className="p-6">
      {/* <h1 className="text-3xl font-bold text-center mb-6">📌 Your Watchlist</h1> */}
      <Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />
    </div>
  );
};

export default WatchlistPage;
