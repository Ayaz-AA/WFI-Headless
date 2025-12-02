export default function StatsSection() {
  const stats = [
    { value: '12M', label: 'Resumes created' },
    { value: '65M+', label: 'Resumes reviewed' },
    { value: '10M', label: 'Jobs' },
    { value: '11.2M', label: 'Users worldwide' },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-list">
          {stats.map((stat, index) => (
            <div key={index} className="stats-item">
              <h3 className="stats-value">
                {stat.value}
              </h3>
              <p className="stats-label">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

