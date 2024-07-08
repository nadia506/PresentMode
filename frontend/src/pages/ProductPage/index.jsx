import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import CategoryNavigation from "../LandingPage/Sections/CategoryNavigation";
import CardItem from "../LandingPage/Sections/CardItem";

const ProductPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("ALL PRODUCTS");
  const limit = 8;
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchProducts = useCallback(
    async ({ skip, limit, loadMore = false }) => {
      let endpoint = "/products";
      const params = {
        skip,
        limit,
      };

      if (categoryId) {
        endpoint = `/products/category/${categoryId}?type=single`;
        setTitle(changeName(categoryId));
      } else {
        setTitle("ALL PRODUCTS");
      }

      try {
        const response = await axiosInstance.get(endpoint, { params });
        if (loadMore) {
          setProducts((prevProducts) => [
            ...prevProducts,
            ...response.data.products,
          ]);
        } else {
          setProducts(response.data.products);
        }
        setHasMore(response.data.hasMore);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    [categoryId]
  );

  useEffect(() => {
    fetchProducts({ skip: 0, limit });
  }, [categoryId, fetchProducts]);

  const changeName = (Id) => {
    const id = parseInt(Id);
    switch (id) {
      case 1:
        return "TOPS";
      case 2:
        return "BOTTOMS";
      case 3:
        return "COATS & JACKETS";
      case 4:
        return "SHOES";
      case 5:
        return "SWEATPANTS & SWEATSHIRTS";
      case 6:
        return "ACCESSORIES";
      default:
        return "ALL PRODUCTS";
    }
  };

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
    };
    fetchProducts(body);
    setSkip((prevSkip) => prevSkip + limit);
  };

  return (
    <section>
      <div className="text-center text-lg text-zinc-900 font-semibold">
        <h2 className="mt-10">{title}</h2>
      </div>
      <div className="hidden lg:block">
        <CategoryNavigation />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20 lg:mt-0">
        {products.map((product) => (
          <CardItem product={product} key={product._id} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 my-4 mt-5 text-white bg-gray-500 rounded-md hover:bg-black"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductPage;
