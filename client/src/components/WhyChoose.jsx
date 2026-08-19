import "./WhyChoose.css";

function WhyChoose() {
  const benefits = [
    {
      icon: "🔍",
      title: "Easy Diagnosis",
      description:
        "Understand possible causes of common mobile problems with simple troubleshooting guidance.",
    },
    {
      icon: "💰",
      title: "Transparent Pricing",
      description:
        "Check estimated part and repair costs before proceeding with a repair.",
    },
    {
      icon: "🔧",
      title: "Expert Repair Assistance",
      description:
        "Get practical repair guidance and professional assistance for your device.",
    },
    {
      icon: "📍",
      title: "Repair Tracking",
      description:
        "Track your repair request from diagnosis to completion.",
    },
  ];

  return (
    <section className="why-section">

      <div className="why-heading">
        <span>WHY REPAIRX?</span>

        <h2>
          Everything You Need for a
          <br />
          Better Repair Experience
        </h2>

        <p>
          RepairX makes mobile repair simpler, more transparent,
          and easier to understand.
        </p>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <div className="benefit-card" key={benefit.title}>

            <div className="benefit-icon">
              {benefit.icon}
            </div>

            <h3>{benefit.title}</h3>

            <p>{benefit.description}</p>

          </div>
        ))}
      </div>

    </section>
  );
}

export default WhyChoose;