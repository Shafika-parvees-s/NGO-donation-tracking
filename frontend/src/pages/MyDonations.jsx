import { useEffect, useState } from "react";

function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Temporary user ID
  const userId = localStorage.getItem("userId") || "4";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donationResponse, campaignResponse] = await Promise.all([
          fetch(`http://localhost:8080/api/donations/user/${userId}`),
          fetch("http://localhost:8080/api/campaigns"),
        ]);

        if (!donationResponse.ok || !campaignResponse.ok) {
          throw new Error("Failed to load data");
        }

        const donationData = await donationResponse.json();
        const campaignData = await campaignResponse.json();

        setDonations(donationData);
        setCampaigns(campaignData);
      } catch (err) {
        console.error(err);
        setError("Unable to load donation history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const getCampaignName = (campaignId) => {
    const campaign = campaigns.find(
      (item) => Number(item.campaignId) === Number(campaignId)
    );

    return campaign ? campaign.title : "Campaign unavailable";
  };

  const totalDonated = donations.reduce(
    (total, donation) => total + Number(donation.amount || 0),
    0
  );

  if (loading) {
    return (
      <main className="my-donations">
        <h2>Loading donations...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="my-donations">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="my-donations">
      <section className="my-donations-header">
        <p className="section-label">YOUR CONTRIBUTION</p>
        <h1>My Donations ❤️</h1>
        <p>Every contribution helps create a meaningful impact.</p>
      </section>

      <section className="donation-summary">
        <div className="summary-card">
          <h3>Total Donations</h3>
          <p>{donations.length}</p>
        </div>

        <div className="summary-card">
          <h3>Total Amount Donated</h3>
          <p>₹{totalDonated.toLocaleString("en-IN")}</p>
        </div>
      </section>

      <section className="donation-history">
        <h2>Donation History</h2>

        {donations.length === 0 ? (
          <div className="no-donations">
            <h2>No donations yet</h2>
            <p>Your donation history will appear here.</p>
          </div>
        ) : (
          <div className="donation-table-wrapper">
            <table className="donation-table">
              <thead>
                <tr>
                  <th>Donation ID</th>
                  <th>Campaign Name</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Donation Date</th>
                </tr>
              </thead>

              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.donationId}>
                    <td>#{donation.donationId}</td>

                    <td>
                      {getCampaignName(donation.campaignId)}
                    </td>

                    <td>
                      ₹{Number(donation.amount).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span className="payment-badge">
                        {donation.paymentMethod}
                      </span>
                    </td>

                    <td>
                      {donation.donationDate
                        ? new Date(
                            donation.donationDate
                          ).toLocaleString("en-IN")
                        : "Date unavailable"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default MyDonations;