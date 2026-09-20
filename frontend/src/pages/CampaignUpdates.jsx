import { useEffect, useState } from "react";

function CampaignUpdates() {
  const [updates, setUpdates] = useState([]);

  const [formData, setFormData] = useState({
    campaignId: "",
    title: "",
    description: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");

  const loadUpdates = () => {
    fetch("http://localhost:8080/api/campaign-updates")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load updates");
        }
        return response.json();
      })
      .then((data) => {
        setUpdates(data);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Failed to load campaign updates.");
      });
  };

  useEffect(() => {
    loadUpdates();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("Saving campaign update...");

    try {
      const response = await fetch(
        "http://localhost:8080/api/campaign-updates",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            campaignId: Number(formData.campaignId),
            title: formData.title,
            description: formData.description,
            imageUrl: formData.imageUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save update");
      }

      const data = await response.json();

      setMessage(
        `Campaign update added successfully! ID: ${data.updateId}`
      );

      setFormData({
        campaignId: "",
        title: "",
        description: "",
        imageUrl: "",
      });

      loadUpdates();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save campaign update.");
    }
  };

  return (
    <main>
      <section>
        <h1>Campaign Updates</h1>

        <p>
          Stay updated with the latest activities and progress of our campaigns.
        </p>

        <h2>Add Campaign Update</h2>

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
            <label>Title</label>
            <br />
            <input
              type="text"
              name="title"
              placeholder="Enter update title"
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
              placeholder="Describe the campaign update..."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <br />

          <div>
            <label>Image URL</label>
            <br />
            <input
              type="text"
              name="imageUrl"
              placeholder="Optional image URL"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <br />

          <button type="submit">
            Add Update
          </button>
        </form>

        {message && (
          <p>
            <strong>{message}</strong>
          </p>
        )}

        <hr />

        <h2>Latest Campaign Updates</h2>

        {updates.length === 0 ? (
          <p>No campaign updates found.</p>
        ) : (
          updates.map((update) => (
            <article key={update.updateId}>
              <h3>{update.title}</h3>

              <p>
                <strong>Campaign ID:</strong>{" "}
                {update.campaignId}
              </p>

              <p>{update.description}</p>

              {update.imageUrl && (
                <img
                  src={update.imageUrl}
                  alt={update.title}
                  width="300"
                />
              )}

              <p>
                <strong>Published:</strong>{" "}
                {update.createdAt
                  ? new Date(update.createdAt).toLocaleString("en-IN")
                  : "-"}
              </p>

              <hr />
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default CampaignUpdates;