import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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

        <div className="campaign-grid">
          {campaigns.map((campaign) => {
            const target = Number(campaign.targetAmount);
            const raised = Number(campaign.raisedAmount);

            const progress =
              target > 0 ? Math.min((raised / target) * 100, 100) : 0;

            return (
              <div className="campaign-card" key={campaign.campaignId}>
                <h2>{campaign.title}</h2>

                <p>{campaign.description}</p>

                <p>
                  <strong>Target:</strong>{" "}
                  ₹{target.toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Raised:</strong>{" "}
                  ₹{raised.toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Status:</strong> {campaign.status}
                </p>

                <div
                  style={{
                    width: "100%",
                    height: "12px",
                    backgroundColor: "#ddd",
                    borderRadius: "10px",
                    overflow: "hidden",
                    margin: "15px 0 5px",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      backgroundColor: "#10b981",
                      borderRadius: "10px",
                    }}
                  ></div>
                </div>

                <p>
                  <strong>{progress.toFixed(1)}%</strong> funded
                </p>

                <button
                  onClick={() =>
                    navigate(`/donate?campaignId=${campaign.campaignId}`)
                  }
                >
                  Donate Now
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Campaigns;