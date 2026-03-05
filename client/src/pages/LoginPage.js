import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LoginPage() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Auto redirect if already logged in
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      navigate(`/${savedRole}`);
    }
  }, [navigate]);

  const handleLogin = () => {
    if (!role) {
      alert("Please select a role");
      return;
    }

    localStorage.setItem("role", role);
    navigate(`/${role}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🏥 Healthcare DApp</h1>
      <p>Select your role to continue</p>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ padding: "10px", width: "200px" }}
      >
        <option value="">Select Role</option>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      <br /><br />

      <button
        onClick={handleLogin}
        style={{
          padding: "10px 25px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default LoginPage;
