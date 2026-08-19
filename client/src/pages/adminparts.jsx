import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminParts.css";

const emptyForm = {
  name: "",
  category: "",
  compatibleDevices: "",
  estimatedPrice: "",
  availability: "Available",
  description: "",
  technicianNotes: "",
  customerNotice:
    "Actual part availability and pricing may vary depending on the mobile model and part quality.",
};

function AdminParts() {
  const navigate = useNavigate();

  const [parts, setParts] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================
  // CHECK ADMIN LOGIN
  // =========================================

  useEffect(() => {
    const storedAdmin = localStorage.getItem("repairxAdmin");

    if (!storedAdmin) {
      navigate("/login");
      return;
    }

    fetchParts();
  }, [navigate]);

  // =========================================
  // FETCH PARTS
  // =========================================

  const fetchParts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/parts");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch parts"
        );
      }

      setParts(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // INPUT CHANGE
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================
  // TEXT ↔ ARRAY
  // =========================================

  const textToArray = (text) => {
    return text
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const arrayToText = (array) => {
    if (!Array.isArray(array)) {
      return "";
    }

    return array.join("\n");
  };

  // =========================================
  // ADD FORM
  // =========================================

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // EDIT FORM
  // =========================================

  const openEditForm = (part) => {
    setEditingId(part._id);

    setForm({
      name: part.name || "",

      category: part.category || "",

      compatibleDevices: arrayToText(
        part.compatibleDevices
      ),

      estimatedPrice:
        part.estimatedPrice || "",

      availability:
        part.availability || "Available",

      description:
        part.description || "",

      technicianNotes: arrayToText(
        part.technicianNotes
      ),

      customerNotice:
        part.customerNotice || "",
    });

    setMessage("");
    setError("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // ADD / UPDATE
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    const payload = {
      name: form.name.trim(),

      category: form.category.trim(),

      compatibleDevices: textToArray(
        form.compatibleDevices
      ),

      estimatedPrice:
        form.estimatedPrice.trim(),

      availability:
        form.availability.trim(),

      description:
        form.description.trim(),

      technicianNotes: textToArray(
        form.technicianNotes
      ),

      customerNotice:
        form.customerNotice.trim(),
    };

    try {
      const url = editingId
        ? `/api/parts/${editingId}`
        : "/api/parts";

      const method = editingId
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to save part"
        );
      }

      setMessage(
        editingId
          ? "Part updated successfully!"
          : "Part added successfully!"
      );

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await fetchParts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // DELETE
  // =========================================

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `/api/parts/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete part"
        );
      }

      setMessage(
        "Part deleted successfully!"
      );

      await fetchParts();
    } catch (err) {
      setError(err.message);
    }
  };

  // =========================================
  // CANCEL
  // =========================================

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="admin-parts-loading">
        Loading parts data...
      </div>
    );
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <main className="admin-parts-page">
      <div className="admin-parts-container">

        {/* HEADER */}

        <div className="parts-management-header">

          <div>
            <span className="parts-management-badge">
              🔐 Admin Management
            </span>

            <h1>
              Parts & Prices Management
            </h1>

            <p>
              Add, edit and delete mobile
              repair parts and pricing.
            </p>
          </div>

          <button
            className="parts-back-btn"
            onClick={() => navigate("/admin")}
          >
            ← Dashboard
          </button>

        </div>


        {/* MESSAGES */}

        {message && (
          <div className="parts-success-message">
            ✅ {message}
          </div>
        )}

        {error && (
          <div className="parts-error-message">
            ❌ {error}
          </div>
        )}


        {/* ADD BUTTON */}

        {!showForm && (
          <button
            className="add-part-btn"
            onClick={openAddForm}
          >
            + Add New Part
          </button>
        )}


        {/* FORM */}

        {showForm && (
          <section className="part-form-card">

            <div className="part-form-header">

              <span className="part-form-badge">
                {editingId
                  ? "✏️ Edit Part"
                  : "➕ New Part"}
              </span>

              <h2>
                {editingId
                  ? "Edit Part"
                  : "Add New Part"}
              </h2>

            </div>


            <form onSubmit={handleSubmit}>

              {/* NAME + CATEGORY */}

              <div className="part-form-grid">

                <div className="part-form-group">
                  <label>
                    Part Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Example: Charging Connector"
                    required
                  />
                </div>


                <div className="part-form-group">
                  <label>
                    Category *
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Example: Charging"
                    required
                  />
                </div>

              </div>


              {/* COMPATIBLE DEVICES */}

              <div className="part-form-group">

                <label>
                  Compatible Devices
                </label>

                <textarea
                  name="compatibleDevices"
                  value={form.compatibleDevices}
                  onChange={handleChange}
                  placeholder={`Write one device per line.

Example:
Samsung Galaxy A12
Samsung Galaxy A13
Samsung Galaxy A14`}
                />

                <small>
                  Write each device on a new line.
                </small>

              </div>


              {/* PRICE + AVAILABILITY */}

              <div className="part-form-grid">

                <div className="part-form-group">

                  <label>
                    Estimated Price *
                  </label>

                  <input
                    type="text"
                    name="estimatedPrice"
                    value={form.estimatedPrice}
                    onChange={handleChange}
                    placeholder="Example: ₹350–₹500"
                    required
                  />

                </div>


                <div className="part-form-group">

                  <label>
                    Availability
                  </label>

                  <select
                    name="availability"
                    value={form.availability}
                    onChange={handleChange}
                  >
                    <option value="Available">
                      Available
                    </option>

                    <option value="Limited">
                      Limited
                    </option>

                    <option value="Out of Stock">
                      Out of Stock
                    </option>

                    <option value="On Order">
                      On Order
                    </option>
                  </select>

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="part-form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the part and its use."
                />

              </div>


              {/* TECHNICIAN NOTES */}

              <div className="part-form-group">

                <label>
                  Technician Notes
                </label>

                <textarea
                  name="technicianNotes"
                  value={form.technicianNotes}
                  onChange={handleChange}
                  placeholder={`Write one note per line.

Example:
Check part compatibility before replacement.
Use a good-quality replacement part.`}
                />

              </div>


              {/* CUSTOMER NOTICE */}

              <div className="part-form-group">

                <label>
                  Customer Notice
                </label>

                <textarea
                  name="customerNotice"
                  value={form.customerNotice}
                  onChange={handleChange}
                  placeholder="Customer notice"
                />

              </div>


              {/* BUTTONS */}

              <div className="part-form-actions">

                <button
                  type="submit"
                  className="save-part-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Part"
                    : "Add Part"}
                </button>

                <button
                  type="button"
                  className="cancel-part-btn"
                  onClick={cancelForm}
                  disabled={saving}
                >
                  Cancel
                </button>

              </div>

            </form>

          </section>
        )}


        {/* PARTS LIST */}

        <section className="parts-records-section">

          <div className="parts-records-header">

            <div>
              <h2>
                Parts & Prices
              </h2>

              <p>
                {parts.length} parts found
              </p>
            </div>

          </div>


          {parts.length === 0 ? (

            <div className="empty-parts">

              <div>🔩</div>

              <h3>
                No parts found
              </h3>

              <p>
                Add your first part.
              </p>

            </div>

          ) : (

            <div className="parts-records-list">

              {parts.map((part) => (

                <article
                  className="part-record-card"
                  key={part._id}
                >

                  <div className="part-record-info">

                    <span className="part-category">
                      {part.category}
                    </span>

                    <h3>
                      {part.name}
                    </h3>

                    <div className="part-price">
                      💰 {part.estimatedPrice}
                    </div>

                    <div
                      className={
                        part.availability ===
                        "Available"
                          ? "part-available"
                          : "part-unavailable"
                      }
                    >
                      ● {part.availability}
                    </div>

                    <p>
                      {part.description ||
                        "No description added."}
                    </p>

                  </div>


                  <div className="part-record-actions">

                    <button
                      className="part-edit-btn"
                      onClick={() =>
                        openEditForm(part)
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="part-delete-btn"
                      onClick={() =>
                        handleDelete(
                          part._id,
                          part.name
                        )
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </div>
    </main>
  );
}

export default AdminParts;