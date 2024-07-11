import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import CategoryNavigation from "./Sections/CategoryNavigation";
import CardItem from "./Sections/CardItem";

const LandingPage = () => {
  const limit = 8;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
  });
  const [searchActive, setSearchActive] = useState(false); // State to manage search popup visibility

  useEffect(() => {
    fetchProducts({ skip: 0, limit });
  }, []);

  const fetchProducts = async ({
    skip,
    limit,
    loadMore = false,
    filters = {},
  }) => {
    const params = {
      skip,
      limit,
      filters,
    };

    try {
      const response = await axiosInstance.get("/products", { params });
      if (loadMore) {
        setProducts([...products, ...response.data.products]);
      } else {
        setProducts(response.data.products);
      }
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  return (
    <section className={searchActive ? "blur" : ""}>
      <div className="text-center text-lg text-zinc-900 font-semibold">
        <h2 className="mt-10">JUST IN</h2>
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
      {/* Search popup */}
      {searchActive && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
            <div className="absolute top-0 left-0 mt-2 ml-3"></div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default LandingPage;
