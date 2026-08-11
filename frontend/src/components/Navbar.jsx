import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>ImpactHub</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/campaigns">Campaigns</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </div>

      <button>Donate Now</button>
    </nav>
  );
}

export default Navbar;