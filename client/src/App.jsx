import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Troubleshooting from "./pages/Troubleshooting";
import Parts from "./pages/Parts";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admindashboard";
import AdminTroubleshooting from "./pages/AdminTroubleshooting";
import AdminParts from "./pages/adminparts";

// ========================================
// PROTECTED ADMIN ROUTE
// ========================================

function ProtectedAdminRoute({ children }) {
  const admin = localStorage.getItem("repairxAdmin");

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  try {
    const adminData = JSON.parse(admin);

    if (!adminData || adminData.role !== "admin") {
      localStorage.removeItem("repairxAdmin");
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (error) {
    localStorage.removeItem("repairxAdmin");
    return <Navigate to="/login" replace />;
  }
}

// ========================================
// APP
// ========================================

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* =========================
            PUBLIC PAGES
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/troubleshooting"
          element={<Troubleshooting />}
        />

        <Route
          path="/parts"
          element={<Parts />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            PROTECTED ADMIN PAGES
        ========================= */}

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/troubleshooting"
          element={
            <ProtectedAdminRoute>
              <AdminTroubleshooting />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/parts"
          element={
            <ProtectedAdminRoute>
              <AdminParts />
            </ProtectedAdminRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;