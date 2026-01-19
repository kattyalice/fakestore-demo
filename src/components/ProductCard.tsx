import React from "react";
import type { Product } from "../types/types";
import { Rating } from "@smastrom/react-rating";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { addToCart, updateCart } from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
);

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
        {cartItem ? (
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() =>
                dispatch(
                  updateCart({
                    id: product.id,
                    count: cartItem.count -1,
                  })
                )
              }
              className="px-2 py-1 rounded-md border border-slate-300 hover:bg-slate-100"
            >
              -
            </button>

            <span className="min-w-6 text-center">
              {cartItem.count}
            </span>

            <button
              onClick={() =>
                dispatch(
                  updateCart({
                    id: product.id,
                    count: cartItem.count + 1,
                  })
                )
              }
              className="px-2 py-1 rounded-md border border-slate-300 hover:bg-slate-100"
            >
              +
            </button>
          </div>
        ):(
          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-3 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add to cart
          </button>
        )}





      </div>
    </div>  
  );
};

export default ProductCard;
