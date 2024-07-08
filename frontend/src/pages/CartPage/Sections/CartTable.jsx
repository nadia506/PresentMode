import React from "react";

const CartTable = ({ products, onRemoveItem, onUpdateQuantity }) => {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `${process.env.REACT_APP_SERVER_URL}/${image}`;
    }
  };

  const renderItems =
    products.length > 0 &&
    products.map((product) => (
      <tr key={product._id} className="border-b border-gray-200">
        <td className="p-4">
          <img
            className="w-[150px] h-[150px] object-cover"
            alt="product"
            src={renderCartImage(product.images)}
          />
        </td>
        <td className="p-4 text-center text-black">
          <input
            type="number"
            min="1"
            value={product.quantity}
            onChange={(e) => onUpdateQuantity(product._id, e.target.value)}
            className="w-9 text-center border border-gray-300 rounded-md bg-transparent"
          />
        </td>
        <td className="p-4 text-center text-black">
          $ {product.price.toFixed(2)}
        </td>
        <td className="p-4 text-center">
          <button
            onClick={() => onRemoveItem(product._id)}
            className="px-3 py-1 text-white bg-black rounded-md hover:bg-gray-700"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Product</th>
            <th className="p-4 text-center">Qty</th>
            <th className="p-4 text-center">Price</th>
            <th className="p-4 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>{renderItems}</tbody>
      </table>
    </div>
  );
};

export default CartTable;
