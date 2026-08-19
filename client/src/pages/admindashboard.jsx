import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [troubleshootingCount, setTroubleshootingCount] = useState(0);
  const [partsCount, setPartsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("repairxAdmin");

    if (!storedAdmin) {
      navigate("/login");
      return;
    }

    setAdmin(JSON.parse(storedAdmin));

    const loadDashboardData = async () => {
      try {
        const [troubleshootingResponse, partsResponse] =
          await Promise.all([
            fetch("/api/troubleshooting"),
            fetch("/api/parts"),
          ]);

        const troubleshootingData =
          await troubleshootingResponse.json();

        const partsData =
          await partsResponse.json();

        setTroubleshootingCount(
          troubleshootingData.count || 0
        );

        setPartsCount(
          partsData.count || 0
        );
      } catch (error) {
        console.error(
          "Dashboard data error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("repairxAdmin");
    navigate("/login");
  };

  if (!admin || loading) {
    return (
      <div className="admin-loading">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <main className="admin-dashboard">

      <div className="admin-dashboard-container">

        {/* HEADER */}

        <div className="admin-header">

          <span className="admin-badge">
            🔐 Admin Panel
          </span>

          <h1>
            RepairX Dashboard
          </h1>

          <p>
            Welcome back, {admin.name}.
          </p>

        </div>


        {/* STATISTICS */}

        <div className="admin-stats">

          {/* TROUBLESHOOTING */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              🔧
            </div>

            <p className="admin-stat-label">
              Troubleshooting
            </p>

            <h2 className="admin-stat-number">
              {troubleshootingCount}
            </h2>

            <p className="admin-stat-description">
              Records in database
            </p>

          </div>


          {/* PARTS */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              🔩
            </div>

            <p className="admin-stat-label">
              Parts & Prices
            </p>

            <h2 className="admin-stat-number">
              {partsCount}
            </h2>

            <p className="admin-stat-description">
              Parts in database
            </p>

          </div>

        </div>


        {/* MANAGEMENT */}

        <div className="admin-management">

          <h2>
            Manage RepairX
          </h2>

          <p>
            Manage your troubleshooting information
            and parts database.
          </p>


          <div className="admin-actions">

            {/* TROUBLESHOOTING */}

            <button
              className="admin-btn admin-btn-primary"
              onClick={() =>
                navigate("/admin/troubleshooting")
              }
            >
              🔧 Manage Troubleshooting
            </button>


            {/* PARTS */}

            <button
              className="admin-btn admin-btn-secondary"
              onClick={() =>
                navigate("/admin/parts")
              }
            >
              🔩 Manage Parts & Prices
            </button>

          </div>

        </div>


        {/* LOGOUT */}

        <button
          className="admin-btn admin-btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </main>
  );
}

export default AdminDashboard;