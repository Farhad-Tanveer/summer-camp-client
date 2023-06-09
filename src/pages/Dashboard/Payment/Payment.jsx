import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const [cart] = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));

  return (
    <div className=" w-2/3 p-20">
      <div className=" text-center my-20">
        <h1 className=" text-5xl font-extrabold tracking-wider py-3">
          Payment
        </h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price} cart={cart}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
