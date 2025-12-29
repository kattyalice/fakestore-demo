import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await signOut(auth);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    };

    doLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen hero-noise flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur rounded-lg shadow-lg border border-slate-200 p-8 text-center max-w-sm w-full">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>

        <h1 className="text-xl font-semibold text-slate-900 mb-2">
          You’re signed out
        </h1>

        <p className="text-sm text-slate-600">
          Thanks for stopping by. Redirecting you home…
        </p>
      </div>
    </div>
  );
};

export default Logout;
