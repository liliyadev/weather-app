import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2 mt-6">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
      />
      <button
        type="submit"
        className="bg-[#1e1e2f] text-[#00ffe0] border border-[#00ffe0] px-4 py-2 rounded-lg shadow-[0_0_10px_#00ffe0] hover:text-[#ff6ec7] transition duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
