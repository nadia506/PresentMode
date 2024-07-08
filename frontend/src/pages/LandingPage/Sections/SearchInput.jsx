import React from "react";

const SearchInput = ({ onSearch, searchTerm }) => {
  return (
    <div className="flex items-center justify-center mb-4">
      <input
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Search..."
        onChange={onSearch}
        value={searchTerm}
      />
      <button
        className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
