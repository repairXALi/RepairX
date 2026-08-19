import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* =========================
            LOGO
        ========================= */}

        <Link to="/" className="navbar-logo">

          <div className="logo-icon">
            🔧
          </div>

          <div className="logo-text">
            <span className="logo-name">
              RepairX
            </span>

            <span className="logo-tagline">
              Mobile Repair Made Simple
            </span>
          </div>

        </Link>


        {/* =========================
            NAVIGATION
        ========================= */}

        <nav className="navbar-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/troubleshooting"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Troubleshoot
          </NavLink>

          <NavLink
            to="/parts"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Parts & Prices
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            About
          </NavLink>

        </nav>


        {/* =========================
            RIGHT ACTIONS
        ========================= */}

        <div className="navbar-actions">

          <Link
            to="/login"
            className="navbar-login"
          >
            Login
          </Link>

          <Link
            to="/login"
            className="navbar-cta"
          >
            Book a Repair
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;