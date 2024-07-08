import React, { useRef, useCallback } from "react";

const SearchInput = ({ onClose, onSearch, searchTerm }) => {
  const inputRef = useRef(null);

  const handleClickOutside = useCallback(
    (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        !e.target.closest(".search-result-item")
      ) {
        onClose();
      }
    },
    [onClose]
  );

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-4 w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        onChange={onSearch}
        value={searchTerm}
      />
    </div>
  );
};

export default SearchInput;
