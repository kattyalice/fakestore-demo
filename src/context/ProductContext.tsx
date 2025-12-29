// src/context/ProductContext.tsx
import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Product } from "../types/types";

/* ---------------- TYPES ---------------- */

type ProductAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_SELECTED_CATEGORY"; payload: string }
  | { type: "DELETE_PRODUCT"; payload: string };

interface ProductState {
  products: Product[];
  selectedCategory: string;
}

interface ProductContextType extends ProductState {
  dispatch: React.Dispatch<ProductAction>;
}

/* ---------------- INITIAL STATE ---------------- */

const initialState: ProductState = {
  products: [],
  selectedCategory: "",
};

/* ---------------- REDUCER ---------------- */

const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "SET_SELECTED_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

/* ---------------- CONTEXT ---------------- */

const ProductContext = createContext<ProductContextType>({
  products: [],
  selectedCategory: "",
  dispatch: () => {},
});

/* ---------------- PROVIDER ---------------- */

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        selectedCategory: state.selectedCategory,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

/* ---------------- HOOK ---------------- */

export const useProductContext = () => {
  return useContext(ProductContext);
};
