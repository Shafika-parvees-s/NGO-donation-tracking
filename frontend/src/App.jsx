import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Donate from "./pages/Donate";
import DonationHistory from "./pages/DonationHistory";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/donation-history" element={<DonationHistory />} />
        </Routes>
        </BrowserRouter>
  );
}

export default App;