function About() {
  return (
    <main className="about-page">

      {/* HERO */}

      <section className="about-hero">

        <div className="about-hero-content">

          <p className="about-label">
            ABOUT IMPACTHUB
          </p>

          <h1>
            Turning generosity into
            <span> meaningful impact.</span>
          </h1>

          <p>
            ImpactHub is a donation and impact tracking platform
            designed to connect people with meaningful campaigns
            and make the journey from donation to impact more transparent.
          </p>

        </div>

      </section>


      {/* MISSION */}

      <section className="about-mission">

        <div className="about-mission-text">

          <p className="about-label">
            OUR MISSION
          </p>

          <h2>
            Making giving simple, transparent and impactful.
          </h2>

          <p>
            Our platform helps donors discover campaigns,
            make contributions and follow the progress of
            the initiatives they support.
          </p>

          <p>
            We believe that donors should be able to understand
            how their contributions are being used and what
            kind of impact they create.
          </p>

        </div>


        <div className="mission-card">

          <div className="mission-icon">
            ♥
          </div>

          <h3>
            Give With Purpose
          </h3>

          <p>
            Every contribution can become part of a larger
            effort to support communities and create positive change.
          </p>

        </div>

      </section>


      {/* WHAT WE OFFER */}

      <section className="about-services">

        <div className="about-heading">

          <p className="about-label">
            WHAT WE OFFER
          </p>

          <h2>
            Everything in one platform.
          </h2>

          <p>
            ImpactHub brings important donation and community
            features together in one simple platform.
          </p>

        </div>


        <div className="about-service-grid">

          <div className="about-service-card">

            <span className="service-number">
              01
            </span>

            <h3>
              Campaign Discovery
            </h3>

            <p>
              Explore active campaigns and understand their
              goals before making a contribution.
            </p>

          </div>


          <div className="about-service-card">

            <span className="service-number">
              02
            </span>

            <h3>
              Secure Donations
            </h3>

            <p>
              Make donations through supported payment
              methods with a simple user experience.
            </p>

          </div>


          <div className="about-service-card">

            <span className="service-number">
              03
            </span>

            <h3>
              Donation History
            </h3>

            <p>
              View previous contributions and keep track
              of your donation activity.
            </p>

          </div>


          <div className="about-service-card">

            <span className="service-number">
              04
            </span>

            <h3>
              Impact Tracking
            </h3>

            <p>
              Follow campaign updates and understand how
              donations are being used to create impact.
            </p>

          </div>


          <div className="about-service-card">

            <span className="service-number">
              05
            </span>

            <h3>
              Volunteer Opportunities
            </h3>

            <p>
              Join community initiatives and contribute
              your skills as a volunteer.
            </p>

          </div>


          <div className="about-service-card">

            <span className="service-number">
              06
            </span>

            <h3>
              Community Connection
            </h3>

            <p>
              Connect donors, volunteers and organizations
              through meaningful social initiatives.
            </p>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="about-cta">

        <p className="about-label">
          MAKE AN IMPACT
        </p>

        <h2>
          Your contribution can make a difference.
        </h2>

        <p>
          Explore our campaigns and become part of
          something meaningful.
        </p>

        <a
          href="/campaigns"
          className="about-cta-btn"
        >
          Explore Campaigns →
        </a>

      </section>

    </main>
  );
}

export default About;