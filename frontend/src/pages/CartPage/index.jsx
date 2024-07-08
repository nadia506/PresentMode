import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "../../store/thunkFunctions";
import CartTable from "./Sections/CartTable";

const CartPage = () => {
  const userData = useSelector((state) => state.user?.userData);
  const cartDetail = useSelector((state) => state.user?.cartDetail);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cartItemIds = [];

    if (userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach((item) => {
        cartItemIds.push(item.id);
      });

      const body = {
        cartItemIds,
        userCart: userData.cart,
      };

      dispatch(getCartItems(body));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (cartDetail) {
      setProducts(cartDetail);
      calculateTotal(cartDetail);
    }
  }, [cartDetail]);

  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotal(total);
  };

  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    const newQuantity = parseInt(quantity, 10);
    const updatedProducts = products.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setProducts(updatedProducts);
    calculateTotal(updatedProducts);
    dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
  };

  const handlePaymentClick = () => {
    navigate("/payment", { state: { cartDetail: products, total } });
  };

  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">My Cart</h2>
      </div>

      {products?.length > 0 ? (
        <>
          <CartTable
            products={products}
            onRemoveItem={handleRemoveCartItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
          <div className="mt-10">
            <p>
              <span className="font-bold">Total:</span> $ {total.toFixed(2)}
            </p>
            <button
              className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
              onClick={handlePaymentClick}
            >
              CHECKOUT
            </button>
          </div>
        </>
      ) : (
        <p>Your shopping bag is empty.</p>
      )}
    </section>
  );
};

export default CartPage;
