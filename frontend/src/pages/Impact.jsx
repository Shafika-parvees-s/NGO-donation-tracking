import { useEffect, useState } from "react";

function Impact() {
  const [impacts, setImpacts] = useState([]);

  const [formData, setFormData] = useState({
    campaignId: "",
    title: "",
    description: "",
    amountUsed: "",
  });

  const [message, setMessage] = useState("");

  const loadImpacts = () => {
    fetch("http://localhost:8080/api/impacts")
      .then((response) => response.json())
      .then((data) => {
        setImpacts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadImpacts();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("Saving impact update...");

    try {
      const response = await fetch(
        "http://localhost:8080/api/impacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            campaignId: Number(formData.campaignId),
            title: formData.title,
            description: formData.description,
            amountUsed: Number(formData.amountUsed),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save impact");
      }

      const data = await response.json();

      setMessage(
        `Impact update added successfully! ID: ${data.impactId}`
      );

      setFormData({
        campaignId: "",
        title: "",
        description: "",
        amountUsed: "",
      });

      loadImpacts();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save impact update.");
    }
  };

  return (
    <main>
      <section>
        <h1>Impact Tracking</h1>

        <p>
          Track how donations are used and the impact created by each campaign.
        </p>

        {/* Add Impact Form */}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Campaign ID</label>
            <br />
            <input
              type="number"
              name="campaignId"
              placeholder="Enter Campaign ID"
              value={formData.campaignId}
              onChange={handleChange}
              required
            />
          </div>

          <br />

          <div>
            <label>Impact Title</label>
            <br />
            <input
              type="text"
              name="title"
              placeholder="Example: Education Kits Distributed"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <br />

          <div>
            <label>Description</label>
            <br />
            <textarea
              name="description"
              placeholder="Describe the impact created..."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <br />

          <div>
            <label>Amount Used</label>
            <br />
            <input
              type="number"
              name="amountUsed"
              placeholder="Enter amount used"
              value={formData.amountUsed}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <br />

          <button type="submit">
            Add Impact Update
          </button>
        </form>

        {message && (
          <p>
            <strong>{message}</strong>
          </p>
        )}

        <hr />

        {/* Impact List */}

        <h2>Impact Updates</h2>

        {impacts.length === 0 ? (
          <p>No impact updates found.</p>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Impact ID</th>
                <th>Campaign ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Amount Used</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {impacts.map((impact) => (
                <tr key={impact.impactId}>
                  <td>{impact.impactId}</td>
                  <td>{impact.campaignId}</td>
                  <td>{impact.title}</td>
                  <td>{impact.description}</td>
                  <td>
                    ₹
                    {Number(impact.amountUsed).toLocaleString(
                      "en-IN"
                    )}
                  </td>
                  <td>
                    {impact.impactDate
                      ? new Date(
                          impact.impactDate
                        ).toLocaleString("en-IN")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

export default Impact;