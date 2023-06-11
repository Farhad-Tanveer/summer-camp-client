import React from "react";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const paymentHistory = useLoaderData();
  const { user } = useAuth();
  const filteredHistory = paymentHistory.filter(
    (item) => item.email === user.email
  );

  return (
    <div className=" w-full">
      <Helmet>
        <title>Sporty Summer | Payment History</title>
      </Helmet>
      <div>
        <div className=" uppercase font-semibold h-[60px] flex justify-evenly">
          <h3 className=" text-3xl">PAYMENT HISTORY</h3>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>TransactionId</th>
                <th>Class Name</th>
                <th>Purchase Date</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <td>{item.transactionId}</td>
                  </td>
                  <td>{item.itemName}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className="mr-1">&#8364;</span>
                    {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
