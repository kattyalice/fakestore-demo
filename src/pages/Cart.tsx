import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeFromCart, updateCart, clearCart } from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.count, 0)
    .toFixed(2);

  const handleCheckout = async () => {
    if (!user) {
      alert("You must be logged in to checkout.");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cartItems,
        totalPrice: Number(totalPrice),
        createdAt: new Date().toISOString(),
      });

      dispatch(clearCart());
      setShowModal(false);
      setCheckedOut(true);

      setTimeout(() => setCheckedOut(false), 3000);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-slate-600">Your cart is empty.</p>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="divide-y divide-slate-200">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 py-4"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-slate-600">${item.price}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateCart({
                            id: item.id,
                            count: item.count - 1,
                          })
                        )
                      }
                      className="px-2 py-1 rounded-md border border-slate-300 hover:bg-slate-100"
                    >
                      −
                    </button>

                    <span className="min-w-\[24px\] text-center">
                      {item.count}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(
                          updateCart({
                            id: item.id,
                            count: item.count + 1,
                          })
                        )
                      }
                      className="px-2 py-1 rounded-md border border-slate-300 hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* TOTALS */}
            <div className="flex justify-between mt-6 text-slate-900 font-medium">
              <span>Total items: {totalItems}</span>
              <span>Total: ${totalPrice}</span>
            </div>

            {/* CHECKOUT */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Checkout
            </h3>

            <p className="text-slate-700 mb-6">
              You have {totalItems} item(s) totaling ${totalPrice}.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleCheckout}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {checkedOut && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-md shadow-lg">
          Thank you! Your order was placed and your cart is now empty.
        </div>
      )}
    </div>
  );
};

export default Cart;
