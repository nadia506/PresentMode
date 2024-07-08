import "./App.css";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunctions";
import ProtectedPage from "./pages/ProtectedPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";
import UploadProductPage from "./pages/UploadProductPage";
import DetailProductPage from "./pages/DetailProductPage";
import CartPage from "./pages/CartPage";
import HistoryPage from "./pages/HistoryPage";
import ProductPage from "./pages/ProductPage";
import PaymentPage from "./pages/PaymentPage";

function Layout() {
  return (
    <div className="flex flex-col justify-between h-screen ">
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      ></ToastContainer>
      <Navbar></Navbar>
      <main className="mb-auto w-10/12 max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />}></Route>
        <Route
          path="/product/:productId"
          element={<DetailProductPage />}
        ></Route>
        <Route path="/products/:categoryId/*" element={<ProductPage />}></Route>{" "}
        {/* Use wildcard * for nested routes */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/protected" element={<ProtectedPage />}></Route>
          <Route path="/product/upload" element={<UploadProductPage />}></Route>
          <Route path="/user/cart" element={<CartPage />}></Route>
          <Route path="/history" element={<HistoryPage />}></Route>
          <Route path="/payment" element={<PaymentPage />}></Route>
        </Route>
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
