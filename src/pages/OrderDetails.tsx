import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { CartItem } from "../redux/cartSlice";

interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
}

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;

      const ref = doc(db, "orders", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data() as Omit<Order, "id">;
        setOrder({ id, ...data });
      }

      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 text-lg">Loading order…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-slate-700 text-lg mb-4">
          Order not found.
        </p>

        <Link
          to="/orders"
          className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Order Details
        </h2>

        {/* Order summary */}
        <div className="mb-6 text-sm text-slate-700 space-y-1">
          <p>
            <span className="font-medium">Order ID:</span> {order.id}
          </p>
          <p>
            <span className="font-medium">Placed on:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <p className="text-lg font-semibold text-slate-900 mt-2">
            Total: ${order.totalPrice.toFixed(2)}
          </p>
        </div>

        {/* Items */}
        <h3 className="text-lg font-semibold text-slate-900 mb-3">
          Items
        </h3>

        <div className="divide-y divide-slate-200 border border-slate-200 rounded-md">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4"
            >
              <div className="text-sm text-slate-700">
                <p className="font-medium text-slate-900">
                  {item.title}
                </p>
                <p>Quantity: {item.count}</p>
                <p>Price each: ${item.price}</p>
              </div>

              <div className="text-sm font-semibold text-slate-900">
                ${(item.price * item.count).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-6">
          <Link
            to="/orders"
            className="inline-flex items-center px-4 py-2 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            ← Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
