import { useState } from "react";

function Donate() {
  const [userId, setUserId] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("Processing donation...");

    try {
      const response = await fetch("http://localhost:8080/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: Number(userId),
          campaignId: Number(campaignId),
          amount: Number(amount),
          paymentMethod: paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error("Donation failed");
      }

      const data = await response.json();

      console.log("Donation successful:", data);

      setMessage(
        `Donation successful! Donation ID: ${data.donationId}`
      );

      setUserId("");
      setCampaignId("");
      setAmount("");
      setPaymentMethod("UPI");
    } catch (error) {
      console.error(error);
      setMessage("Donation failed. Please try again.");
    }
  };

  return (
    <main>
      <section>
        <h1>Make a Donation</h1>

        <p>
          Your contribution can help make a meaningful difference.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>User ID</label>
            <br />

            <input
              type="number"
              placeholder="Enter User ID"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              required
            />
          </div>

          <br />

          <div>
            <label>Campaign ID</label>
            <br />

            <input
              type="number"
              placeholder="Enter Campaign ID"
              value={campaignId}
              onChange={(event) => setCampaignId(event.target.value)}
              required
            />
          </div>

          <br />

          <div>
            <label>Donation Amount</label>
            <br />

            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              min="1"
              required
            />
          </div>

          <br />

          <div>
            <label>Payment Method</label>
            <br />

            <select
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value)}
            >
              <option value="UPI">UPI</option>
              <option value="CARD">Card</option>
              <option value="NET_BANKING">
                Net Banking
              </option>
            </select>
          </div>

          <br />

          <button type="submit">
            Donate Now
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

export default Donate;