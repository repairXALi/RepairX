import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>
            <span>⚒</span> Repair<span className="footer-x">X</span>
          </h2>

          <p>
            Diagnose. Repair. Connect.
          </p>

          <p className="footer-description">
            RepairX helps users understand mobile problems,
            find troubleshooting solutions and explore repair
            information.
          </p>
        </div>


        <div className="footer-column">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/troubleshooting">Troubleshooting</a>
          <a href="/parts">Parts & Prices</a>
          <a href="/about">About</a>
        </div>


        <div className="footer-column">
          <h3>Services</h3>

          <a href="/troubleshooting">Phone Diagnosis</a>
          <a href="/repair">Repair Assistance</a>
          <a href="/parts">Parts & Pricing</a>
          <a href="/tracking">Repair Tracking</a>
        </div>


        <div className="footer-column">
          <h3>Contact</h3>

          <p>📧 support@repairx.com</p>
          <p>📞 +91 XXXXX XXXXX</p>
          <p>📍 Mumbai, India</p>
        </div>

      </div>


      <div className="footer-bottom">
        <p>
          © 2026 RepairX. All rights reserved.
        </p>

        <p>
          Built as a MERN Stack College Project
        </p>
      </div>

    </footer>
  );
}

export default Footer;