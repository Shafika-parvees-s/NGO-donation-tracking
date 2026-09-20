import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">

      {/* HERO */}

      <section className="home-hero">

        <div className="home-hero-content">

          <p className="home-label">
            TOGETHER FOR A BETTER TOMORROW
          </p>

          <h1>
            Small Donations.
            <br />
            <span>Big Impact.</span>
          </h1>

          <p className="home-description">
            Support meaningful campaigns, help communities in need,
            and track the real-world impact of every contribution.
          </p>

          <div className="home-buttons">

            <Link
              to="/campaigns"
              className="home-primary-btn"
            >
              Explore Campaigns
            </Link>

            <Link
              to="/donate"
              className="home-secondary-btn"
            >
              ♥ Donate Now
            </Link>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="home-features">

        <div className="home-section-heading">

          <p className="home-label">
            WHAT WE DO
          </p>

          <h2>
            Making every contribution meaningful.
          </h2>

          <p>
            ImpactHub connects donors with campaigns and
            helps track how contributions create positive change.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              ♥
            </div>

            <h3>
              Easy Donations
            </h3>

            <p>
              Support campaigns through a simple and
              convenient donation process.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ↗
            </div>

            <h3>
              Track Campaigns
            </h3>

            <p>
              Follow campaign progress and see how
              fundraising goals are being achieved.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ✓
            </div>

            <h3>
              Real Impact
            </h3>

            <p>
              View impact updates and understand how
              donations are being used.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="home-cta">

        <div>

          <p className="home-label">
            READY TO HELP?
          </p>

          <h2>
            Be part of the change.
          </h2>

          <p>
            Every contribution, regardless of size,
            can help create a meaningful difference.
          </p>

          <Link
            to="/donate"
            className="home-primary-btn"
          >
            Make a Donation
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;