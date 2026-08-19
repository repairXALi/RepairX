const API_URL = "http://localhost:5000/api";

// ================================
// Troubleshooting API
// ================================

export const getTroubleshooting = async () => {
  const response = await fetch(`${API_URL}/troubleshooting`);

  if (!response.ok) {
    throw new Error("Failed to fetch troubleshooting data");
  }

  const result = await response.json();

  return result.data;
};

// ================================
// Parts & Prices API
// ================================

export const getParts = async () => {
  const response = await fetch(`${API_URL}/parts`);

  if (!response.ok) {
    throw new Error("Failed to fetch parts data");
  }

  const result = await response.json();

  return result.data;
};