// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function OrderConfirmationPage() {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchLatestOrder() {
//       try {
//         const response = await fetch("/api/orders/latest");
//         if (!response.ok) {
//           throw new Error("Failed to fetch order");
//         }
//         const data = await response.json();
//         setOrder(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchLatestOrder();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!order) return <p>No order found</p>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
//       <p className="mb-2">Thank you for your order!</p>
//       <p className="mb-2">Order ID: {order._id}</p>
//       <p className="mb-4">Total Amount: ${order.totalAmount.toFixed(2)}</p>

//       <h2 className="text-xl font-semibold mt-4 mb-2">Order Details:</h2>
//       <ul className="list-disc pl-5 mb-4">
//         {order.products.map((item, index) => (
//           <li key={index}>
//             {item.product.name} - Quantity: {item.quantity} - Price: $
//             {(item.product.price * item.quantity).toFixed(2)}
//           </li>
//         ))}
//       </ul>

//       <h2 className="text-xl font-semibold mt-4 mb-2">Shipping Address:</h2>
//       <p>{order.shippingAddress.street}</p>
//       <p>
//         {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
//         {order.shippingAddress.zipCode}
//       </p>
//       <p className="mb-4">{order.shippingAddress.country}</p>

//       <h2 className="text-xl font-semibold mt-4 mb-2">Payment Information:</h2>
//       <p>Payment Method: {order.paymentMethod}</p>
//       <p className="mb-4">Payment Status: {order.stripePaymentStatus}</p>

//       <button
//         onClick={() => router.push("/")}
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Return to Home
//       </button>
//     </div>
//   );
// }
///////////////////////////
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchLatestOrder() {
      try {
        const response = await fetch("/api/orders/latest");
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestOrder();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!order) return <p>No order found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      <p className="mb-2">Thank you for your order!</p>
      <p className="mb-2">Order ID: {order._id}</p>
      <p className="mb-4">Total Amount: ${order.totalAmount.toFixed(2)}</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Order Details:</h2>
      <ul className="list-disc pl-5 mb-4">
        {order.products.map((item, index) => (
          <li key={index}>
            {item.product.name} - Quantity: {item.quantity} - Price: $
            {(item.product.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">Shipping Address:</h2>
      <p>{order.shippingAddress.street}</p>
      <p>
        {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
        {order.shippingAddress.zipCode}
      </p>
      <p className="mb-4">{order.shippingAddress.country}</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Payment Information:</h2>
      <p>Payment Method: {order.paymentMethod}</p>
      <p className="mb-4">Payment Status: {order.stripePaymentStatus}</p>

      <button
        onClick={() => router.push("/")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Return to Home
      </button>
    </div>
  );
}
