import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../stripe.css";
import { useDispatch, useSelector } from "react-redux";
import { resetOrder, selectorder } from "../features/order/orderSlice";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51Q22khFoe1OIUX47a3ckuJcB6HCfjKEkB2aQTvA8W51nT8B7l4dPmT3ziD7GYjfKmFmVgYjMjJgvaS5BcKMNCOeO00Lje9qipH");

export default function StripeCheckout() {
  const currentOrder = useSelector(selectorder);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");

  const orderId = currentOrder?.response?.id;
  const totalAmount = currentOrder?.response?.totalAmount ?? 0;
  const totalAmountInCents = Math.round(Number(totalAmount) * 100);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    if (!orderId) return;
    setPaymentError("");
    fetch(`${API_BASE}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ totalAmount: totalAmountInCents, orderId }),
    })
      .then((res) => {
        const contentType = res.headers.get("content-type");
        const isJson = contentType && contentType.includes("application/json");
        if (!res.ok) {
          if (isJson) return res.json().then((data) => Promise.reject(data));
          return Promise.reject({ error: res.statusText || "Payment setup failed" });
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setPaymentError(data.error);
          return;
        }
        setClientSecret(data.clientSecret || "");
        setDpmCheckerLink(data.dpmCheckerLink || "");
      })
      .catch((err) => {
        const message = err?.error || err?.message || "Unable to load payment form.";
        setPaymentError(message);
      });
  }, [orderId]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (!currentOrder?.response) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600">No order found. Please start from checkout.</p>
          <Link to="/checkout" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-medium">
            Go to Checkout
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => {
            dispatch(resetOrder());
            navigate("/checkout");
          }}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to checkout
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Order #</span>
                  <span className="font-medium text-gray-900">{orderId}</span>
                </div>
                <div className="flex justify-between text-gray-600 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="font-semibold text-gray-900">${Number(totalAmount).toFixed(2)}</span>
                </div>
              </div>
              <p className="mt-4 flex items-center text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure payment powered by Stripe
              </p>
            </div>
          </div>
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="Stripe flex flex-col items-center">
              {paymentError && (
                <div className="w-full max-w-md mb-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                  <p className="font-medium">Payment unavailable</p>
                  <p className="mt-1">{paymentError}</p>
                  {paymentError.toLowerCase().includes("not configured") && (
                    <p className="mt-2 text-amber-700">Add <code className="bg-amber-100 px-1 rounded">STRIPE_SECRET_KEY</code> to the backend <code className="bg-amber-100 px-1 rounded">.env</code> and restart the server.</p>
                  )}
                </div>
              )}
              {!clientSecret && !paymentError && (
                <p className="text-gray-500">Loading payment form…</p>
              )}
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm dpmCheckerLink={dpmCheckerLink} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
