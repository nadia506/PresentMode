import SearchInput from "./SearchInput";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/thunkFunctions";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import axiosInstance from "../../../utils/axios";

const routes = [
  { to: "/login", name: "LOG IN", auth: false, role: 0 },
  { to: "/register", name: "SIGN UP", auth: false, role: 0 },
  { to: "/product/upload", name: "UPLOAD", auth: true, role: 1 },
  { to: "/history", name: "MY ORDERS", auth: true, role: 0 },
  {
    to: "/user/cart",
    name: "Cart",
    auth: true,
    role: 0,
    icon: <AiOutlineShoppingCart style={{ fontSize: "1.4rem" }} />,
  },
];

const NavItem = ({ mobile }) => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const cart = useSelector((state) => state.user?.userData?.cart);
  const role = useSelector((state) => state.user?.userData.role);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async (searchTerm) => {
    try {
      const response = await axiosInstance.get("/products", {
        params: { searchTerm },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchTerm = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchProducts(value);
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchTerm("");
    setProducts([]);
  };

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

  const dispatch = useDispatch();

  return (
    <div>
      <ul
        className={`text-md justify-center w-full flex gap-4 ${
          mobile ? "flex-col bg-gray-900 h-full" : ""
        } items-center`}
      >
        <li>
          <Link onClick={toggleSearch}>SEARCH</Link>
        </li>
        {showSearch && (
          <div className="fixed inset-0 z-50 flex flex-col items-center backdrop-blur">
            <div className="relative w-full max-w-xl mt-20">
              <SearchInput
                onClose={closeSearch}
                searchTerm={searchTerm}
                onSearch={handleSearchTerm}
              />
              {products.length > 0 && (
                <div className="relative z-40 bg-white shadow-lg rounded-lg p-4 mt-2 max-h-96 overflow-y-auto">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="flex items-center gap-4 p-2 border-b hover:bg-gray-100 cursor-pointer search-result-item"
                    >
                      <img
                        className="w-16 h-16 object-cover"
                        src={`${process.env.REACT_APP_SERVER_URL}/${product.images[0]}`}
                        alt={product.title}
                      />
                      <div>
                        <h3 className="text-md font-semibold">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {routes.map(({ to, name, auth, role: requiredRole, icon }) => {
          if (isAuth !== auth) return null;
          if (auth && requiredRole !== undefined && role !== requiredRole) {
            return null;
          }

          if (icon) {
            return (
              <li
                className="relative py-1  px-1 text-center  cursor-pointer  border-zinc-900  text-zinc-900"
                key={name}
              >
                <Link to={to}>
                  {icon}
                  <span className="absolute mx-1 top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-black border-2 border-white rounded-full -right-3">
                    {cart?.length}
                  </span>
                </Link>
              </li>
            );
          } else {
            return (
              <li
                key={name}
                className="py-1 text-center cursor-pointer  border-zinc-900  text-zinc-900"
              >
                {name === "MY ORDERS" ? (
                  <Link to={to}>
                    <FaUserAlt />
                  </Link>
                ) : (
                  <Link to={to}>{name}</Link>
                )}
              </li>
            );
          }
        })}
        {isAuth && (
          <li
            key="sign-out"
            className="py-1 text-center  border-zinc-900 cursor-pointer  text-zinc-900"
          >
            <span onClick={handleLogout}>SIGN OUT</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavItem;
