import { useState } from "react";

function Volunteer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("Registering...");

    try {
      const response = await fetch(
        "http://localhost:8080/api/volunteers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();

      setMessage(
        `Volunteer registered successfully! ID: ${data.volunteerId}`
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        skills: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <main>
      <section>
        <h1>Become a Volunteer</h1>

        <p>
          Join us and help make a positive impact in the community.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <br />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <br />

          <div>
            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <br />

          <div>
            <label>Phone</label>
            <br />
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <br />

          <div>
            <label>Skills</label>
            <br />
            <input
              type="text"
              name="skills"
              placeholder="Example: Teaching, Event Management"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <br />

          <button type="submit">
            Register as Volunteer
          </button>
        </form>

        {message && (
          <p>
            <strong>{message}</strong>
          </p>
        )}
      </section>
    </main>
  );
}

export default Volunteer;