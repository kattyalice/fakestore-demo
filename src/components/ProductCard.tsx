import React from "react";
import type { Product } from "../types/types";
import { Rating } from "@smastrom/react-rating";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  return (
    <div className="w-full max-w-sm bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain bg-white p-4"
      />

      {/* Content */}
      <div className="p-6 text-center flex flex-col gap-3">
        {/* Category badge */}
        <span className="inline-block self-center text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          {product.category.toUpperCase()}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex justify-center">
          <Rating
            style={{ maxWidth: 100 }}
            value={product.rating.rate}
            readOnly
          />
        </div>

        {/* Price */}
        <p className="text-xl font-bold text-emerald-600">
          ${product.price}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-3">
          {product.description}
        </p>

        {/* Add to Cart */}
        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-2 inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add to cart
        </button>

      </div>
    </div>  
  );
};

export default ProductCard;
