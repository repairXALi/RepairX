import "./ProblemSection.css";

function ProblemSection() {
  const problems = [
    {
      icon: "🔋",
      name: "Battery",
      description: "Drains fast or not charging",
    },
    {
      icon: "📱",
      name: "Display",
      description: "Cracked screen or display issues",
    },
    {
      icon: "🔌",
      name: "Charging",
      description: "Not charging or slow charging",
    },
    {
      icon: "🔊",
      name: "Speaker",
      description: "Low sound or no sound",
    },
    {
      icon: "📷",
      name: "Camera",
      description: "Blurry or not working",
    },
    {
      icon: "📶",
      name: "Network",
      description: "No signal or connection issues",
    },
  ];

  return (
    <section className="problem-section">
      <div className="section-heading">
        <span>REPAIR ASSISTANCE</span>

        <h2>What seems to be the problem?</h2>

        <p>
          Select your phone problem and find possible causes
          and troubleshooting solutions.
        </p>
      </div>

      <div className="problem-grid">
        {problems.map((problem) => (
          <div className="problem-card" key={problem.name}>
            <div className="problem-icon">
              {problem.icon}
            </div>

            <h3>{problem.name}</h3>

            <p>{problem.description}</p>

            <button>
              Check Problem →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProblemSection;