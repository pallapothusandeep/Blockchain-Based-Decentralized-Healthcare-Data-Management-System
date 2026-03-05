import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>🏥 Healthcare DApp</h2>
      <div>
        <Link to="/patient">Patient</Link>
        <Link to="/doctor">Doctor</Link>
        <button onClick={logout} style={{ marginLeft: "20px" }}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
