import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminparts.css";

const API_URL = "https://repairx.onrender.com/api/parts";

function AdminParts() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    compatibleDevices: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // CHECK ADMIN
  // =========================

  useEffect(() => {
    const storedAdmin = localStorage.getItem("repairxAdmin");

    if (!storedAdmin) {
      navigate("/login");
      return;
    }

    try {
      setAdmin(JSON.parse(storedAdmin));
    } catch (err) {
      console.error("Admin data error:", err);
      localStorage.removeItem("repairxAdmin");
      navigate("/login");
    }
  }, [navigate]);

  // =========================
  // LOAD PARTS
  // =========================

  useEffect(() => {
    if (!admin) return;

    loadParts();
  }, [admin]);

  const loadParts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to load parts"
        );
      }

      setParts(result.data || []);
    } catch (err) {
      console.error("Parts loading error:", err);
      setError("Unable to load parts.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FORM INPUT
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!form.name.trim()) {
      setError("Part name is required.");
      return;
    }

    if (!form.category.trim()) {
      setError("Category is required.");
      return;
    }

    try {
      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = isEditing ? "PUT" : "POST";

      const payload = {
        name: form.name.trim(),
        category: form.category.trim(),
        price: Number(form.price) || 0,
        compatibleDevices: form.compatibleDevices
          .split(",")
          .map((device) => device.trim())
          .filter(Boolean),
        description: form.description.trim(),
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            (isEditing
              ? "Failed to update part"
              : "Failed to add part")
        );
      }

      setMessage(
        isEditing
          ? "Part updated successfully."
          : "Part added successfully."
      );

      resetForm();
      loadParts();
    } catch (err) {
      console.error("Part save error:", err);
      setError(err.message || "Something went wrong.");
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (part) => {
    setEditingId(part._id);

    setForm({
      name: part.name || "",
      category: part.category || "",
      price: part.price || "",
      compatibleDevices: Array.isArray(
        part.compatibleDevices
      )
        ? part.compatibleDevices.join(", ")
        : part.compatibleDevices || "",
      description: part.description || "",
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this part?"
    );

    if (!confirmed) return;

    try {
      setMessage("");
      setError("");

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to delete part"
        );
      }

      setMessage("Part deleted successfully.");

      if (editingId === id) {
        resetForm();
      }

      loadParts();
    } catch (err) {
      console.error("Part delete error:", err);
      setError(err.message || "Failed to delete part.");
    }
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      compatibleDevices: "",
      description: "",
    });

    setEditingId(null);
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("repairxAdmin");
    navigate("/login");
  };

  // =========================
  // LOADING
  // =========================

  if (!admin || loading) {
    return (
      <main className="admin-parts-page">
        <div className="admin-parts-loading">
          Loading Parts Management...
        </div>
      </main>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <main className="admin-parts-page">

      <div className="admin-parts-container">

        {/* HEADER */}

        <div className="admin-parts-header">

          <div>
            <span className="admin-parts-badge">
              🔩 Admin Panel
            </span>

            <h1>
              Manage Parts & Prices
            </h1>

            <p>
              Add, update and remove repair parts
              from the RepairX database.
            </p>
          </div>

          <button
            className="admin-parts-back-btn"
            onClick={() => navigate("/admin")}
          >
            ← Dashboard
          </button>

        </div>

        {/* MESSAGE */}

        {message && (
          <div className="admin-parts-success">
            ✅ {message}
          </div>
        )}

        {error && (
          <div className="admin-parts-error">
            ❌ {error}
          </div>
        )}

        {/* FORM */}

        <section className="admin-parts-form-card">

          <div className="admin-parts-section-heading">

            <h2>
              {editingId
                ? "✏️ Edit Part"
                : "➕ Add New Part"}
            </h2>

            <p>
              Enter the part information below.
            </p>

          </div>

          <form
            className="admin-parts-form"
            onSubmit={handleSubmit}
          >

            <div className="admin-parts-form-grid">

              <div className="admin-parts-form-group">
                <label htmlFor="name">
                  Part Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Example: iPhone Battery"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="admin-parts-form-group">
                <label htmlFor="category">
                  Category
                </label>

                <input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="Example: Battery"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="admin-parts-form-group">
                <label htmlFor="price">
                  Price
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  placeholder="Example: 1500"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>


              <div className="admin-parts-form-group">
                <label htmlFor="compatibleDevices">
                  Compatible Devices
                </label>

                <input
                  id="compatibleDevices"
                  name="compatibleDevices"
                  type="text"
                  placeholder="iPhone 13, iPhone 14, iPhone 15"
                  value={form.compatibleDevices}
                  onChange={handleChange}
                />

                <small>
                  Separate multiple devices with commas.
                </small>
              </div>


              <div className="admin-parts-form-group admin-parts-full-width">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="Enter a short description..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

            </div>


            <div className="admin-parts-form-actions">

              <button
                type="submit"
                className="admin-parts-submit-btn"
              >
                {editingId
                  ? "💾 Update Part"
                  : "➕ Add Part"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="admin-parts-cancel-btn"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}

            </div>

          </form>

        </section>


        {/* PARTS LIST */}

        <section className="admin-parts-list-card">

          <div className="admin-parts-list-header">

            <div>
              <h2>
                Parts Database
              </h2>

              <p>
                Total parts: <strong>{parts.length}</strong>
              </p>
            </div>

            <button
              className="admin-parts-refresh-btn"
              onClick={loadParts}
            >
              🔄 Refresh
            </button>

          </div>


          {parts.length === 0 ? (

            <div className="admin-parts-empty">
              <div className="admin-parts-empty-icon">
                🔩
              </div>

              <h3>
                No parts found
              </h3>

              <p>
                Add your first repair part using
                the form above.
              </p>
            </div>

          ) : (

            <div className="admin-parts-table-wrapper">

              <table className="admin-parts-table">

                <thead>
                  <tr>
                    <th>Part</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Compatible Devices</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {parts.map((part) => (

                    <tr key={part._id}>

                      <td>
                        <strong>
                          {part.name}
                        </strong>

                        {part.description && (
                          <small>
                            {part.description}
                          </small>
                        )}
                      </td>

                      <td>
                        {part.category || "—"}
                      </td>

                      <td>
                        ₹{part.price || 0}
                      </td>

                      <td>
                        {Array.isArray(
                          part.compatibleDevices
                        )
                          ? part.compatibleDevices.join(
                              ", "
                            )
                          : part.compatibleDevices ||
                            "—"}
                      </td>

                      <td>

                        <div className="admin-parts-actions">

                          <button
                            className="admin-parts-edit-btn"
                            onClick={() =>
                              handleEdit(part)
                            }
                          >
                            ✏️ Edit
                          </button>

                          <button
                            className="admin-parts-delete-btn"
                            onClick={() =>
                              handleDelete(part._id)
                            }
                          >
                            🗑️ Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* LOGOUT */}

        <button
          className="admin-parts-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </main>
  );
}

export default AdminParts;