import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserAuthProvider from "./context/AuthContext";
import Header from "./components/Header";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/admin/AdminPage";
import AddProduct from "./pages/admin/AddProduct";
import ProductsContextProvider from "./context/ProductsContext";
import ProductPage from "./pages/admin/ProductPage";
import AddService from "./pages/admin/AddService";
import ServicePage from "./pages/ServicePage";
import OrdersPage from "./pages/admin/OrdersPage";
import UserPage from "./pages/admin/UserPage";
import TutorialPage from "./pages/TutorialPage";
import PaymentPage from "./pages/PaymentPage";
import { ThemeProvider } from "./context/ThemeContext";
import ActiveOrdes from "./pages/admin/ActiveOrdes";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <UserAuthProvider>
      <ProductsContextProvider>
        <ThemeProvider>
          <Router>
            <Header />
            <Routes>
              <Route excat path="/" element={<HomePage />} />

              <Route excat path="my_orders" element={<MyOrdersPage />} />
              <Route excat path="/profile" element={<ProfilePage />} />
              <Route
                excat
                path="/service/:productSlug"
                element={<ServicePage />}
              />
              <Route excat path="/tutorial" element={<TutorialPage />} />
              <Route excat path="/payment" element={<PaymentPage />} />

              <Route excat path="/signup" element={<SignUpPage />} />
              <Route
                excat
                path="/login"
                element={
                  <ProtectedRoute>
                    <LoginPage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Panel */}
              <Route excat path="/home/admin" element={<AdminPage />} />
              <Route
                excat
                path="/home/admin/add_product"
                element={<AddProduct />}
              />
              <Route
                excat
                path="/home/admin/product/:productSlug/services"
                element={<ProductPage />}
              />
              <Route
                excat
                path="/home/admin/product/:productSlug/add_service"
                element={<AddService />}
              />
              <Route excat path="/home/admin/orders" element={<OrdersPage />} />
              <Route
                excat
                path="/home/admin/user/:userName"
                element={<UserPage />}
              />
              <Route
                excat
                path="/home/admin/active_orders"
                element={<ActiveOrdes />}
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </ProductsContextProvider>
    </UserAuthProvider>
  );
}

export default App;
