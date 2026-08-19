import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Troubleshooting from "./pages/Troubleshooting";
import Parts from "./pages/Parts";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import AdminTroubleshooting from "./pages/AdminTroubleshooting";
import AdminParts from "./pages/AdminParts";

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
            ADMIN PAGES
        ========================= */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/troubleshooting"
          element={<AdminTroubleshooting />}
        />

        <Route
          path="/admin/parts"
          element={<AdminParts />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;