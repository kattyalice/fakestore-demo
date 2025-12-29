import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails";
import UpdateProfile from "./pages/UpdateProfile";

import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProducts from "./pages/ManageProducts";

const client = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <ProductProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>

                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />

                {/* Profile */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<UpdateProfile />} />

                {/* Orders */}
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/orders/:id" element={<OrderDetails />} />

                {/* Admin Protected Routes */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/add-product"
                  element={
                    <AdminRoute>
                      <AddProduct />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <ManageProducts />
                    </AdminRoute>
                  }
                />


                <Route
                  path="/admin/edit-product/:id"
                  element={
                    <AdminRoute>
                      <EditProduct />
                    </AdminRoute>
                  }
                />

                {/* Auth */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

              </Routes>
            </BrowserRouter>
          </ProductProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
