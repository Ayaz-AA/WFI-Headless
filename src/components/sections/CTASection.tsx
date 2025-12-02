export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          {/* Left Content */}
          <div className="cta-column">
            <h2 className="cta-title">
              Faster outputs.
              <br />
              Better outcomes.
            </h2>
          </div>

          {/* Right Content */}
          <div className="cta-column-spaced">
            <p className="cta-text">
              Come see why leading businesses chose Jasper for better results using artificial intelligence.
            </p>
            <div className="cta-buttons">
              <button className="cta-button cta-button-outline">
                Start Free Trial
              </button>
              <button className="cta-button cta-button-filled">
                Get A Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

