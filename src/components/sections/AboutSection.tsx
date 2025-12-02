export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-column">
            <h2 className="about-title">
              Our Programs
            </h2>
            <p className="about-text">
              At Workforce Institute, we empower professionals to advance their careers in high-demand fields through hands-on, project-driven learning. Our online training programs offer affordable pathways to valuable careers, providing:
            </p>
            <ul className="about-list">
              <li className="about-list-item">
                <span className="about-list-check">✓</span>
                <p className="about-list-text">
                  Get unlimited design inspirations. Level up your design.
                </p>
              </li>
              <li className="about-list-item">
                <span className="about-list-check">✓</span>
                <p className="about-list-text">
                  14+ Premium tailwind UI kits. Start with unlimited product downloads.
                </p>
              </li>
            </ul>
            <button className="about-button">
              Explore More Stories
            </button>
          </div>
          <div className="about-column">
            <h3 className="about-subtitle">
              The all-in-one career companion
            </h3>
            <p className="about-subtext">
              It's a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don't have.
            </p>
            <button className="about-button">
              Explore Customer Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

