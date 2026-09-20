import CampaignUpdates from "./pages/CampaignUpdates";
import Impact from "./pages/Impact";
import Volunteer from "./pages/Volunteer";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Donate from "./pages/Donate";
import DonationHistory from "./pages/DonationHistory";
import Contact from "./pages/Contact";
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/impact" element={<Impact />} />
        <Route
  path="/campaign-updates"
  element={<CampaignUpdates />}
/>
        </Routes>
        </BrowserRouter>
  );
}

export default App;