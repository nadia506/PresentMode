import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const HistoryPage = () => {
  const userData = useSelector((state) => state.user?.userData);

  return (
    <section className="max-w-6xl mx-auto p-4">
      <div className="text-center mb-7">
        <h2 className="text-2xl font-semibold">Purchase History</h2>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4">Payment Id</th>
              <th className="p-4 text-center">Price</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4 text-center">Date of Purchase</th>
            </tr>
          </thead>

          <tbody>
            {userData?.history.map((item) => (
              <tr className="border-b hover:bg-gray-50" key={item.id}>
                <td className="p-4">{item.id}</td>
                <td className="p-4 text-center">${item.price.toFixed(2)}</td>
                <td className="p-4 text-center">{item.quantity}</td>
                <td className="p-4 text-center">
                  {dayjs(item.dateOfPurchase).format("YYYY-MM-DD HH:mm:ss")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HistoryPage;
