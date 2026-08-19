import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const problemCategories = [
    {
      icon: "🔋",
      title: "Battery",
      description: "Battery draining or not powering on",
      link: "/troubleshooting",
    },
    {
      icon: "🔌",
      title: "Charging",
      description: "Phone not charging or charging slowly",
      link: "/troubleshooting",
    },
    {
      icon: "📱",
      title: "Display",
      description: "Broken, blank or flickering screen",
      link: "/troubleshooting",
    },
    {
      icon: "🔊",
      title: "Audio",
      description: "Speaker or microphone problems",
      link: "/troubleshooting",
    },
    {
      icon: "📷",
      title: "Camera",
      description: "Camera not opening or working",
      link: "/troubleshooting",
    },
    {
      icon: "📶",
      title: "Network",
      description: "SIM, Wi-Fi or network problems",
      link: "/troubleshooting",
    },
  ];

  return (
    <main className="home-page">

      {/* =================================================
          HERO SECTION
      ================================================= */}

      <section className="home-hero">

        <div className="home-container hero-container">

          {/* Hero Content */}

          <div className="hero-content">

            <span className="hero-badge">
              🔧 Smart Mobile Repair Assistance
            </span>

            <h1>
              Your Phone.
              <br />
              <span>Our Expertise.</span>
            </h1>

            <p className="hero-description">
              Diagnose mobile problems, understand possible
              causes, find repair solutions and explore
              genuine parts & pricing — all in one place.
            </p>

            <div className="hero-actions">

              <Link
                to="/troubleshooting"
                className="home-primary-btn"
              >
                🔧 Diagnose My Problem
              </Link>

              <Link
                to="/parts"
                className="home-secondary-btn"
              >
                🔩 Explore Parts
              </Link>

            </div>

            <div className="hero-trust">

              <div className="trust-item">
                <span>✓</span>
                Easy Diagnosis
              </div>

              <div className="trust-item">
                <span>✓</span>
                Clear Pricing
              </div>

              <div className="trust-item">
                <span>✓</span>
                Repair Guidance
              </div>

            </div>

          </div>


          {/* Hero Visual */}

          <div className="hero-visual">

            <div className="phone-glow"></div>

            <div className="phone-device">

              <div className="phone-screen">

                <div className="phone-camera"></div>

                <div className="phone-screen-content">

                  <div className="phone-status">
                    <span>9:41</span>
                    <span>● ● ▰</span>
                  </div>

                  <div className="phone-logo">
                    🔧
                  </div>

                  <strong>
                    RepairX
                  </strong>

                  <p>
                    What's wrong with your phone?
                  </p>

                  <div className="phone-option">
                    🔋 Battery
                  </div>

                  <div className="phone-option">
                    🔌 Charging
                  </div>

                  <div className="phone-option">
                    📱 Display
                  </div>

                </div>

              </div>

            </div>


            {/* Floating Cards */}

            <div className="floating-card floating-card-top">

              <span className="floating-icon">
                ✓
              </span>

              <div>
                <strong>
                  Quick Diagnosis
                </strong>

                <small>
                  Find the problem faster
                </small>
              </div>

            </div>


            <div className="floating-card floating-card-bottom">

              <span className="floating-icon">
                ₹
              </span>

              <div>
                <strong>
                  Clear Pricing
                </strong>

                <small>
                  Know before you repair
                </small>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          PROBLEM CATEGORIES
      ================================================= */}

      <section className="problem-section">

        <div className="home-container">

          <div className="section-heading">

            <span className="home-section-label">
              FIND YOUR PROBLEM
            </span>

            <h2>
              What problem are you facing?
            </h2>

            <p>
              Choose a category to quickly find
              troubleshooting information for your phone.
            </p>

          </div>


          {/* Problem Cards */}

          <div className="home-problem-grid">

            {problemCategories.map(
              (category, index) => (

                <Link
                  to={category.link}
                  className="home-problem-card"
                  key={index}
                >

                  {/* Icon */}

                  <div className="home-problem-icon">
                    {category.icon}
                  </div>


                  {/* Content */}

                  <div className="home-problem-card-content">

                    <h3>
                      {category.title}
                    </h3>

                    <p>
                      {category.description}
                    </p>

                  </div>


                  {/* Arrow */}

                  <span className="home-problem-arrow">
                    →
                  </span>

                </Link>

              )
            )}

          </div>

        </div>

      </section>


      {/* =================================================
          HOW IT WORKS
      ================================================= */}

      <section className="how-section">

        <div className="home-container">

          <div className="section-heading center-heading">

            <span className="home-section-label">
              SIMPLE PROCESS
            </span>

            <h2>
              How RepairX works
            </h2>

            <p>
              Get from a phone problem to a clear
              repair direction in three simple steps.
            </p>

          </div>


          <div className="steps-container">

            {/* Step 1 */}

            <div className="step-card">

              <div className="step-number">
                01
              </div>

              <div className="step-icon">
                🔍
              </div>

              <h3>
                Diagnose
              </h3>

              <p>
                Select your phone problem and
                understand the possible causes
                and diagnostic steps.
              </p>

            </div>


            <div className="step-line"></div>


            {/* Step 2 */}

            <div className="step-card">

              <div className="step-number">
                02
              </div>

              <div className="step-icon">
                🔧
              </div>

              <h3>
                Repair
              </h3>

              <p>
                Follow the recommended solution
                or use the information to guide
                your repair technician.
              </p>

            </div>


            <div className="step-line"></div>


            {/* Step 3 */}

            <div className="step-card">

              <div className="step-number">
                03
              </div>

              <div className="step-icon">
                📍
              </div>

              <h3>
                Track
              </h3>

              <p>
                Keep your repair journey organized
                and track the status of your repair.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          WHY REPAIRX
      ================================================= */}

      <section className="why-section">

        <div className="home-container why-container">

          <div className="why-content">

            <span className="home-section-label">
              WHY REPAIRX
            </span>

            <h2>
              Everything you need to
              understand your repair.
            </h2>

            <p>
              RepairX makes mobile repair information
              easier to understand for customers,
              technicians and repair businesses.
            </p>

            <Link
              to="/about"
              className="why-link"
            >
              Learn more about RepairX →
            </Link>

          </div>


          <div className="benefits-grid">

            {/* Benefit 1 */}

            <div className="benefit-card">

              <div className="benefit-icon">
                🔍
              </div>

              <h3>
                Easy Diagnosis
              </h3>

              <p>
                Understand your phone problem
                without confusing technical language.
              </p>

            </div>


            {/* Benefit 2 */}

            <div className="benefit-card">

              <div className="benefit-icon">
                💰
              </div>

              <h3>
                Clear Pricing
              </h3>

              <p>
                Explore estimated parts and
                repair pricing before making decisions.
              </p>

            </div>


            {/* Benefit 3 */}

            <div className="benefit-card">

              <div className="benefit-icon">
                🔧
              </div>

              <h3>
                Repair Guidance
              </h3>

              <p>
                Follow structured diagnostic and
                recommended repair information.
              </p>

            </div>


            {/* Benefit 4 */}

            <div className="benefit-card">

              <div className="benefit-icon">
                📱
              </div>

              <h3>
                Mobile Friendly
              </h3>

              <p>
                Access your repair information
                easily from any device.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          CTA
      ================================================= */}

      <section className="home-cta">

        <div className="home-container">

          <div className="cta-box">

            <div>

              <span className="cta-label">
                NEED HELP WITH YOUR PHONE?
              </span>

              <h2>
                Start with a simple diagnosis.
              </h2>

              <p>
                Find out what might be wrong with
                your phone before you visit a repair shop.
              </p>

            </div>

            <Link
              to="/troubleshooting"
              className="cta-button"
            >
              🔧 Start Diagnosis
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;