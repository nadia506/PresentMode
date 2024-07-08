import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";

const categories = [
  { key: 1, value: "TOPS" },
  { key: 2, value: "BOTTOMS" },
  { key: 3, value: "COATS & JACKETS" },
  { key: 4, value: "SHOES" },
  { key: 5, value: "SWEATPANTS & SWEATSHIRTS" },
  { key: 6, value: "ACCESSORIES" },
];

export default function UploadProductPage() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    categories: 1,
    images: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      categories: Number(value),
    }));
  };

  const userData = useSelector((state) => state.user?.userData);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      writer: userData.id,
      ...product,
    };

    try {
      await axiosInstance.post("/products", body);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImages = (newImages) => {
    setProduct((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const handlePriceChange = (event) => {
    const { value } = event.target;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setProduct((prevState) => ({
        ...prevState,
        price: value,
      }));
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">Create a New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FileUpload images={product.images} onImageChange={handleImages} />

        <div>
          <label htmlFor="title" className="block font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium">
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label htmlFor="price" className="block font-medium">
            Product Price ($)
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={product.price}
            onChange={handlePriceChange}
            className="w-full px-4 py-2 mt-1 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Enter price in dollars"
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={product.categories}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 mt-1 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {categories.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-700"
          >
            CREATE
          </button>
        </div>
      </form>
    </section>
  );
}
