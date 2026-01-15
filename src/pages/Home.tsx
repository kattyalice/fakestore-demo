import { useEffect, useState } from "react";
import type { Product, Category } from "../types/types";
import ProductCard from "../components/ProductCard";
import { useProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getAllCategories } from "../services/productService";
import Hero from "../components/Hero";
import Fuse from "fuse.js";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { products, selectedCategory, dispatch } = useProductContext();

  // Fetch products
  const {
    data: productsData,
    isLoading: productsLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  useEffect(() => {
    if (productsData) {
      dispatch({ type: "SET_PRODUCTS", payload: productsData });
    }
  }, [dispatch, productsData]);

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // CATEGORY FILTER
  const filteredProducts = selectedCategory
    ? products.filter((product: Product) => product.category === selectedCategory)
    : products;

  // SEARCH STATES
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fuse.js config
  const fuse = new Fuse(products, {
    keys: ["title", "description", "category"],
    threshold: 0.3,
  });

  const finalProducts = () => {
    let result = filteredProducts;

    // APPLY SEARCH
    if (searchQuery.trim() !== "") {
      const searchResults = fuse.search(searchQuery);
      result = searchResults
        .map((res) => res.item)
        .filter((item) => filteredProducts.includes(item));
    }

    // APPLY SORTING
    if (sortOption === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sortOption === "title-az") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortOption === "title-za") {
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  };

  // Sorting
  const [sortOption, setSortOption] = useState("");

  return (
    <div className="w-full bg-slate-50">
      <Hero />

      {/* PAGE WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 justify-items-center">

        {/* FILTER BAR */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full sm:w-80 rounded-md border border-slate-300 px-3 py-2 text-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Search Button */}
          <button
            onClick={() => setSearchQuery(searchInput)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Search
          </button>
          
          {/* Sort Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full sm:w-52 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="title-az">Title: A → Z</option>
            <option value="title-za">Title: Z → A</option>
          </select>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) =>
              dispatch({
                type: "SET_SELECTED_CATEGORY",
                payload: e.target.value,
              })
            }
            className="w-full sm:w-64 rounded-md border border-slate-300 px-3 py-2 text-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categoriesData?.map((category: Category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Clear Button */}
          <button
            onClick={() => {
              dispatch({ type: "SET_SELECTED_CATEGORY", payload: "" });
              setSearchInput("");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-md bg-slate-600 text-white text-sm hover:bg-slate-700"
          >
            Clear Filter
          </button>


        </div>

        {/* LOADING STATE */}
        {productsLoading && (
          <div className="text-center text-lg font-medium text-slate-600">
            Loading products…
          </div>
        )}

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {finalProducts().map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
