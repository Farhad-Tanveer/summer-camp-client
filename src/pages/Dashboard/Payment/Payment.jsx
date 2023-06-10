import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../../hooks/useCart";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    fetch(`https://summer-camp-server-seven.vercel.app/carts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItemData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const [cart] = useCart();

  if (!itemData) {
    return null;
  }
  const total = itemData.price;
  const price = parseFloat(total.toFixed(2));

  return (
    <div className=" w-2/3 p-20">
      <div className=" text-center my-20">
        <h1 className=" text-5xl font-extrabold tracking-wider py-3">
          Payment
        </h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price} singleItem={itemData}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
