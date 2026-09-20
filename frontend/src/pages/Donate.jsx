import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Donate() {
  const [searchParams] = useSearchParams();

  const campaignIdFromUrl = searchParams.get("campaignId");

  const [userId, setUserId] = useState("");
  const [campaignId, setCampaignId] = useState(
    campaignIdFromUrl || ""
  );
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("Processing donation...");

    try {
      const response = await fetch(
        "http://localhost:8080/api/donations",
        {
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
        }
      );

      if (!response.ok) {
        throw new Error("Donation failed");
      }

      const data = await response.json();

      setMessage(
        `Donation successful! Donation ID: ${data.donationId}`
      );

      setUserId("");
      setAmount("");
      setPaymentMethod("UPI");
    } catch (error) {
      console.error(error);

      setMessage(
        "Donation failed. Please try again."
      );
    }
  };

  return (
    <main className="donate-page">

      {/* Hero Section */}

      <section className="donate-hero">
        <div className="donate-hero-content">

          <p className="donate-label">
            MAKE A DIFFERENCE
          </p>

          <h1>
            Make a <span>Donation</span>
          </h1>

          <p>
            Your contribution helps support meaningful campaigns
            and creates a positive impact in the community.
          </p>

        </div>
      </section>


      {/* Donation Section */}

      <section className="donation-section">

        <div className="donation-layout">

          {/* Left Information */}

          <div className="donation-info">

            <p className="section-label">
              YOUR SUPPORT MATTERS
            </p>

            <h2>
              Every contribution creates an impact.
            </h2>

            <p>
              Your donation helps us support education,
              healthcare, food distribution and other
              community-focused initiatives.
            </p>

            <div className="donation-points">

              <div>
                <span>✓</span>
                <p>Support meaningful campaigns</p>
              </div>

              <div>
                <span>✓</span>
                <p>Track how donations are used</p>
              </div>

              <div>
                <span>✓</span>
                <p>Help create measurable impact</p>
              </div>

            </div>

          </div>


          {/* Donation Card */}

          <div className="donation-card">

            <div className="donation-card-header">
              <h2>Donation Details</h2>

              <p>
                Enter your details below to continue.
              </p>
            </div>


            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>User ID</label>

                <input
                  type="number"
                  placeholder="Enter your User ID"
                  value={userId}
                  onChange={(event) =>
                    setUserId(event.target.value)
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>Campaign ID</label>

                <input
                  type="number"
                  placeholder="Enter Campaign ID"
                  value={campaignId}
                  onChange={(event) =>
                    setCampaignId(event.target.value)
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>Donation Amount</label>

                <div className="amount-input">

                  <span>₹</span>

                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(event) =>
                      setAmount(event.target.value)
                    }
                    min="1"
                    required
                  />

                </div>

              </div>


              <div className="form-group">

                <label>Payment Method</label>

                <select
                  value={paymentMethod}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                >
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                  <option value="NET_BANKING">
                    Net Banking
                  </option>
                </select>

              </div>


              <button
                type="submit"
                className="donate-submit-btn"
              >
                ♥ Donate Now
              </button>

            </form>


            {message && (
              <div className="donation-message">
                {message}
              </div>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default Donate;