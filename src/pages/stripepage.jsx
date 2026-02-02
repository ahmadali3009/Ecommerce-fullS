import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { API_BASE } from "../config";
import "../stripe.css";
import { useSelector } from "react-redux";
import { selectorder } from "../features/order/orderSlice";
import CheckoutForm from "./CheckoutForm";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Q22khFoe1OIUX47a3ckuJcB6HCfjKEkB2aQTvA8W51nT8B7l4dPmT3ziD7GYjfKmFmVgYjMjJgvaS5BcKMNCOeO00Lje9qipH");

export default function StripeCheckout() {

    let currentOrder = useSelector(selectorder)
    console.log("stripepaymentorder" , currentOrder)
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const totalAmountInCents = Math.round(currentOrder.response.totalAmount * 100);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${API_BASE}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  totalAmount: totalAmountInCents, orderId:currentOrder.response.id  }),
    })
      .then((res) => res.json())
      .then((data) => { 
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
    {clientSecret && (
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    )}
  </div>
  );
}