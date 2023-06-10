import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import moment from "moment";

const CheckoutForm = ({ price, singleItem }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("payment method", paymentMethod);
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }

    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const transactionId = paymentIntent.id;

      // save payment information into the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
        quantity: singleItem.length,
        classItem: singleItem.classItemId,
        cartItem: singleItem._id,
        itemName: singleItem.className,
        classImage: singleItem.classImage,
      };
      fetch("http://localhost:3000/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertResult && data.deleteResult) {
            // Show success swal notification
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: "Your payment has been processed successfully.",
            }).then(() => {
              // Clear the checkout form
              elements.getElement(CardElement).clear();
            });
          } else {
            // Show error swal notification
            Swal.fire({
              icon: "error",
              title: "Payment Failed",
              text: "There was an error processing your payment.",
            });
          }
        });
    }
  };

  return (
    <div>
      <p>Your Amount: &euro; {price}</p>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          className=" text-black"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className=" text-red-500">{cardError}</p>}
    </div>
  );
};

export default CheckoutForm;
