// import React, { useState } from "react";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// const CheckoutForm = ({ amount, onSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setProcessing(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error: backendError, clientSecret } = await fetch(
//       "/api/create-payment-intent",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount }),
//       }
//     ).then((res) => res.json());

//     if (backendError) {
//       setError(backendError.message);
//       setProcessing(false);
//       return;
//     }

//     const { error, paymentIntent } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       }
//     );

//     if (error) {
//       setError(error.message);
//       setProcessing(false);
//     } else if (paymentIntent.status === "succeeded") {
//       onSuccess(paymentIntent.id);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       {error && <div>{error}</div>}
//       <button type="submit" disabled={!stripe || processing}>
//         Pay
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;
////////////////////////

// "use client";

// import { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

// function CheckoutForm({ cart, total }) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     zipCode: "",
//     phoneNumber: "",
//   });

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!stripe || !elements) {
//       setLoading(false);
//       return;
//     }

//     const { error: stripeError, paymentMethod } =
//       await stripe.createPaymentMethod({
//         type: "card",
//         card: elements.getElement(CardElement),
//       });

//     if (stripeError) {
//       setError(stripeError.message);
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("/api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           paymentMethodId: paymentMethod.id,
//           amount: total * 100, // Convert to cents
//           products: cart.map((item) => ({
//             product: item.productId._id,
//             quantity: item.quantity,
//           })),
//           shippingAddress: formData,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Payment failed");
//       }

//       const { clientSecret } = await response.json();

//       const { error: confirmError } = await stripe.confirmCardPayment(
//         clientSecret
//       );

//       if (confirmError) {
//         throw new Error(confirmError.message);
//       }

//       // Clear the cart after successful payment
//       await fetch("/api/cart", { method: "DELETE" });

//       // Redirect to order confirmation page
//       window.location.href = "/order-confirmation";
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
// <div className="mb-4">
//   <label htmlFor="street" className="block mb-2">
//     Street
//   </label>
//   <input
//     type="text"
//     id="street"
//     name="street"
//     value={formData.street}
//     onChange={handleInputChange}
//     required
//     className="w-full p-2 border rounded"
//   />
// </div>
//       {/* Add similar input fields for city, state, country, zipCode, and phoneNumber */}
//       <div className="mb-4">
//         <label htmlFor="card-element" className="block mb-2">
//           Credit Card
//         </label>
//         <CardElement id="card-element" className="p-2 border rounded" />
//       </div>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
//       >
//         {loading ? "Processing..." : `Pay $${total}`}
//       </button>
//     </form>
//   );
// }

// export default function CheckoutFormWrapper(props) {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm {...props} />
//     </Elements>
//   );
// }
/////////////////////////////////
///////////////////////////////
"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm({ cart, total }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
  });

  const stripe = useStripe();
  const elements = useElements();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: parseInt(total * 100), // Convert to cents
          products: cart.map((item) => ({
            product: item.productId._id,
            quantity: item.quantity,
          })),
          shippingAddress: formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const { clientSecret } = await response.json();

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret);

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === "succeeded") {
        // Clear the cart after successful payment
        await fetch("/api/cart", { method: "DELETE" });

        // Redirect to order confirmation page
        window.location.href = "/order-confirmation";
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* /////////////// */}
      <div className="mb-4">
        <label htmlFor="street" className="block mb-2">
          Street
        </label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block mb-2">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="state" className="block mb-2">
          State
        </label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="country" className="block mb-2">
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="zipCode" className="block mb-2">
          Zip Code
        </label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      {/* ///////// */}

      <div className="mb-4">
        <label htmlFor="card-element" className="block mb-2">
          Credit Card
        </label>
        <CardElement id="card-element" className="p-2 border rounded" />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : `Pay $${total}`}
      </button>
    </form>
  );
}

export default function CheckoutFormWrapper(props) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}
