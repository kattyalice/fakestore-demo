import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useState } from "react";

const Profile: React.FC = () => {
  const { user, profile, logout } = useAuth();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!user || !profile) {
      setMessage("User not found.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", profile.id));
      await user.delete();
      setMessage("Account deleted.");
    } catch {
      setMessage("Error deleting account.");
    }
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <h2 className="text-lg text-slate-700">
          Please log in to view your profile.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-4 py-10">
      <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
          Your Profile
        </h1>

        {/* Profile Info */}
        <div className="space-y-4 text-sm text-slate-700">
          <div>
            <span className="font-medium text-slate-900">Name:</span>
            <p>{profile.name || "Not set"}</p>
          </div>

          <div>
            <span className="font-medium text-slate-900">Address:</span>
            <p>{profile.address || "Not set"}</p>
          </div>

          <div>
            <span className="font-medium text-slate-900">Email:</span>
            <p>{profile.email}</p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <p className="mt-4 text-sm text-center text-slate-700">
            {message}
          </p>
        )}

        {/* Actions */}
        <div className="mt-6 space-y-3">
          {/* ✅ Edit Profile */}
          <Link
            to="/profile/edit"
            className="w-full inline-flex justify-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
          >
            Edit Profile
          </Link>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full px-4 py-2 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Logout
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
