import "./Hero.css";
function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-badge">
          🔧 Reliable Mobile Repair Assistance
        </span>

        <h1>
          Your Phone.
          <br />
          <span>Our Expertise.</span>
        </h1>

        <p>
          Diagnose problems, find solutions and get reliable
          repair assistance for your mobile phone.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            🔍 Diagnose My Phone
          </button>

          <button className="secondary-btn">
            🔧 Request a Repair
          </button>
        </div>

      </div>

    </section>
  );
}

export default Hero;