import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#111", color: "#fff" }}>
      <Link to="/" style={{ marginRight: 10 }}>Home</Link>
      <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}