import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UpdateProfile: React.FC = () => {
  const { user, profile, updateProfileData } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  // Populate form once profile loads
  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setAddress(profile.address ?? "");
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !profile) {
      setMessage("User not found.");
      return;
    }

    try {
      await updateProfileData({
        name,
        address,
      });

      setMessage("Profile updated!");

      // Redirect back to profile after short delay
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch {
      setMessage("Error updating profile.");
    }
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-700">
          Please log in to update your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
          Update Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email (read-only) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-600 cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 inline-flex justify-center items-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Changes
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-slate-700">
            {message}
          </p>
        )}

        {/* Back */}
        <button
          onClick={() => navigate("/profile")}
          className="mt-6 w-full px-4 py-2 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
