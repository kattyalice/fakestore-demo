import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getOrdersForUser } from "../services/orderService";
import type { Order } from "../services/orderService";
import { Link } from "react-router-dom";

const OrderHistory: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const data = await getOrdersForUser(user.uid);
      setOrders(data);
      setLoading(false);
    };

    loadOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <h2 className="text-lg font-medium text-slate-700 text-center">
          You must be logged in to view your orders.
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 text-lg">
          Loading your orders…
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <h3 className="text-lg text-slate-700">
          You have no past orders.
        </h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">
          Your Order History
        </h2>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200 rounded-lg shadow-sm p-5"
            >
              <h5 className="text-sm font-medium text-slate-900 mb-1">
                Order ID: {order.id}
              </h5>

              <p className="text-sm text-slate-600 mb-2">
                Placed on:{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <p className="text-sm font-semibold text-slate-900">
                Total: ${order.totalPrice.toFixed(2)}
              </p>

              <Link
                to={`/orders/${order.id}`}
                className="inline-flex mt-3 items-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
