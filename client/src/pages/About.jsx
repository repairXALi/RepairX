import { useEffect, useState } from "react";

function About() {
  const [message, setMessage] = useState("Connecting to RepairX server...");

  useEffect(() => {
    fetch"https://repairx.onrender.com/api/test")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Backend connection error:", error);
        setMessage("Could not connect to RepairX server.");
      });
  }, []);

  return (
    <main
      style={{
        minHeight: "70vh",
        padding: "80px 8%",
        textAlign: "center",
      }}
    >
      <h1>About RepairX</h1>

      <p>
        RepairX is a mobile troubleshooting and repair assistance
        platform.
      </p>

      <div
        style={{
          marginTop: "40px",
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: "#f1f5f9",
        }}
      >
        <h2>Backend Status</h2>

        <p>{message}</p>
      </div>
    </main>
  );
}

export default About;