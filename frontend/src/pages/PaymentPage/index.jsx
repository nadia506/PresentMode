// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { payProducts } from "../../store/thunkFunctions";
// import { useDispatch } from "react-redux";
// import { IoIosArrowRoundBack } from "react-icons/io";

// const PaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { cartDetail, total } = location.state || {};

//   const handlePayment = () => {
//     dispatch(payProducts({ cartDetail }));
//     navigate("/");
//   };

//   const handleBackToCart = () => {
//     navigate("/user/cart");
//   };

//   const renderCartImage = (images) => {
//     if (images.length > 0) {
//       let image = images[0];
//       return `${process.env.REACT_APP_SERVER_URL}/${image}`;
//     }
//   };

//   if (!cartDetail || !total) {
//     return <div>No items to checkout.</div>;
//   }

//   return (
//     <section className="max-w-4xl mx-auto p-4">
//       <div className="text-center mb-7">
//         <h2 className="text-2xl">Payment Page</h2>
//       </div>
//       <div className="bg-white p-5 rounded-lg shadow-md">
//         <button onClick={handleBackToCart} className=" py-2 text-[20px]">
//           <IoIosArrowRoundBack />
//         </button>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold">Order Summary</h3>
//           <ul className="mt-2">
//             {cartDetail.map((item) => (
//               <li
//                 key={item._id}
//                 className="flex justify-between py-2 border-b items-center"
//               >
//                 <img
//                   className="w-[100px] h-[100px] object-cover mr-4"
//                   alt="product"
//                   src={renderCartImage(item.images)}
//                 />
//                 <span className="flex-1">
//                   {item.title} x {item.quantity}
//                 </span>
//                 <span>${(item.price * item.quantity).toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="flex justify-between items-center mt-4">
//           <span className="font-bold">Total:</span>
//           <span className="text-lg font-semibold">${total.toFixed(2)}</span>
//         </div>
//         <div className="mt-6 text-center">
//           <button
//             onClick={handlePayment}
//             className="px-6 py-2 text-white bg-black rounded-md hover:bg-gray-700 mr-2"
//           >
//             Pay Now
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PaymentPage;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { payProducts } from "../../store/thunkFunctions";
import { useDispatch } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartDetail, total } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");

  const handlePayment = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Proceed with payment
      dispatch(payProducts({ cartDetail }));
      navigate("/");
    } else {
      setErrors(validationErrors);
    }
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

  const validateForm = () => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!cardNumber) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(cardNumber)) {
      errors.cardNumber = "Card number must be 16 digits";
    }
    if (!expiryDate) {
      errors.expiryDate = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      errors.expiryDate = "Expiry date must be in MM/YY format";
    }
    if (!cvv) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(cvv)) {
      errors.cvv = "CVV must be 3 or 4 digits";
    }
    if (!cardHolderName) {
      errors.cardHolderName = "Card holder name is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!state) {
      errors.state = "State is required";
    }
    if (!postalCode) {
      errors.postalCode = "Postal code is required";
    } else if (!/^\d{5}$/.test(postalCode)) {
      errors.postalCode = "Postal code must be 5 digits";
    }
    if (!country) {
      errors.country = "Country is required";
    }
    return errors;
  };

  if (!cartDetail || !total) {
    return <div>No items to checkout.</div>;
  }

  return (
    <section className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-7">
        <h2 className="text-2xl font-bold">Payment Page</h2>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-md">
        <button
          onClick={handleBackToCart}
          className="flex items-center py-2 text-[15px] text-black"
        >
          <IoIosArrowRoundBack className="mr-2" /> Back to Cart
        </button>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <ul className="divide-y divide-gray-200">
            {cartDetail.map((item) => (
              <li
                key={item._id}
                className="flex justify-between py-2 items-center"
              >
                <img
                  className="w-[80px] h-[80px] object-cover rounded-lg border"
                  alt="product"
                  src={renderCartImage(item.images)}
                />
                <div className="flex-1 ml-4">
                  <h4 className="text-md font-medium">{item.title}</h4>
                  <span className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </span>
                </div>
                <span className="text-md font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold">Total:</span>
          <span className="text-lg font-semibold">${total.toFixed(2)}</span>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="1234 Main St"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">{errors.address}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-black"
                placeholder="City"
              />
              {errors.city && (
                <span className="text-red-500 text-sm">{errors.city}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-black"
                placeholder="State"
              />
              {errors.state && (
                <span className="text-red-500 text-sm">{errors.state}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-black"
                placeholder="12345"
              />
              {errors.postalCode && (
                <span className="text-red-500 text-sm">
                  {errors.postalCode}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-black"
                placeholder="Country"
              />
              {errors.country && (
                <span className="text-red-500 text-sm">{errors.country}</span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Enter Payment Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-2">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-black"
                placeholder="1234 5678 9012 3456"
              />
              {errors.cardNumber && (
                <span className="text-red-500 text-sm">
                  {errors.cardNumber}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Expiry Date (MM/YY)</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-black"
                placeholder="MM/YY"
              />
              {errors.expiryDate && (
                <span className="text-red-500 text-sm">
                  {errors.expiryDate}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-black"
                placeholder="123"
              />
              {errors.cvv && (
                <span className="text-red-500 text-sm">{errors.cvv}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Card Holder Name</label>
              <input
                type="text"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-black"
                placeholder="John Doe"
              />
              {errors.cardHolderName && (
                <span className="text-red-500 text-sm">
                  {errors.cardHolderName}
                </span>
              )}
            </div>
          </div>
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
