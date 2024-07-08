import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/thunkFunctions";
const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart({ productId: product._id }));
  };

  return (
    <div>
      <ul>
        <li>
          <span className="text-3xl text-bold ">{product.title}</span>
        </li>
        <li className="pt-8 ">
          <span className=" font-semibold text-xl text-gray-900">price:</span> $
          {product.price}
        </li>

        <li className="pt-4 ">
          <span className="font-semibold text-gray-300"></span>{" "}
          {product.description}
        </li>
      </ul>

      <div className="mt-3">
        <button
          onClick={handleClick}
          className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-700"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
