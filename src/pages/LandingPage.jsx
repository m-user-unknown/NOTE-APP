function LandingPage({ onContinue }) {
  return (
    <main className="landing-page">
      <div className="landing-page__card">
        <p className="eyebrow">Sticky Note</p>
        <h1>Capture ideas in a tidy workspace</h1>
        <button type="button" className="primary-button" onClick={onContinue}>
          Open notes
        </button>
      </div>
    </main>
  );
}

export default LandingPage;
