export default function AnalysisPage({ restartInterview }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lightblue-100 to-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8 fade-in">
        <h1 className="text-4xl font-bold text-blue-900 mb-4 title-text">
          Final Interview Analysis Report
        </h1>
        <p className="text-lg text-gray-600 subtitle-text">
          Your detailed performance analysis is ready!
        </p>
      </div>

      <div className="analysis-container">
        <table className="metric-table">
          <tbody>
            <tr className="metric-row">
              <td className="metric-cell">
                <div className="metric-item">
                  <span className="metric-emoji">🗣️</span>
                  <span className="metric-title">Total Filler Words Used:</span>
                </div>
              </td>
              <td className="metric-cell">
                <div className="metric-item">
                  <span className="metric-emoji">⏸️</span>
                  <span className="metric-title">Total Pauses Detected:</span>
                </div>
              </td>
              <td className="metric-cell">
                <div className="metric-item">
                  <span className="metric-emoji">😊</span>
                  <span className="metric-title">Overall Sentiment Score:</span>
                </div>
              </td>
              <td className="metric-cell">
                <div className="metric-item">
                  <span className="metric-emoji">😐</span>
                  <span className="metric-title">Facial Expression Summary:</span>
                </div>
              </td>
              <td className="metric-cell">
                <div className="metric-item">
                  <span className="metric-emoji">😎</span>
                  <span className="metric-title">Confidence Level:</span>
                </div>
              </td>
            </tr>

            <tr className="value-row">
              <td className="value-cell"><span className="metric-value">{/* Backend Value */}</span></td>
              <td className="value-cell"><span className="metric-value">{/* Backend Value */}</span></td>
              <td className="value-cell"><span className="metric-value">{/* Backend Value */}</span></td>
              <td className="value-cell"><span className="metric-value">{/* Backend Value */}</span></td>
              <td className="value-cell">
                <div className="confidence-bar-container">
                  <div className="confidence-bar" style={{ width: '75%' }}>
                    <span className="confidence-percent">75%</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center button-container">
        <button onClick={restartInterview} className="restart-button">
          Restart Interview
        </button>
      </div>
    </div>
  );
}
