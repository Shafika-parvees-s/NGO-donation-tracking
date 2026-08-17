import { useEffect, useState } from "react";

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/campaigns")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }
        return response.json();
      })
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load campaigns");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading campaigns...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <section>
        <h1>Our Campaigns</h1>

        <p>
          Support our active campaigns and make a meaningful difference.
        </p>

        {campaigns.map((campaign) => (
          <div key={campaign.campaignId}>
            <h2>{campaign.title}</h2>

            <p>{campaign.description}</p>

            <p>
              <strong>Target:</strong> ₹{campaign.targetAmount}
            </p>

            <p>
              <strong>Raised:</strong> ₹{campaign.raisedAmount}
            </p>

            <p>
              <strong>Status:</strong> {campaign.status}
            </p>

            <button>Donate Now</button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Campaigns;