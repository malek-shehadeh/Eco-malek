"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm from "../components/CheckoutForm";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch("/api/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }
        const data = await response.json();
        setCart(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.productId.price * item.quantity, 0)
      .toFixed(2);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cart.map((item) => (
            <div key={item.productId._id} className="mb-2">
              <p>
                {item.productId.name} - Quantity: {item.quantity}
              </p>
              <p>Price: ${(item.productId.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <p className="font-bold mt-4">Total: ${calculateTotal()}</p>
        </div>
        <CheckoutForm cart={cart} total={calculateTotal()} />
      </div>
    </div>
  );
}
