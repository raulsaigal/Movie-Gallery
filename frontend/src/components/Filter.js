import React, { useState } from "react";

const Filter = ({ movies, setFilteredMovies,selectedRating, setSelectedRating }) => {
  const [selectedYear, setSelectedYear] = useState("");

  // ✅ Generate years dynamically (1950 - 2025)
  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, index) => 1950 + index);

  // ✅ Handle filtering logic
  const handleFilter = () => {
    if (selectedYear) {
      const filtered = movies.filter((movie) => movie.Year.includes(selectedYear));
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies); // Reset if no filter is selected
    }
  };

  // if (!setSelectedRating) {
  //   console.error("setSelectedRating is not passed correctly!");
  // }

  return (
    <div className="flex justify-end items-center gap-4 mb-4 mt-2">
      {/* ✅ Year Selection Dropdown */}
      <select
        className="p-2 border rounded  bg-blue-950 text-white "
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* ✅ Apply Filter Button */}
      <button onClick={handleFilter} className="p-2 bg-blue-950 text-white rounded">
        Apply Filter
      </button>

      {/* <div className="filter-container">
      <label htmlFor="rating">Minimum IMDb Rating:</label>
      <select
        id="rating"
        value={selectedRating}
        onChange={(e) => setSelectedRating(e.target.value)}
      >
        <option value="0">All Ratings</option>
        <option value="5">5+</option>
        <option value="6">6+</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
        <option value="9">9+</option>
      </select>
    </div> */}

    </div>
  );
};

export default Filter;

// import React from "react";

// const Filter = ({ selectedYear, setSelectedYear, selectedRating, setSelectedRating }) => {
//   // Generate years dynamically (1950 - current year)
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: currentYear - 1949 }, (_, index) => 1950 + index);

//   return (
//     <div className="flex justify-end items-center gap-4 mb-4 mt-2">
//       {/* Year Selection Dropdown */}
//       <select
//         className="p-2 border rounded bg-blue-950 text-white"
//         value={selectedYear}
//         onChange={(e) => setSelectedYear(e.target.value)}
//       >
//         <option value="">All Years</option>
//         {years.map((year) => (
//           <option key={year} value={year}>
//             {year}
//           </option>
//         ))}
//       </select>

//       {/* IMDb Rating Selection Dropdown */}
//       <select
//         className="p-2 border rounded bg-blue-950 text-white"
//         value={selectedRating}
//         onChange={(e) => setSelectedRating(e.target.value)}
//       >
//         <option value="0">All Ratings</option>
//         <option value="5">5+</option>
//         <option value="6">6+</option>
//         <option value="7">7+</option>
//         <option value="8">8+</option>
//         <option value="9">9+</option>
//       </select>
//     </div>
//   );
// };

// export default Filter;
