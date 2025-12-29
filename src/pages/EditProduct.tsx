import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import type { Product } from "../types/types";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data() as Product;
        setProduct(data);

        setTitle(data.title);
        setPrice(String(data.price));
        setCategory(data.category);
        setDescription(data.description);
        setImage(data.image);
      } else {
        alert("Product not found!");
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = async () => {
    if (!id) return;

    const ref = doc(db, "products", id);

    await updateDoc(ref, {
      title,
      price: parseFloat(price),
      category,
      description,
      image,
    });

    alert("Product updated!");
    navigate("/");
  };

  const deleteProduct = async () => {
    if (!id) return;

    const ref = doc(db, "products", id);
    await deleteDoc(ref);

    alert("Product deleted!");
    navigate("/");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 text-lg">Loading product…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-4 py-10">
      <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
          Edit Product
        </h1>

        <div className="space-y-4">
          {/* Title */}
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Price */}
          <label>Price</label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Category */}
          <label>Caregory</label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Description */}
          <label>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Image */}
          <label>Image URL</label>
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={updateProduct}
            className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
          >
            Save Changes
          </button>

          <button
            onClick={deleteProduct}
            className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
