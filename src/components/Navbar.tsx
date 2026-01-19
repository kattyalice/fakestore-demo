import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAppSelector } from "../redux/hooks";

const Navbar = () => {
  const { user, profile } = useAuth();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.count, 0)
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-bold text-slate-900 hover:text-blue-600"
          >
            FakeStore
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link to="/" className="hover:text-blue-600">Home</Link>

            <Link to="/cart" onClick={closeMenu} className="block px-2 py-1 hover:bg-slate-100">
              Cart
              {cartCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center bg-blue-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* ⭐ ADMIN LINK */}
            {profile?.isAdmin && (
              <Link
                to="/admin"
                className="hover:text-blue-600 font-semibold"
              >
                Admin
              </Link>
            )}

            {user ? (
              <>
                <Link to="/profile" className="hover:text-blue-600">Profile</Link>
                <Link to="/orders" className="hover:text-blue-600">Orders</Link>
                <Link to="/logout" className="text-red-600 hover:text-red-700">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="hover:text-blue-600">Register</Link>
                <Link
                  to="/login"
                  className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-2 text-sm font-medium text-slate-700">
            <Link to="/" onClick={closeMenu} className="block px-2 py-1 hover:bg-slate-100">
              Home
            </Link>

            <Link to="/cart" onClick={closeMenu} className="block px-2 py-1 hover:bg-slate-100">
              Cart
              {cartCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center bg-blue-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* ⭐ MOBILE ADMIN LINK */}
            {profile?.isAdmin && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="block px-2 py-1 hover:bg-slate-100 font-semibold"
              >
                Admin
              </Link>
            )}

            {user ? (
              <>
                <Link to="/profile" onClick={closeMenu} className="block px-2 py-1 hover:bg-slate-100">
                  Profile
                </Link>
                <Link to="/orders" onClick={closeMenu} className="block px-2 py-1 hover:bg-slate-100">
                  Orders
                </Link>
                <Link
                  to="/logout"
                  onClick={closeMenu}
                  className="block px-2 py-1 text-red-600 hover:bg-slate-100"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" onClick={closeMenu} className="block px-2 py-1 hover:bg-slate-100">
                  Register
                </Link>
                <Link to="/login" onClick={closeMenu} className="block px-2 py-1 hover:bg-slate-100">
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
