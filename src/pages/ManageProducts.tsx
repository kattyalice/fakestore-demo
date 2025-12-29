import { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts, deleteProduct } from "../services/productService";
import { useNavigate, Link } from "react-router-dom";
import type { Product } from "../types/types";

const ManageProducts = () => {
  const navigate = useNavigate();
  const { products, dispatch } = useProductContext();

  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  useEffect(() => {
    if (productsData) {
      dispatch({ type: "SET_PRODUCTS", payload: productsData });
    }
  }, [productsData, dispatch]);

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);

    dispatch({
      type: "DELETE_PRODUCT",
      payload: productId,
    });
  };

  return (
    <div className="max-w-6xl mx-auto pt-24 px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

      <button
        onClick={() => navigate("/add-product")}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add Product
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow bg-white"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain"
            />

            <h2 className="font-medium mt-2">{product.title}</h2>
            <p className="text-sm text-slate-600 mb-2">
              {product.category}
            </p>
            <p className="font-semibold">${product.price}</p>

            <div className="mt-3 flex gap-3">
              <Link
                to={`/admin/edit-product/${product.id}`}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
