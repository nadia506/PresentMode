import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { payProducts } from "../../store/thunkFunctions";
import { useDispatch } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartDetail, total } = location.state || {};

  const handlePayment = () => {
    dispatch(payProducts({ cartDetail }));
    navigate("/");
  };

  const handleBackToCart = () => {
    navigate("/user/cart");
  };

  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `${process.env.REACT_APP_SERVER_URL}/${image}`;
    }
  };

  if (!cartDetail || !total) {
    return <div>No items to checkout.</div>;
  }

  return (
    <section className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-7">
        <h2 className="text-2xl">Payment Page</h2>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-md">
        <button onClick={handleBackToCart} className=" py-2 text-[20px]">
          <IoIosArrowRoundBack />
        </button>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <ul className="mt-2">
            {cartDetail.map((item) => (
              <li
                key={item._id}
                className="flex justify-between py-2 border-b items-center"
              >
                <img
                  className="w-[100px] h-[100px] object-cover mr-4"
                  alt="product"
                  src={renderCartImage(item.images)}
                />
                <span className="flex-1">
                  {item.title} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold">Total:</span>
          <span className="text-lg font-semibold">${total.toFixed(2)}</span>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handlePayment}
            className="px-6 py-2 text-white bg-black rounded-md hover:bg-gray-700 mr-2"
          >
            Pay Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
