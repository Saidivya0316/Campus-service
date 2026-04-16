import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Find What You Need",
      desc: "Explore student listings in your city and college network. Compare options for books, electronics, and lab tools."
    },
    {
      id: "02",
      title: "Contact & Negotiate",
      desc: "Connect directly with the seller in trusted campus areas. Check item details and duration of usage."
    },
    {
      id: "03",
      title: "Easy Pickup",
      desc: "Complete your transaction with local pickup at hostel gates or departments. Fast, safe, and relevant."
    }
  ];

  return (
    <section className="steps-section">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.id} className="step-card">
              <span className="step-number">{step.id}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;