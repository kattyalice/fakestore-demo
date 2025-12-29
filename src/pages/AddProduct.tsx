// src/pages/AddProduct.tsx
import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "products"), product);
      alert("Product added!");

      setProduct({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
        rating: { rate: 0, count: 0 },
      });
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center pt-24 py-12 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Product Title
            </label>
            <input
              name="title"
              value={product.title}
              onChange={handleChange}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Price
            </label>
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={3}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Category
            </label>
            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Image URL
            </label>
            <input
              name="image"
              value={product.image}
              onChange={handleChange}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Rating Score */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Rating Score (max 5)
            </label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={product.rating.rate}
              onChange={(e) =>
                setProduct({
                  ...product,
                  rating: {
                    ...product.rating,
                    rate: parseFloat(e.target.value),
                  },
                })
              }
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Rating Count */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Rating Count
            </label>
            <input
              type="number"
              value={product.rating.count}
              onChange={(e) =>
                setProduct({
                  ...product,
                  rating: {
                    ...product.rating,
                    count: parseInt(e.target.value),
                  },
                })
              }
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 inline-flex justify-center items-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
