export default function WhySection() {
  const features = [
    { title: "Built for Students", desc: "Categories aligned with college use cases." },
    { title: "Campus Convenience", desc: "Local pickup at hostel gates or departments." },
    { title: "Trusted Community", desc: "Buy from and sell to people you know." }
  ];

  return (
    <section className="why-section">
      <h2>Why Campus Service Works</h2>
      <div className="feature-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}