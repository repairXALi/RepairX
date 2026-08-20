import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://repairx-server.onrender.com/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      // Get response safely
      const text = await response.text();

      let result = {};

      try {
        result = text ? JSON.parse(text) : {};
      } catch (jsonError) {
        console.error("Invalid JSON response:", text);

        throw new Error(
          "Server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Login failed"
        );
      }

      // Save admin information
      localStorage.setItem(
        "repairxAdmin",
        JSON.stringify(result.admin)
      );

      setSuccess("Login successful!");

      // Go to Admin Dashboard
      setTimeout(() => {
        navigate("/admin");
      }, 500);

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "35px",
          borderRadius: "20px",
          background: "#121a2e",
          border: "1px solid #263452",
          color: "white",
        }}
      >
        <h1>RepairX Admin Login</h1>

        <p style={{ color: "#94a3b8" }}>
          Login to access the RepairX administration
          panel.
        </p>

        {error && (
          <div
            style={{
              background: "#3f1515",
              color: "#fca5a5",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background: "#12351f",
              color: "#86efac",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          >
            {success}
          </div>
        )}

        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Enter admin email"
          required
          style={{
            width: "100%",
            boxSizing: "border-box",
            marginTop: "8px",
            marginBottom: "20px",
            padding: "13px",
            borderRadius: "10px",
            border: "1px solid #334155",
            background: "#0b1020",
            color: "white",
          }}
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Enter password"
          required
          style={{
            width: "100%",
            boxSizing: "border-box",
            marginTop: "8px",
            marginBottom: "20px",
            padding: "13px",
            borderRadius: "10px",
            border: "1px solid #334155",
            background: "#0b1020",
            color: "white",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;