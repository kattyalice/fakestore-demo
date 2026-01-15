import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const { user, profile } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-700 text-lg">
          Please log in.
        </p>
      </div>
    );
  }

  if (!profile) {
    return null; // wait for Firestore
  }

  if (!profile.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-700 text-lg">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-sm border border-slate-200 rounded-lg p-8">

        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">
          Admin Dashboard
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800">
            Welcome, {profile.name} 👋
          </h2>
          <p className="text-slate-600 mt-1">
            Admin Email: {profile.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/add-product"
            className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-md font-medium shadow"
          >
            ➕ Add New Product
          </Link>

          <Link
            to="/admin/products"
            className="block bg-slate-700 hover:bg-slate-800 text-white text-center py-4 rounded-md font-medium shadow"
          >
            📦 Manage Products
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
