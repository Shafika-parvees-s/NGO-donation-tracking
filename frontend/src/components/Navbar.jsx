import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span>♥</span> ImpactHub
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/campaigns">Campaigns</Link>
        <Link to="/about">About</Link>
        <Link to="/donate">Donate</Link>

        <Link to="/donation-history?userId=4">
          Donation History
        </Link>

        <Link to="/impact">Impact</Link>
        <Link to="/campaign-updates">Updates</Link>
        <Link to="/volunteer">Volunteer</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </div>

      <button
        className="nav-donate-btn"
        onClick={() => navigate("/donate")}
      >
        ♥ Donate Now
      </button>
    </nav>
  );
}

export default Navbar;