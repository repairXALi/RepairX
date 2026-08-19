import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminTroubleshooting.css";

const emptyForm = {
  title: "",
  category: "",
  symptoms: "",
  possibleCauses: "",
  diagnosticSteps: "",
  recommendedSolution: "",
  requiredParts: "",
  estimatedPrice: "",
  technicianNotes: "",
  warnings: "",
  customerNotice: "",
};

function AdminTroubleshooting() {
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
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

    fetchProblems();
  }, [navigate]);

  // =========================================
  // FETCH ALL PROBLEMS
  // =========================================

  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/troubleshooting"
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch data"
        );
      }

      setProblems(result.data || []);
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
  // ARRAY CONVERSION
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
  // OPEN ADD FORM
  // =========================================

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
    setShowForm(true);
  };

  // =========================================
  // OPEN EDIT FORM
  // =========================================

  const openEditForm = (problem) => {
    setEditingId(problem._id);

    setForm({
      title: problem.title || "",
      category: problem.category || "",

      symptoms: arrayToText(problem.symptoms),

      possibleCauses: arrayToText(
        problem.possibleCauses
      ),

      diagnosticSteps: arrayToText(
        problem.diagnosticSteps
      ),

      recommendedSolution: arrayToText(
        problem.recommendedSolution
      ),

      requiredParts: arrayToText(
        problem.requiredParts
      ),

      estimatedPrice:
        problem.estimatedPrice || "",

      technicianNotes: arrayToText(
        problem.technicianNotes
      ),

      warnings: arrayToText(problem.warnings),

      customerNotice:
        problem.customerNotice || "",
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
  // SUBMIT ADD / UPDATE
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    const payload = {
      title: form.title.trim(),

      category: form.category.trim(),

      symptoms: textToArray(form.symptoms),

      possibleCauses: textToArray(
        form.possibleCauses
      ),

      diagnosticSteps: textToArray(
        form.diagnosticSteps
      ),

      recommendedSolution: textToArray(
        form.recommendedSolution
      ),

      requiredParts: textToArray(
        form.requiredParts
      ),

      estimatedPrice:
        form.estimatedPrice.trim(),

      technicianNotes: textToArray(
        form.technicianNotes
      ),

      warnings: textToArray(form.warnings),

      customerNotice:
        form.customerNotice.trim(),
    };

    try {
      const url = editingId
        ? `/api/troubleshooting/${editingId}`
        : "/api/troubleshooting";

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
            "Failed to save troubleshooting problem"
        );
      }

      setMessage(
        editingId
          ? "Troubleshooting problem updated successfully!"
          : "Troubleshooting problem added successfully!"
      );

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await fetchProblems();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // DELETE
  // =========================================

  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `/api/troubleshooting/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete troubleshooting problem"
        );
      }

      setMessage(
        "Troubleshooting problem deleted successfully!"
      );

      await fetchProblems();
    } catch (err) {
      setError(err.message);
    }
  };

  // =========================================
  // CANCEL FORM
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
      <div className="admin-troubleshooting-loading">
        Loading troubleshooting data...
      </div>
    );
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <main className="admin-troubleshooting-page">
      <div className="admin-troubleshooting-container">

        {/* HEADER */}

        <div className="management-header">

          <div>
            <span className="management-badge">
              🔐 Admin Management
            </span>

            <h1>
              Troubleshooting Management
            </h1>

            <p>
              Add, edit and delete mobile
              troubleshooting information.
            </p>
          </div>

          <button
            className="management-back-btn"
            onClick={() => navigate("/admin")}
          >
            ← Dashboard
          </button>

        </div>

        {/* MESSAGE */}

        {message && (
          <div className="success-message">
            ✅ {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {/* ADD BUTTON */}

        {!showForm && (
          <button
            className="add-problem-btn"
            onClick={openAddForm}
          >
            + Add New Problem
          </button>
        )}

        {/* FORM */}

        {showForm && (
          <section className="problem-form-card">

            <div className="form-header">
              <div>
                <span className="form-badge">
                  {editingId
                    ? "✏️ Edit Problem"
                    : "➕ New Problem"}
                </span>

                <h2>
                  {editingId
                    ? "Edit Troubleshooting Problem"
                    : "Add Troubleshooting Problem"}
                </h2>
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              {/* BASIC INFO */}

              <div className="form-grid">

                <div className="form-group">
                  <label>
                    Problem Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Example: Phone Not Charging"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Category *
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Example: Charging & Power"
                    required
                  />
                </div>

              </div>

              {/* ARRAYS */}

              <div className="form-group">
                <label>
                  Symptoms
                </label>

                <textarea
                  name="symptoms"
                  value={form.symptoms}
                  onChange={handleChange}
                  placeholder={`Write one symptom per line.

Example:
Phone does not charge
Charging starts and stops
Charging connector feels loose`}
                />

                <small>
                  Write each item on a new line.
                </small>
              </div>

              <div className="form-group">
                <label>
                  Possible Causes
                </label>

                <textarea
                  name="possibleCauses"
                  value={form.possibleCauses}
                  onChange={handleChange}
                  placeholder={`Write one cause per line.

Example:
Charging connector problem
Cable or adapter problem
Sub-board problem
Motherboard problem`}
                />
              </div>

              <div className="form-group">
                <label>
                  Diagnostic Steps
                </label>

                <textarea
                  name="diagnosticSteps"
                  value={form.diagnosticSteps}
                  onChange={handleChange}
                  placeholder={`Write one diagnostic step per line.

Example:
Check the charging connector physically.
Test the phone using a charging device.
Check the charging current.`}
                />
              </div>

              <div className="form-group">
                <label>
                  Recommended Solution
                </label>

                <textarea
                  name="recommendedSolution"
                  value={form.recommendedSolution}
                  onChange={handleChange}
                  placeholder={`Write one solution per line.`}
                />
              </div>

              <div className="form-group">
                <label>
                  Required Parts
                </label>

                <textarea
                  name="requiredParts"
                  value={form.requiredParts}
                  onChange={handleChange}
                  placeholder={`Write one part per line.

Example:
Charging connector
Sub-board`}
                />
              </div>

              {/* PRICE */}

              <div className="form-group">
                <label>
                  Estimated Price
                </label>

                <input
                  type="text"
                  name="estimatedPrice"
                  value={form.estimatedPrice}
                  onChange={handleChange}
                  placeholder="Example: ₹350–₹500"
                />
              </div>

              {/* NOTES */}

              <div className="form-group">
                <label>
                  Technician Notes
                </label>

                <textarea
                  name="technicianNotes"
                  value={form.technicianNotes}
                  onChange={handleChange}
                  placeholder="Write one technician note per line."
                />
              </div>

              <div className="form-group">
                <label>
                  Warnings
                </label>

                <textarea
                  name="warnings"
                  value={form.warnings}
                  onChange={handleChange}
                  placeholder="Write one warning per line."
                />
              </div>

              <div className="form-group">
                <label>
                  Customer Notice
                </label>

                <textarea
                  name="customerNotice"
                  value={form.customerNotice}
                  onChange={handleChange}
                  placeholder="Example: Actual diagnosis and pricing may vary depending on the mobile model and device condition."
                />
              </div>

              {/* FORM BUTTONS */}

              <div className="form-actions">

                <button
                  type="submit"
                  className="save-problem-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Problem"
                    : "Add Problem"}
                </button>

                <button
                  type="button"
                  className="cancel-problem-btn"
                  onClick={cancelForm}
                  disabled={saving}
                >
                  Cancel
                </button>

              </div>

            </form>
          </section>
        )}

        {/* RECORDS */}

        <section className="records-section">

          <div className="records-header">
            <div>
              <h2>
                Troubleshooting Records
              </h2>

              <p>
                {problems.length} records found
              </p>
            </div>
          </div>

          {problems.length === 0 ? (
            <div className="empty-records">
              <div>🔧</div>

              <h3>
                No troubleshooting records
              </h3>

              <p>
                Add your first troubleshooting problem.
              </p>
            </div>
          ) : (
            <div className="records-list">

              {problems.map((problem) => (
                <article
                  className="record-card"
                  key={problem._id}
                >

                  <div className="record-main">

                    <div>
                      <span className="record-category">
                        {problem.category}
                      </span>

                      <h3>
                        {problem.title}
                      </h3>

                      <p>
                        {Array.isArray(
                          problem.symptoms
                        ) &&
                        problem.symptoms.length > 0
                          ? problem.symptoms[0]
                          : "No symptoms added."}
                      </p>
                    </div>

                    <div className="record-actions">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          openEditForm(problem)
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            problem._id,
                            problem.title
                          )
                        }
                      >
                        🗑️ Delete
                      </button>

                    </div>

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

export default AdminTroubleshooting;