// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import OrderPlaced from "./pages/OrderPlaced";
import NewArrivals from "./pages/NewArrivals";
import Men from "./pages/Men";
import Women from "./pages/Women";
import TopBottomWear from "./pages/TopBottomWear";
import TShirts from "./pages/TShirts";
import Shirts from "./pages/Shirts";
import ProductDetail from "./pages/ProductDetail";

// Auth Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
  // Authentication state (from redux or localStorage)
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated) || false;

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/cart"
          element={isAuthenticated ? <Cart /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/checkout"
          element={isAuthenticated ? <Checkout /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/order-placed"
          element={isAuthenticated ? <OrderPlaced /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/new-arrivals"
          element={isAuthenticated ? <NewArrivals /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/men"
          element={isAuthenticated ? <Men /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/women"
          element={isAuthenticated ? <Women /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/top-bottom-wear"
          element={isAuthenticated ? <TopBottomWear /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/t-shirts"
          element={isAuthenticated ? <TShirts /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/shirts"
          element={isAuthenticated ? <Shirts /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/product/:id"
          element={isAuthenticated ? <ProductDetail /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
