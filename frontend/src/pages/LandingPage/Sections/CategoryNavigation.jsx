import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../../utils/filterData";

const CategoryNavigation = () => {
  return (
    <div className="flex justify-center m-10">
      <ul className="flex gap-3">
        <li className="text-black hover:underline">
          <Link to="/">JUST IN</Link>
        </li>
        {categories.map((category) => (
          <li key={category.name}>
            <Link
              to={`/products/${category._id}`}
              className="text-black hover:underline"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryNavigation;
