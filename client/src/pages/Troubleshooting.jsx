import { useEffect, useState } from "react";
import { getTroubleshooting } from "../data/api";
import "./Troubleshooting.css";

function Troubleshooting() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getTroubleshooting()
      .then((data) => {
        setProblems(data);
      })
      .catch((error) => {
        console.error("Troubleshooting Error:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Create category list automatically from database data
  const categories = [
    "All",
    ...new Set(problems.map((problem) => problem.category)),
  ];

  // Search + category filtering
  const filteredProblems = problems.filter((problem) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      problem.title.toLowerCase().includes(search) ||
      problem.category.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      problem.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="loading-message">
        Loading troubleshooting data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-message">
        Unable to load data: {error}
      </div>
    );
  }

  return (
    <main className="troubleshooting-page">
      <div className="troubleshooting-container">

        {/* Header */}
        <div className="troubleshooting-header">
          <span className="badge">
            🔧 RepairX Diagnosis
          </span>

          <h1>Mobile Troubleshooting</h1>

          <p>
            Find the possible cause, diagnosis process and repair
            solution for common mobile problems.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="troubleshooting-filters">

          {/* Search */}
          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search mobile problem..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredProblems.length === 0 && (
          <div className="no-results">
            <h2>🔍 No Problem Found</h2>

            <p>
              Try searching for another mobile problem or
              select a different category.
            </p>
          </div>
        )}

        {/* Troubleshooting Problems */}
        {filteredProblems.map((problem) => (
          <div
            className="problem-card"
            key={problem._id}
          >

            {/* Problem Header */}
            <div className="problem-card-header">

              <h2>
                📱 {problem.title}
              </h2>

              <span className="category-badge">
                {problem.category}
              </span>

            </div>

            {/* Possible Causes */}
            <section className="troubleshooting-section">

              <h3>
                ⚠️ Possible Causes
              </h3>

              <div className="causes-grid">

                {problem.possibleCauses.map(
                  (cause, index) => (
                    <div
                      className="cause-item"
                      key={index}
                    >
                      {cause}
                    </div>
                  )
                )}

              </div>

            </section>

            {/* Diagnostic Steps */}
            <section className="troubleshooting-section">

              <h3>
                🔍 Diagnostic Steps
              </h3>

              <div className="steps-list">

                {problem.diagnosticSteps.map(
                  (step, index) => (
                    <div
                      className="step-item"
                      key={index}
                    >

                      <span className="step-number">
                        {index + 1}
                      </span>

                      <span>
                        {step}
                      </span>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* Recommended Solution */}
            <section className="troubleshooting-section">

              <h3>
                🛠️ Recommended Solution
              </h3>

              <div className="solution-list">

                {problem.recommendedSolution.map(
                  (solution, index) => (
                    <div
                      className="solution-item"
                      key={index}
                    >
                      ✓ {solution}
                    </div>
                  )
                )}

              </div>

            </section>

            {/* Estimated Price */}
            <div className="price-card">

              <h3>
                💰 Estimated Repair Price
              </h3>

              <p>
                {problem.estimatedPrice}
              </p>

            </div>

            {/* Information Cards */}
            <div className="info-grid">

              {/* Required Parts */}
              <div className="info-card">

                <h3>
                  🔩 Required Parts
                </h3>

                <ul>
                  {problem.requiredParts.map(
                    (part, index) => (
                      <li key={index}>
                        {part}
                      </li>
                    )
                  )}
                </ul>

              </div>

              {/* Technician Notes */}
              <div className="info-card">

                <h3>
                  👨‍🔧 Technician Notes
                </h3>

                <ul>
                  {problem.technicianNotes.map(
                    (note, index) => (
                      <li key={index}>
                        {note}
                      </li>
                    )
                  )}
                </ul>

              </div>

            </div>

            {/* Warnings */}
            <div className="warning-card">

              <h3>
                ⚠️ Important Warnings
              </h3>

              <ul>
                {problem.warnings.map(
                  (warning, index) => (
                    <li key={index}>
                      {warning}
                    </li>
                  )
                )}
              </ul>

            </div>

            {/* Customer Notice */}
            <div className="customer-notice">

              <strong>
                Customer Notice:
              </strong>{" "}

              {problem.customerNotice}

            </div>

          </div>
        ))}

      </div>
    </main>
  );
}

export default Troubleshooting;