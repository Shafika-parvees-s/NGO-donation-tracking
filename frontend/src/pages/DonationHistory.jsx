import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function DonationHistory() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const [donations, setDonations] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) {
      setMessage("User ID not found");
      return;
    }

    fetch(`http://localhost:8080/api/donations/user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch donation history");
        }
        return response.json();
      })
      .then((data) => {
        setDonations(data);

        if (data.length === 0) {
          setMessage("No donations found.");
        } else {
          setMessage("");
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("Failed to load donation history.");
      });
  }, [userId]);

  return (
    <main>
      <section>
        <h1>Donation History</h1>

        {!userId && (
          <p>
            <strong>Please open this page with a User ID.</strong>
          </p>
        )}

        {message && (
          <p>
            <strong>{message}</strong>
          </p>
        )}

        {donations.length > 0 && (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Donation ID</th>
                <th>Campaign ID</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Donation Date</th>
              </tr>
            </thead>

            <tbody>
              {donations.map((donation) => (
                <tr key={donation.donationId}>
                  <td>{donation.donationId}</td>

                  <td>{donation.campaignId}</td>

                  <td>
                    ₹{Number(donation.amount).toLocaleString("en-IN")}
                  </td>

                  <td>{donation.paymentMethod}</td>

                  <td>
                    {new Date(donation.donationDate).toLocaleString("en-IN")}
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

export default DonationHistory;