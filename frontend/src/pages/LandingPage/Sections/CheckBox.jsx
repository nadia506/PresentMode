import React from "react";

const CheckBox = ({ categories, checkedCategories, onFilters }) => {
  const handleToggle = (categoryId) => {
    const currentIndex = checkedCategories.indexOf(categoryId);
    const newChecked = [...checkedCategories];

    if (currentIndex === -1) {
      newChecked.push(categoryId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onFilters(newChecked);
  };

  return (
    <div className="p-2 mb-3 rounded-md">
      {categories?.map((category) => (
        <span className="mx-1" key={category._id}>
          <input
            type="checkbox"
            onChange={() => handleToggle(category._id)}
            checked={checkedCategories.indexOf(category._id) !== -1}
          />{" "}
          <label>{category.name}</label>
        </span>
      ))}
    </div>
  );
};

export default CheckBox;
