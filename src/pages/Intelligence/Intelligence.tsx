import { useState } from 'react'
import Header from '../../components/layout/Header'

const Intelligence = () => {
  const [activeTab, setActiveTab] = useState<'clean-data' | 'identity-analysis' | 'enrich-data' | 'full-report'>('clean-data')
  const [distributionTab, setDistributionTab] = useState<'all' | 'selected'>('all')
  const [enrichDistributionTab, setEnrichDistributionTab] = useState<'all' | 'selected'>('selected')
  const [enrichSearch, setEnrichSearch] = useState('')
  const [selectedAttributes] = useState(['Age', 'Gender', 'Income Range', 'Home Owner Status'])

  const tabs = [
    { id: 'clean-data', label: 'Clean Data' },
    { id: 'identity-analysis', label: 'Identity Analysis' },
    { id: 'enrich-data', label: 'Enrich Data' },
    { id: 'full-report', label: 'Full Report' },
  ]

  return (
    <>
      <Header
        title="Match Report Intelligence"
        subtitle="Metrics & Analytics Dashboard"
        actions={
          <>
            <button className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3H13V13H3V3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M5 5H11M5 8H11M5 11H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Saved Reports
            </button>
            <button className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3H13V13H3V3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M5 5H11M5 8H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Save Report
            </button>
            <button className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Export to PDF
            </button>
            <button className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V8L11 11M14 8C14 11.866 10.866 15 7 15C3.13401 15 0 11.866 0 8C0 4.13401 3.13401 1 7 1C10.866 1 14 4.13401 14 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Start Over
            </button>
            <button className="share-btn">Share</button>
          </>
        }
      />

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Clean Data Tab Content */}
      {activeTab === 'clean-data' && (
        <div className="tab-content active">
          {/* Clean & Hygiene Section */}
          <div className="metric-section">
            <div className="section-header">
              <div className="section-icon green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h2 className="section-title">Clean & Hygiene</h2>
                <p className="section-description">Input data quality analysis and address validation.</p>
              </div>
            </div>
          </div>

          {/* Identity Resolution Section */}
          <div className="metric-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Identity Resolution</h2>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="metric-cards">
              <div className="metric-card">
                <div className="metric-value">7.2M</div>
                <div className="metric-label">TOTAL SOURCE IDS</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">4.8M</div>
                <div className="metric-label">TOTAL DEEP SYNC IDS</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">32.9%</div>
                <div className="metric-label">DEDUPLICATION RATE</div>
                <div className="metric-sublabel">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'inline-block', marginRight: '4px' }}>
                    <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6L8 2Z" fill="currentColor"/>
                  </svg>
                  Lightning fast
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar">
              <div className="progress-segment good" style={{ width: '85.1%' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '4px' }}>
                  <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6L8 2Z" fill="currentColor"/>
                </svg>
                Good Data
                <span style={{ marginLeft: '8px' }}>85.1%</span>
              </div>
              <div className="progress-segment warning" style={{ width: '10.5%' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '4px' }}>
                  <path d="M8 2L12 14L4 14L8 2Z" fill="currentColor"/>
                </svg>
                Duplicates
                <span style={{ marginLeft: '8px' }}>10.5%</span>
              </div>
              <div className="progress-segment bad" style={{ width: '4.4%' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '4px' }}>
                  <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6L8 2Z" fill="currentColor"/>
                </svg>
                Bad Data
                <span style={{ marginLeft: '8px' }}>4.4%</span>
              </div>
            </div>

            {/* Breakdown */}
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <div>
                <strong style={{ color: 'var(--success-green)' }}>Good Data:</strong> 4,256,800 records
              </div>
              <div>
                <strong style={{ color: 'var(--warning-orange)' }}>Duplicates:</strong> 523,400 records
              </div>
              <div>
                <strong style={{ color: 'var(--error-red)' }}>Bad Data:</strong> 219,800 records
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <a href="#" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                View details
              </a>
            </div>
          </div>

          {/* Address Validation Section */}
          <div className="metric-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Address Validation</h2>
                <p className="section-description">USPS deliverability and address update analysis.</p>
              </div>
            </div>

            <div className="metric-cards">
              <div className="metric-card">
                <div className="metric-value">4,758,000</div>
                <div className="metric-label">Total Addresses Processed</div>
                <div className="metric-sublabel">94.5% matched</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">4,495,600</div>
                <div className="metric-label">Total Addresses Matched</div>
                <div className="metric-sublabel">Successfully validated</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">892,400</div>
                <div className="metric-label">Updatable Addresses</div>
                <div className="metric-sublabel">18.8% of total (Lower is better)</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">4,495,600</div>
                <div className="metric-label">Deliverable Addresses</div>
                <div className="metric-sublabel">94.5% USPS validated</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Identity Analysis Tab Content */}
      {activeTab === 'identity-analysis' && (
        <div className="tab-content active">
          <div className="identity-analysis-layout">
            {/* Left column: Identity Resolution, Match Rank Filter, Match Type Distribution */}
            <div className="identity-analysis-left">
              {/* Identity Resolution & Linking Section */}
              <div className="metric-section">
                <div className="section-header">
                  <div className="section-icon purple">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L22 8V16L12 22L2 16V8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
                      <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="section-title">Identity Resolution & Linking</h2>
                    <p className="section-description">Match accuracy analysis and identity graph connections</p>
                  </div>
                </div>
              </div>

              {/* Match Rank Filter */}
              <div className="match-rank-filter">
                <div className="filter-header">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: 'var(--text-secondary)' }}>
                    <path d="M2 4H18M4 8H16M6 12H14M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h3 className="filter-title">Match Rank Filter</h3>
                  <div className="filter-details">
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>28/28 ranks • 633,560 records</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="filter-links">
                      <a href="#" className="filter-link">Deselect All</a>
                      <a href="#" className="filter-link">Show</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Type Distribution */}
              <div className="match-distribution">
            <div className="match-distribution-header">
              <h3 className="section-title" style={{ margin: 0 }}>Match Type Distribution</h3>
              <button type="button" className="match-distribution-chevron" aria-label="Collapse section">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 12L6 8H14L10 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="distribution-tabs">
              <button
                className={`distribution-tab ${distributionTab === 'all' ? 'active' : ''}`}
                onClick={() => setDistributionTab('all')}
              >
                All Matches
              </button>
              <button
                className={`distribution-tab ${distributionTab === 'selected' ? 'active' : ''}`}
                onClick={() => setDistributionTab('selected')}
              >
                Selected Match Types Only
              </button>
            </div>

            <div className="chart-container">
              <div className="pie-chart-placeholder">
                <svg width="400" height="400" viewBox="0 0 400 400" style={{ maxWidth: '100%', height: 'auto' }}>
                  <defs>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
                    </filter>
                  </defs>
                  <g filter="url(#shadow)">
                    <path d="M 200 200 L 200 50 A 150 150 0 0 1 267.5 50 Z" fill="#3b82f6" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 267.5 50 A 150 150 0 0 1 320 100 Z" fill="#8b5cf6" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 320 100 A 150 150 0 0 1 350 200 Z" fill="#10b981" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 350 200 A 150 150 0 0 1 320 300 Z" fill="#f59e0b" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 320 300 A 150 150 0 0 1 267.5 350 Z" fill="#ef4444" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 267.5 350 A 150 150 0 0 1 200 350 Z" fill="#06b6d4" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 200 350 A 150 150 0 0 1 132.5 350 Z" fill="#ec4899" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 132.5 350 A 150 150 0 0 1 80 300 Z" fill="#14b8a6" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 80 300 A 150 150 0 0 1 50 200 Z" fill="#a855f7" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 50 200 A 150 150 0 0 1 80 100 Z" fill="#6366f1" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 80 100 A 150 150 0 0 1 132.5 50 Z" fill="#f97316" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 132.5 50 A 150 150 0 0 1 200 50 Z" fill="#22c55e" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 200 50 A 150 150 0 0 1 250 80 Z" fill="#84cc16" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 250 80 A 150 150 0 0 1 290 130 Z" fill="#eab308" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 290 130 A 150 150 0 0 1 310 180 Z" fill="#64748b" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 310 180 A 150 150 0 0 1 320 200 Z" fill="#475569" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 320 200 A 150 150 0 0 1 310 250 Z" fill="#334155" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 310 250 A 150 150 0 0 1 280 290 Z" fill="#1e293b" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 280 290 A 150 150 0 0 1 240 320 Z" fill="#0f172a" stroke="white" strokeWidth="2"/>
                    <path d="M 200 200 L 240 320 A 150 150 0 0 1 200 350 Z" fill="#3b82f6" stroke="white" strokeWidth="2" opacity="0.7"/>
                    <path d="M 200 200 L 200 350 A 150 150 0 0 1 160 320 Z" fill="#8b5cf6" stroke="white" strokeWidth="2" opacity="0.7"/>
                  </g>
                  <circle cx="200" cy="200" r="100" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
                  <text x="200" y="190" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1f3a">Match Types</text>
                  <text x="200" y="215" textAnchor="middle" fontSize="14" fill="#6b7280">Distribution</text>
                </svg>
              </div>
              <div className="legend-container">
                {[
                  'Credit Card Matching',
                  'Exact First Name + Exact Last Name + Store Location',
                  'Exact First Name + Fuzzy Last Name + Store Location',
                  'First Name + Last Name + Addr1 + Zip',
                  'First Name + Last Name + Email',
                  'First Name + Last Name + Fuzzy Addr1',
                  'First Name + Last Name + Phone',
                  'First Name + Last Name + Postal',
                  'First Name + Last Name + Street Name',
                  'Fuzzy Email',
                  'Fuzzy First Name + Exact Last Name + Store Location',
                  'Fuzzy First Name + Fuzzy Last Name + Addr1 + Zip',
                  'Fuzzy First Name + Fuzzy Last Name + Email',
                  'Fuzzy First Name + Fuzzy Last Name + Phone',
                  'Fuzzy First Name + Fuzzy Last Name + Postal',
                  'Fuzzy First Name + Fuzzy Last Name + Street Name',
                  'Fuzzy First Name + Last Name + Addr1 + Zip',
                  'Fuzzy First Name + Last Name + Email',
                  'Fuzzy First Name + Last Name + Phone',
                  'Fuzzy First Name + Last Name + Postal',
                  'Fuzzy First Name + Last Name + Street Name',
                ].map((label, index) => {
                  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#14b8a6', '#a855f7', '#6366f1', '#f97316', '#22c55e', '#84cc16', '#eab308', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#3b82f6', '#8b5cf6']
                  return (
                    <div key={index} className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: colors[index % colors.length] }}></div>
                      <span className="legend-label">{label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', marginTop: '16px' }}>
              Use the Match Rank Filter above to toggle specific match types and see how they affect the overall distribution and stats.
            </p>
          </div>
            </div>

            {/* Right column: Summary Statistics */}
            <div className="identity-analysis-right">
              <div className="stats-panels stats-panels-vertical identity-analysis-stats">
                <div className="stat-panel stat-panel-centered">
                  <div className="stat-panel-title">TOTAL CUSTOMERS</div>
                  <div className="stat-panel-value stat-panel-value-block">4,800,000</div>
                  <div className="stat-panel-subtitle">Total records processed</div>
                </div>
                <div className="stat-panel stat-panel-centered">
                  <div className="stat-panel-title">TOTAL CUSTOMERS MATCHED</div>
                  <div className="stat-panel-value stat-panel-value-block">633,550</div>
                  <div className="stat-panel-progress">
                    <div className="stat-panel-progress-bar blue" style={{ width: '13.2%' }}></div>
                  </div>
                  <div className="stat-panel-subtitle">13.2% of total customers</div>
                </div>
                <div className="stat-panel stat-panel-highlight stat-panel-centered">
                  <div className="stat-panel-title stat-panel-title-with-growth">
                    UNIQUE DEEP SYNC IDs
                    <span className="growth-indicator">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 2L10 6H7V10H5V6H2L6 2Z" fill="currentColor"/>
                      </svg>
                      +2.3%
                    </span>
                  </div>
                  <div className="stat-panel-value stat-panel-value-block">579,064</div>
                  <div className="stat-panel-progress">
                    <div className="stat-panel-progress-bar purple" style={{ width: '91.4%' }}></div>
                  </div>
                  <div className="stat-panel-subtitle">91.4% match rate</div>
                  <div className="stat-panel-details">
                    <div className="stat-detail-item">
                      <span className="stat-detail-label">Households Linked:</span>
                      <span className="stat-detail-value">535,983 (84.6%)</span>
                    </div>
                    <div className="stat-detail-item">
                      <span className="stat-detail-label">Total Identity Nodes:</span>
                      <span className="stat-detail-value">2,339,418</span>
                    </div>
                    <div className="stat-detail-item">
                      <span className="stat-detail-label">Avg Identifiers per DS_ID:</span>
                      <span className="stat-detail-value">4.04</span>
                    </div>
                    <div className="stat-detail-item">
                      <span className="stat-detail-label">Multi-Device Households:</span>
                      <span className="stat-detail-value">67.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Identifier Metrics */}
          <div className="identifier-metrics">
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Identifier Metrics</h2>
            <div className="distribution-tabs">
              <button
                className={`distribution-tab ${distributionTab === 'all' ? 'active' : ''}`}
                onClick={() => setDistributionTab('all')}
              >
                All Matches
              </button>
              <button
                className={`distribution-tab ${distributionTab === 'selected' ? 'active' : ''}`}
                onClick={() => setDistributionTab('selected')}
              >
                Selected Match Types Only
              </button>
            </div>
            <table className="metrics-table">
              <thead>
                <tr>
                  <th className="sortable">Attribute Type</th>
                  <th>Records Matched</th>
                  <th>Records Appended</th>
                  <th className="sortable">Match Rate</th>
                  <th>Avg per Record</th>
                  <th>Coverage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Names', matched: '618,016 / 633,550', appended: '580,153', rate: 97.5, avg: 1.1, coverage: 'excellent' },
                  { type: 'Phones', matched: '584,521 / 633,550', appended: '549,501', rate: 92.3, avg: 1.9, coverage: 'excellent' },
                  { type: 'Mobile Advertising IDs (MAIDs)', matched: '572,219 / 633,550', appended: '534,550', rate: 90.3, avg: 2.4, coverage: 'excellent' },
                  { type: 'Email Addresses', matched: '571,831 / 633,550', appended: '539,682', rate: 90.3, avg: 1.8, coverage: 'excellent' },
                  { type: 'Physical Addresses', matched: '568,919 / 633,550', appended: '533,829', rate: 89.8, avg: 1.1, coverage: 'good' },
                  { type: 'IP Addresses', matched: '562,331 / 633,550', appended: '502,318', rate: 87.2, avg: 3.1, coverage: 'good' },
                  { type: 'UID2s', matched: '414,345 / 633,550', appended: '377,023', rate: 65.4, avg: 1.2, coverage: 'fair' },
                ].map((row, index) => (
                  <tr key={index}>
                    <td><strong>{row.type}</strong></td>
                    <td>{row.matched}</td>
                    <td>{row.appended}</td>
                    <td>
                      {row.rate}%
                      <div className="match-rate-bar">
                        <div className="match-rate-fill" style={{ width: `${row.rate}%` }}></div>
                      </div>
                    </td>
                    <td>{row.avg}</td>
                    <td>
                      <span className={`coverage-badge ${row.coverage}`}>
                        {row.coverage.charAt(0).toUpperCase() + row.coverage.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enrich Data Tab Content */}
      {activeTab === 'enrich-data' && (
        <div className="tab-content active">
          {/* Data Enrichment Explorer Section */}
          <div className="metric-section">
            <div className="section-header">
              <div className="section-icon purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="6" width="16" height="3" rx="1" fill="currentColor"/>
                  <rect x="4" y="10.5" width="16" height="3" rx="1" fill="currentColor"/>
                  <rect x="4" y="15" width="16" height="3" rx="1" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h2 className="section-title">Data Enrichment Explorer</h2>
                <p className="section-description">Build custom attribute tables and explore data distributions</p>
              </div>
            </div>
          </div>

          {/* Match Rank Filter */}
          <div className="match-rank-filter">
            <div className="filter-header">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: 'var(--text-secondary)' }}>
                <path d="M4 6H16M4 10H16M4 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 4L10 8L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="filter-title">Match Rank Filter</h3>
              <div className="filter-details">
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>28/28 ranks • 633,550 records</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="filter-links">
                  <a href="#" className="filter-link">Deselect All</a>
                  <a href="#" className="filter-link">Show</a>
                </div>
              </div>
            </div>
          </div>

          {/* Select Attributes */}
          <div className="enrich-select-attributes metric-section">
            <div className="select-attributes-header">
              <h3 className="section-title" style={{ margin: 0 }}>Select Attributes</h3>
              <span className="select-attributes-count" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                4 of 600+ attributes selected
              </span>
            </div>
            <input
              type="text"
              className="enrich-search-input"
              placeholder="Search from 600+ Deep Sync attributes..."
              value={enrichSearch}
              onChange={(e) => setEnrichSearch(e.target.value)}
            />
            <div className="attribute-tags">
              {selectedAttributes.map((attr) => (
                <span key={attr} className="attribute-tag">
                  {attr}
                  <button type="button" className="attribute-tag-remove" aria-label={`Remove ${attr}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Custom Attribute Analysis */}
          <div className="enrich-custom-analysis metric-section">
            <h3 className="section-title" style={{ marginBottom: '16px' }}>Custom Attribute Analysis</h3>
            <div className="distribution-tabs">
              <button
                className={`distribution-tab ${enrichDistributionTab === 'all' ? 'active' : ''}`}
                onClick={() => setEnrichDistributionTab('all')}
              >
                All Matches
              </button>
              <button
                className={`distribution-tab ${enrichDistributionTab === 'selected' ? 'active' : ''}`}
                onClick={() => setEnrichDistributionTab('selected')}
              >
                Selected Match Types Only
              </button>
            </div>
            <table className="custom-attribute-table metrics-table">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Fill Rate</th>
                  <th>Coverage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { attribute: 'Age', fillRate: 94.2, coverage: 'excellent' },
                  { attribute: 'Gender', fillRate: 93.8, coverage: 'excellent' },
                  { attribute: 'Income Range', fillRate: 89.3, coverage: 'good' },
                  { attribute: 'Home Owner Status', fillRate: 87.6, coverage: 'good' },
                ].map((row) => (
                  <tr key={row.attribute}>
                    <td><strong>{row.attribute}</strong></td>
                    <td>
                      <div className="fill-rate-cell">
                        <span>{row.fillRate}%</span>
                        <div className="match-rate-bar">
                          <div className="match-rate-fill enrich-fill" style={{ width: `${row.fillRate}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`coverage-badge ${row.coverage}`}>
                        {row.coverage.charAt(0).toUpperCase() + row.coverage.slice(1)}
                      </span>
                    </td>
                    <td>
                      <a href="#" className="view-distribution-link">&gt; View Distribution</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Full Report Tab Content */}
      {activeTab === 'full-report' && (
        <div className="tab-content active">
          {/* Full Match Report Header */}
          <div className="metric-section full-report-header">
            <div className="section-header" style={{ flexWrap: 'wrap', gap: '16px' }}>
              <div className="section-icon purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h2 className="section-title">Full Match Report</h2>
                <p className="section-description">Comprehensive tabular view of all matching metrics and data quality</p>
              </div>
              <button type="button" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Export Full Report
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Clean Data & Hygiene — Identity Resolution */}
          <div className="metric-section">
            <h2 className="section-title" style={{ marginBottom: '8px' }}>Clean Data & Hygiene</h2>
            <h3 className="full-report-subsection" style={{ marginBottom: '16px', fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)' }}>Identity Resolution</h3>
            <table className="report-table metrics-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Percentage</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Records Received', value: '7,160,000', pct: '100%', desc: 'Total number of records submitted' },
                  { metric: 'Records Removed', value: '2,360,000', pct: '33.0%', desc: 'Total number of records that were removed (cleaned + bad data)' },
                  { metric: 'Records Processed', value: '4,800,000', pct: '67.0%', desc: 'After deduplication and filtering of "bad" data' },
                  { metric: 'Records Cleaned', value: '1,840,000', pct: '25.7%', desc: 'Records that Deep Sync was able to standardize and process' },
                  { metric: 'Bad Data', value: '520,000', pct: '7.3%', desc: 'Data that is either duplicate or unmatchable due to missing data or invalid rows' },
                ].map((row) => (
                  <tr key={row.metric}>
                    <td><strong>{row.metric}</strong></td>
                    <td><strong>{row.value}</strong></td>
                    <td>{row.pct}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Address Validation */}
          <div className="metric-section">
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Address Validation</h2>
            <table className="report-table metrics-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Percentage</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Total Addresses Processed', value: '4,758,000', pct: '100%', desc: 'Total addresses submitted for validation' },
                  { metric: 'Total Addresses Matched', value: '4,495,600', pct: '94.5%', desc: 'Successfully validated addresses' },
                  { metric: 'Updatable Addresses', value: '892,400', pct: '18.8%', desc: 'Addresses that can be updated (Lower is better)' },
                  { metric: 'Deliverable Addresses', value: '4,495,600', pct: '94.5%', desc: 'USPS validated addresses' },
                ].map((row) => (
                  <tr key={row.metric}>
                    <td><strong>{row.metric}</strong></td>
                    <td><strong>{row.value}</strong></td>
                    <td>{row.pct}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Identity Analysis — Identity Resolution & Linking */}
          <div className="metric-section">
            <h2 className="section-title" style={{ marginBottom: '8px' }}>Identity Analysis</h2>
            <h3 className="full-report-subsection" style={{ marginBottom: '16px', fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)' }}>Identity Resolution & Linking</h3>
            <table className="report-table metrics-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Percentage</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Total Customers', value: '4,800,000', pct: '100%', desc: 'Total records processed' },
                  { metric: 'Total Customers Matched', value: '456,799', pct: '9.5%', desc: 'Customers successfully matched' },
                  { metric: 'Unique Deep Sync IDs', value: '417,514', pct: '91.4%', desc: 'Unique Deep Sync identifiers linked' },
                  { metric: 'Households Linked', value: '386,451', pct: '84.6%', desc: 'Household identifiers linked' },
                  { metric: 'Total Identity Nodes', value: '1,686,756', pct: '—', desc: 'Total nodes in identity graph' },
                  { metric: 'Avg Identifiers per DS_ID', value: '4.04', pct: '—', desc: 'Average identifiers per Deep Sync ID' },
                ].map((row) => (
                  <tr key={row.metric}>
                    <td><strong>{row.metric}</strong></td>
                    <td><strong>{row.value}</strong></td>
                    <td>{row.pct}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key metrics block: Total Identity Nodes, Avg Identifiers, Multi-Device Households */}
          <div className="full-report-kpis metric-section">
            <div className="full-report-kpi-row">
              <span className="full-report-kpi-value">1,686,756</span>
              <span className="full-report-kpi-desc">Total nodes in identity graph</span>
            </div>
            <div className="full-report-kpi-row">
              <span className="full-report-kpi-value">4.04</span>
              <span className="full-report-kpi-desc">Average identifiers per Deep Sync ID</span>
            </div>
            <div className="full-report-kpi-row">
              <span className="full-report-kpi-value">67.8%</span>
              <span className="full-report-kpi-desc">Percentage of multi-device households</span>
            </div>
          </div>

          {/* Identifier Metrics */}
          <div className="metric-section">
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Identifier Metrics</h2>
            <table className="report-table metrics-table">
              <thead>
                <tr>
                  <th>Attribute Type</th>
                  <th>Matched</th>
                  <th>Appended</th>
                  <th>Total</th>
                  <th>Match Rate</th>
                  <th>Avg per Record</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Mobile Advertising IDs (MAIDs)', matched: '412,580', appended: '385,420', total: '456,800', rate: '90.3%', avg: '2.4' },
                  { type: 'IP Addresses', matched: '398,240', appended: '362,180', total: '456,800', rate: '87.2%', avg: '3.1' },
                  { type: 'UID2s', matched: '298,750', appended: '271,840', total: '456,800', rate: '65.4%', avg: '1.2' },
                  { type: 'Email Addresses', matched: '412,300', appended: '389,120', total: '456,800', rate: '90.3%', avg: '1.8' },
                  { type: 'Phones', matched: '421,450', appended: '396,200', total: '456,800', rate: '92.3%', avg: '1.9' },
                  { type: 'Names', matched: '445,600', appended: '418,300', total: '456,800', rate: '97.5%', avg: '1.1' },
                  { type: 'Physical Addresses', matched: '410,200', appended: '384,900', total: '456,800', rate: '89.8%', avg: '1.1' },
                ].map((row) => (
                  <tr key={row.type}>
                    <td><strong>{row.type}</strong></td>
                    <td>{row.matched}</td>
                    <td>{row.appended}</td>
                    <td>{row.total}</td>
                    <td>{row.rate}</td>
                    <td>{row.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Enrich Data */}
          <div className="metric-section">
            <h2 className="section-title" style={{ marginBottom: '4px' }}>Enrich Data</h2>
            <p className="section-description" style={{ marginBottom: '16px' }}>Selected Attributes (4 of 600+)</p>
            <table className="report-table metrics-table custom-attribute-table">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Fill Rate</th>
                  <th>Coverage</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { attribute: 'Age', fillRate: 94.2, coverage: 'excellent', desc: 'Age demographic data' },
                  { attribute: 'Gender', fillRate: 93.8, coverage: 'excellent', desc: 'Gender demographic data' },
                  { attribute: 'Income Range', fillRate: 89.3, coverage: 'good', desc: 'Household income data' },
                  { attribute: 'Home Owner Status', fillRate: 87.6, coverage: 'good', desc: 'Home ownership status' },
                ].map((row) => (
                  <tr key={row.attribute}>
                    <td><strong>{row.attribute}</strong></td>
                    <td>
                      <div className="fill-rate-cell">
                        <span>{row.fillRate}%</span>
                        <div className="match-rate-bar">
                          <div className="match-rate-fill enrich-fill" style={{ width: `${row.fillRate}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`coverage-badge ${row.coverage}`}>
                        {row.coverage.charAt(0).toUpperCase() + row.coverage.slice(1)}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export default Intelligence
