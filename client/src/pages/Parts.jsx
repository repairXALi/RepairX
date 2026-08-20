import { useEffect, useState } from "react";
import { getParts } from "../data/api";
import "./parts.css";

function Parts() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getParts()
      .then((data) => {
        setParts(data);
      })
      .catch((error) => {
        console.error("Parts Error:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    ...new Set(parts.map((part) => part.category)),
  ];

  const filteredParts = parts.filter((part) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      part.name.toLowerCase().includes(search) ||
      part.category.toLowerCase().includes(search) ||
      part.compatibleDevices.some((device) =>
        device.toLowerCase().includes(search)
      );

    const matchesCategory =
      selectedCategory === "All" ||
      part.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="parts-loading">
        Loading parts & prices...
      </div>
    );
  }

  if (error) {
    return (
      <div className="parts-loading">
        Unable to load parts: {error}
      </div>
    );
  }

  return (
    <main className="parts-page">
      <div className="parts-container">

        {/* Header */}
        <div className="parts-header">
          <span className="parts-badge">
            🔩 RepairX Parts
          </span>

          <h1>Parts & Prices</h1>

          <p>
            Find mobile repair parts, compatible devices,
            availability and estimated prices.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="parts-filters">

          <div className="parts-search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search parts or mobile models..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <div className="parts-category-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "parts-category-button active"
                    : "parts-category-button"
                }
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredParts.length === 0 && (
          <div className="parts-no-results">
            <h2>🔍 No Part Found</h2>

            <p>
              Try searching for another part or select
              a different category.
            </p>
          </div>
        )}

        {/* Parts Grid */}
        <div className="parts-grid">

          {filteredParts.map((part) => (
            <div
              className="part-card"
              key={part._id}
            >

              {/* Card Header */}
              <div className="part-card-header">

                <div className="part-icon">
                  🔧
                </div>

                <span className="part-category">
                  {part.category}
                </span>

              </div>

              {/* Part Name */}
              <h2>{part.name}</h2>

              {/* Description */}
              <p className="part-description">
                {part.description}
              </p>

              {/* Price */}
              <div className="part-price">
                <span>Estimated Price</span>

                <strong>
                  {part.estimatedPrice}
                </strong>
              </div>

              {/* Availability */}
              <div className="part-availability">
                <span>Availability</span>

                <strong>
                  ✓ {part.availability}
                </strong>
              </div>

              {/* Compatible Devices */}
              <div className="part-info">

                <h3>
                  📱 Compatible Devices
                </h3>

                <ul>
                  {part.compatibleDevices.map(
                    (device, index) => (
                      <li key={index}>
                        {device}
                      </li>
                    )
                  )}
                </ul>

              </div>

              {/* Technician Notes */}
              <div className="part-info">

                <h3>
                  👨‍🔧 Technician Notes
                </h3>

                <ul>
                  {part.technicianNotes.map(
                    (note, index) => (
                      <li key={index}>
                        {note}
                      </li>
                    )
                  )}
                </ul>

              </div>

              {/* Customer Notice */}
              <div className="part-notice">

                <strong>
                  Customer Notice:
                </strong>

                <p>
                  {part.customerNotice}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}

export default Parts;