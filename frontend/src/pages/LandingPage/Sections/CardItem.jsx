import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider";

export default function CardItem({ product }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Link to={`/product/${product._id}`} className="text-center">
        <ImageSlider images={product.images} />
        <p className="mt-2">{product.title}</p>
        <p className="p-1 text-xs text-black-500">${product.price}</p>
      </Link>
    </div>
  );
}
