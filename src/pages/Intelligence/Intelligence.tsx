import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const REPORT_SUB_TABS = [
  { tab: 'job-overview', label: 'Job Overview', hasDot: false },
  { tab: 'identity-analysis', label: 'Identity Analysis', hasDot: true },
  { tab: 'enrich-data', label: 'Enrich Data', hasDot: true },
  { tab: 'recommendations', label: 'Recommendations', hasDot: true },
  { tab: 'full-report', label: 'Full Report', hasDot: false },
] as const

type ReportTab = (typeof REPORT_SUB_TABS)[number]['tab']

const Intelligence = () => {
  const [searchParams] = useSearchParams()
  const currentTab = (searchParams.get('tab') as ReportTab) || 'job-overview'
  const [distributionTab, setDistributionTab] = useState<'all' | 'selected'>('all')
  const [enrichDistributionTab, setEnrichDistributionTab] = useState<'all' | 'selected'>('selected')
  const [selectedAttributes] = useState(['Age', 'Gender', 'Income Range', 'Home Owner Status'])

  const reportName = 'b2b_prospects_q4.xlsx'

  return (
    <>
      <header className="match-report-header">
        <div className="match-report-header-left">
          <h1 className="match-report-title">Match Report</h1>
          <span className="match-report-name">
            {reportName}
            <button type="button" className="match-report-name-edit" aria-label="Edit report name">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M11.5 2.5L13.5 4.5L5 13H2V10L11.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </span>
        </div>
        <div className="match-report-header-actions">
          <button type="button" className="match-report-icon-btn" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C6.5 2 4 4.5 4 8V11L-1 16V17H21V16L16 11V8C16 4.5 13.5 2 10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button type="button" className="match-report-icon-btn" aria-label="Bookmark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4H16V17L10 14L4 17V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button type="button" className="match-report-btn match-report-btn--green">Rep Tracker</button>
          <button type="button" className="match-report-btn match-report-btn--blue">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Export
          </button>
        </div>
      </header>

      <div className="match-report-banner">
        <div className="match-report-banner-stats">
          <div className="match-report-banner-left">
            <span className="match-report-banner-label">LIVE MATCH RATE</span>
            <span className="match-report-banner-value">91.4%</span>
          </div>
          <div className="match-report-banner-right">
            <span className="match-report-banner-label">AFTER FILTERING</span>
            <span className="match-report-banner-value">456,800 / 456,800</span>
          </div>
        </div>
        <div className="match-report-banner-actions">
          <button type="button" className="match-report-ranks-btn">28/28 RANKS</button>
          <button type="button" className="match-report-filters-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Adjust Filters
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="report-sub-tabs">
        {REPORT_SUB_TABS.map((item) => (
          <Link
            key={item.tab}
            to={`/test-match-service/intelligence?tab=${item.tab}`}
            className={`report-sub-tab ${currentTab === item.tab ? 'active' : ''}`}
          >
            {item.hasDot && currentTab !== item.tab && <span className="report-sub-tab-dot" aria-hidden />}
            {item.label}
          </Link>
        ))}
      </div>

      {currentTab === 'job-overview' && (
        <div className="tab-content active match-report-tab-content">
          <div className="executive-summary-card">
            <div className="executive-summary-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L18 10L24 12L18 14L16 20L14 14L8 12L14 10L16 4Z" fill="currentColor" opacity="0.9"/>
                <circle cx="16" cy="16" r="3" fill="currentColor"/>
              </svg>
            </div>
            <div className="executive-summary-body">
              <h3 className="executive-summary-title">Executive Summary</h3>
              <p className="executive-summary-hint">Click to expand insights</p>
            </div>
            <div className="executive-summary-meta">
              <span className="executive-summary-ai">AI GENERATED</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className="match-report-section">
            <h2 className="match-report-section-title">
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M3 8H17M8 3V17" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Identity Resolution Breakdown
            </h2>
            <div className="identity-resolution-summary-card">
              <div className="identity-resolution-bar">
                <div className="identity-resolution-bar-segment identity-resolution-bar--blue" style={{ width: '30.5%' }} />
                <div className="identity-resolution-bar-segment identity-resolution-bar--orange" style={{ width: '41%' }} />
                <div className="identity-resolution-bar-segment identity-resolution-bar--red" style={{ width: '28.5%' }} />
              </div>
              <div className="identity-resolution-metrics">
                <span className="identity-resolution-metric identity-resolution-metric--blue">Processed 456,800</span>
                <span className="identity-resolution-metric identity-resolution-metric--orange">Cleaned 187,650</span>
                <span className="identity-resolution-metric-right">1,500,000 Total Records Received</span>
                <span className="identity-resolution-match-rate">MATCH RATE 91.4%</span>
                <span className="identity-resolution-processed">456,800 of 456,800 processed</span>
              </div>
            </div>
            <div className="job-overview-metric-cards">
              <div className="job-overview-metric-card job-overview-metric-card--matched">
                <div className="job-overview-metric-icon job-overview-metric-icon--blue">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="job-overview-metric-content">
                  <span className="job-overview-metric-title">Matched</span>
                  <span className="job-overview-metric-value job-overview-metric-value--blue">91.4%</span>
                  <span className="job-overview-metric-sub">456,800 records</span>
                  <div className="job-overview-metric-bar job-overview-metric-bar--blue" style={{ width: '91.4%' }} />
                </div>
              </div>
              <div className="job-overview-metric-card job-overview-metric-card--cleaned">
                <div className="job-overview-metric-icon job-overview-metric-icon--orange">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 4H16V16H4V4Z" stroke="white" strokeWidth="2" fill="none"/>
                    <path d="M4 4L16 4L12 8H8L4 4Z" fill="white" fillOpacity="0.3"/>
                  </svg>
                </div>
                <div className="job-overview-metric-content">
                  <span className="job-overview-metric-title">Cleaned</span>
                  <span className="job-overview-metric-value job-overview-metric-value--orange">12.5%</span>
                  <span className="job-overview-metric-sub">187,650 records</span>
                  <div className="job-overview-metric-bar job-overview-metric-bar--orange" style={{ width: '12.5%' }} />
                </div>
              </div>
              <div className="job-overview-metric-card job-overview-metric-card--bad">
                <div className="job-overview-metric-icon job-overview-metric-icon--red">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 6V10M10 14H10.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div className="job-overview-metric-content">
                  <span className="job-overview-metric-title">Bad Data</span>
                  <span className="job-overview-metric-value job-overview-metric-value--red">4.3%</span>
                  <span className="job-overview-metric-sub">64,457 records</span>
                  <div className="job-overview-metric-bar job-overview-metric-bar--red" style={{ width: '4.3%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="match-report-section">
            <h2 className="match-report-section-title">
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                <path d="M2 6C2 4.9 2.9 4 4 4H16C17.1 4 18 4.9 18 6V14C18 15.1 17.1 16 16 16H4C2.9 16 2 15.1 2 14V6Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M4 8H16M6 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 14L9 11L11 14L13 11L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Data Hygiene Breakdown
            </h2>
            <div className="data-hygiene-breakdown">
              <div className="data-hygiene-card">
                <div className="data-hygiene-card-icon data-hygiene-card-icon--blue">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2C6.5 2 4 5 4 8.5C4 12.5 10 18 10 18S16 12.5 16 8.5C16 5 13.5 2 10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="10" cy="8" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <span className="data-hygiene-card-title">TOTAL ADDRESSES</span>
                <span className="data-hygiene-card-value data-hygiene-card-value--blue">1,247,893</span>
                <span className="data-hygiene-card-sub">Processed for validation.</span>
              </div>
              <div className="data-hygiene-card">
                <div className="data-hygiene-card-icon data-hygiene-card-icon--green">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="data-hygiene-card-title">ADDRESSES MATCHED</span>
                <span className="data-hygiene-card-value data-hygiene-card-value--green">1,138,451</span>
                <span className="data-hygiene-card-sub">91.2% match rate.</span>
              </div>
              <div className="data-hygiene-card">
                <div className="data-hygiene-card-icon data-hygiene-card-icon--purple">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17 10H3M3 10L8 5M3 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="data-hygiene-card-title">UPDATABLE</span>
                <span className="data-hygiene-card-value data-hygiene-card-value--purple">234,567</span>
                <span className="data-hygiene-card-sub">Require NCOA update.</span>
              </div>
              <div className="data-hygiene-card">
                <div className="data-hygiene-card-icon data-hygiene-card-icon--green">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2 6C2 4.9 2.9 4 4 4H16C17.1 4 18 4.9 18 6V14C18 15.1 17.1 16 16 16H4C2.9 16 2 15.1 2 14V6Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M4 8H16M6 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="data-hygiene-card-title">DELIVERABLE</span>
                <span className="data-hygiene-card-value data-hygiene-card-value--green">1,089,234</span>
                <span className="data-hygiene-card-sub">87.3% deliverable.</span>
              </div>
            </div>
          </div>

          <div className="start-new-analysis-wrap">
            <Link to="/test-match-service/run" className="start-new-analysis-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 10L5 8V12L3 10ZM10 3L8 5H12L10 3ZM17 10L15 8V12L17 10ZM10 17L8 15H12L10 17ZM5 5L7 7H3V3H7L5 5ZM15 5L13 7H17V3H13L15 5ZM5 15L7 13H3V17H7L5 15ZM15 15L13 13H17V17H13L15 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Start New Analysis
            </Link>
          </div>
        </div>
      )}

      {currentTab === 'identity-analysis' && (
        <div className="tab-content active match-report-tab-content">
          {/* Key Insights */}
          <div className="identity-key-insights-card">
            <div className="identity-key-insights-header">
              <div className="identity-key-insights-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="identity-key-insights-title">Key Insights</h3>
              <button type="button" className="identity-key-insights-chevron" aria-label="Collapse">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 12L10 7L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="identity-key-insights-list">
              <div className="identity-key-insight-item">
                <div className="identity-key-insight-icon identity-key-insight-icon--blue">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M4 18c0-3.5 2.5-5 6-5s6 1.5 6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M14 8l2 2-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="identity-key-insight-text"><strong>High Match Coverage:</strong> 91.4% of matched customers successfully linked to Deep Sync IDs, enabling comprehensive identity resolution.</p>
              </div>
              <div className="identity-key-insight-item">
                <div className="identity-key-insight-icon identity-key-insight-icon--purple">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="13" cy="6" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M2 16c0-2.5 2-4 5-4s5 1.5 5 4M12 16c0-2.5 2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="identity-key-insight-text"><strong>Household Resolution:</strong> 84.6% household linkage rate with an average of 2.38 individuals per household.</p>
              </div>
            </div>
          </div>

          {/* Match Type Analysis */}
          <div className="identity-match-type-analysis-card">
            <div className="identity-match-type-analysis-header">
              <h3 className="identity-match-type-analysis-title">Match Type Analysis</h3>
              <div className="identity-match-type-analysis-toggles">
                <button
                  type="button"
                  className={`identity-match-type-toggle ${distributionTab === 'all' ? 'active' : ''}`}
                  onClick={() => setDistributionTab('all')}
                >
                  All Matches
                </button>
                <button
                  type="button"
                  className={`identity-match-type-toggle ${distributionTab === 'selected' ? 'active' : ''}`}
                  onClick={() => setDistributionTab('selected')}
                >
                  Selected Match Types Only
                </button>
              </div>
            </div>
            <p className="identity-match-type-summary">28/28 match types selected • 633,550 records active</p>
            <div className="identity-match-type-rate">
              <span className="identity-match-type-rate-value">91.4%</span>
              <span className="identity-match-type-rate-label">Overall Match Rate</span>
            </div>
          </div>

          {/* Top 10 Match Types Distribution */}
          <div className="identity-top10-card">
            <h3 className="identity-top10-title">Top 10 Match Types Distribution</h3>
            <div className="identity-top10-content">
              <div className="identity-top10-chart">
                <svg width="320" height="320" viewBox="0 0 320 320" style={{ maxWidth: '100%', height: 'auto' }}>
                  <defs>
                    <filter id="identity-pie-shadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
                    </filter>
                  </defs>
                  <g filter="url(#identity-pie-shadow)">
                    <path d="M160 160 L160 40 A 120 120 0 0 1 243.9 76 Z" fill="#22c55e" stroke="white" strokeWidth="2"/>
                    <path d="M160 160 L243.9 76 A 120 120 0 0 1 283.9 160 Z" fill="#3b82f6" stroke="white" strokeWidth="2"/>
                    <path d="M160 160 L283.9 160 A 120 120 0 0 1 243.9 244 Z" fill="#ef4444" stroke="white" strokeWidth="2"/>
                    <path d="M160 160 L243.9 244 A 120 120 0 0 1 160 280 Z" fill="#f59e0b" stroke="white" strokeWidth="2"/>
                    <path d="M160 160 L160 280 A 120 120 0 0 1 76.1 244 Z" fill="#8b5cf6" stroke="white" strokeWidth="2"/>
                    <path d="M160 160 L76.1 244 A 120 120 0 0 1 36.1 160 Z" fill="#f97316" stroke="white" strokeWidth="2"/>
                    <path d="M160 160 L36.1 160 A 120 120 0 0 1 76.1 76 Z" fill="#eab308" stroke="white" strokeWidth="2"/>
                    <path d="M160 160 L76.1 76 A 120 120 0 0 1 136 52 Z" fill="#dc2626" stroke="white" strokeWidth="2"/>
                    <path d="M160 160 L136 52 A 120 120 0 0 1 184 52 Z" fill="#06b6d4" stroke="white" strokeWidth="2"/>
                    <path d="M160 160 L184 52 A 120 120 0 0 1 243.9 76 Z" fill="#6366f1" stroke="white" strokeWidth="2"/>
                  </g>
                  <circle cx="160" cy="160" r="70" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
                </svg>
              </div>
              <div className="identity-top10-legend">
                {[
                  { label: 'First Name + Last Name + Postal', count: '145,280', color: '#22c55e' },
                  { label: 'First Name + Last Name + Email', count: '89,450', color: '#3b82f6' },
                  { label: 'Exact First Name + Exact Last Name + Store Location', count: '82,340', color: '#ef4444' },
                  { label: 'Credit Card Matching', count: '76,230', color: '#f59e0b' },
                  { label: 'First Name + Last Name + Phone', count: '67,320', color: '#8b5cf6' },
                  { label: 'Fuzzy First Name + Last Name + Postal', count: '42,150', color: '#f97316' },
                  { label: 'First Name + Last Name + Street Name', count: '28,940', color: '#eab308' },
                  { label: 'First Name + Last Name + Addr1 + Zip', count: '18,760', color: '#dc2626' },
                  { label: 'First Name + Last Name + Fuzzy Addr1', count: '12,580', color: '#06b6d4' },
                  { label: 'Fuzzy First Name + Exact Last Name + Store Location', count: '12,560', color: '#6366f1' },
                ].map((item, i) => (
                  <div key={i} className="identity-top10-legend-item">
                    <span className="identity-top10-legend-dot" style={{ backgroundColor: item.color }} />
                    <span className="identity-top10-legend-label">{item.label}</span>
                    <span className="identity-top10-legend-count">- {item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary metrics */}
          <div className="identity-summary-cards">
            <div className="identity-summary-card">
              <span className="identity-summary-card-title">RECORDS PROCESSED</span>
              <span className="identity-summary-card-value">500,000</span>
              <span className="identity-summary-card-sub">Input records</span>
            </div>
            <div className="identity-summary-card identity-summary-card--matched">
              <span className="identity-summary-card-title">RECORDS MATCHED</span>
              <span className="identity-summary-card-value identity-summary-card-value--blue">456,800</span>
              <div className="identity-summary-card-bar identity-summary-card-bar--blue" style={{ width: '91.4%' }} />
              <span className="identity-summary-card-sub">91.4% match rate</span>
            </div>
            <div className="identity-summary-card identity-summary-card--dsids">
              <span className="identity-summary-card-title">
                UNIQUE DEEP SYNC IDs
                <span className="identity-summary-growth">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2L10 6H7V10H5V6H2L6 2Z" fill="currentColor"/>
                  </svg>
                  +2.3%
                </span>
              </span>
              <span className="identity-summary-card-value identity-summary-card-value--gradient">417,515</span>
              <div className="identity-summary-card-bar identity-summary-card-bar--gradient" style={{ width: '91.4%' }} />
              <span className="identity-summary-card-sub">91.4% DS_ID rate</span>
            </div>
          </div>

          {/* Identity Graph Metrics */}
          <div className="identity-graph-metrics">
            <h3 className="identity-graph-metrics-title">Identity Graph Metrics</h3>
            <div className="identity-graph-metrics-row">
              <div className="identity-graph-metric-item">
                <span className="identity-graph-metric-value">386,452</span>
                <span className="identity-graph-metric-sub">84.6%</span>
                <span className="identity-graph-metric-label">Households</span>
              </div>
              <div className="identity-graph-metric-item">
                <span className="identity-graph-metric-value">4.04</span>
                <span className="identity-graph-metric-sub">Identifiers</span>
                <span className="identity-graph-metric-label">Avg IDs/DS_ID</span>
              </div>
              <div className="identity-graph-metric-item">
                <span className="identity-graph-metric-value">67.8%</span>
                <span className="identity-graph-metric-sub">Coverage</span>
                <span className="identity-graph-metric-label">Multi-Device HH</span>
              </div>
            </div>
            <p className="identity-graph-metrics-hint">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C7 2 5 4.5 5 7.5C5 9.5 6 11 7.5 12V14H12.5V12C14 11 15 9.5 15 7.5C15 4.5 13 2 10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14V16H12V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Toggle match types in the filter to see real-time updates in the distribution chart and metrics
            </p>
          </div>

          {/* Identifier Metrics */}
          <div className="identity-identifier-metrics">
            <div className="identity-identifier-metrics-header">
              <h3 className="identity-identifier-metrics-title">Identifier Metrics</h3>
              <button type="button" className="identity-identifier-metrics-chevron" aria-label="Collapse section">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 12L10 7L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="identity-identifier-toggles">
              <button
                type="button"
                className={`identity-match-type-toggle ${distributionTab === 'all' ? 'active' : ''}`}
                onClick={() => setDistributionTab('all')}
              >
                All Matches
              </button>
              <button
                type="button"
                className={`identity-match-type-toggle ${distributionTab === 'selected' ? 'active' : ''}`}
                onClick={() => setDistributionTab('selected')}
              >
                Selected Match Types Only
              </button>
            </div>
            <table className="identity-identifier-table">
              <thead>
                <tr>
                  <th className="identity-identifier-th-sortable">IDENTIFIER TYPE <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></th>
                  <th>MATCHED RECORDS</th>
                  <th className="identity-identifier-th-sortable">MATCH RATE <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Name', matched: '587,448', rate: 92.7 },
                  { type: 'Mobile Advertising IDs (MAIDs)', matched: '572,219', rate: 90.3 },
                  { type: 'IP Addresses', matched: '552,331', rate: 87.2 },
                  { type: 'Physical Address', matched: '552,622', rate: 87.2 },
                  { type: 'Email', matched: '540,098', rate: 85.2 },
                  { type: 'Phone', matched: '488,449', rate: 77.1 },
                  { type: 'UID2s', matched: '414,345', rate: 65.4 },
                ].map((row, i) => (
                  <tr key={i}>
                    <td><strong>{row.type}</strong></td>
                    <td>{row.matched}</td>
                    <td>
                      <div className="identity-identifier-rate-cell">
                        <span>{row.rate}%</span>
                        <div className="identity-identifier-rate-bar">
                          <div className="identity-identifier-rate-fill" style={{ width: `${row.rate}%` }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentTab === 'recommendations' && (
        <div className="tab-content active match-report-tab-content">
          <div className="metric-section">
            <div className="section-header">
              <div className="section-icon purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10 2C7 2 5 4.5 5 7.5C5 9.5 6 11 7.5 12V14H12.5V12C14 11 15 9.5 15 7.5C15 4.5 13 2 10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14V16H12V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h2 className="section-title">Recommendations</h2>
                <p className="section-description">AI-powered recommendations to improve your match results and data quality.</p>
              </div>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', padding: '24px 0' }}>Recommendations content will be available here.</p>
        </div>
      )}

      {currentTab === 'enrich-data' && (
        <div className="tab-content active match-report-tab-content">
          {/* Summary cards */}
          <div className="enrich-summary-cards">
            <div className="enrich-summary-card">
              <div className="enrich-summary-card-icon enrich-summary-card-icon--blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M4 10H20M10 4V20" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="enrich-summary-card-title">ATTRIBUTES APPENDED</span>
              <span className="enrich-summary-card-value">4</span>
            </div>
            <div className="enrich-summary-card">
              <div className="enrich-summary-card-icon enrich-summary-card-icon--green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="enrich-summary-card-title">AVERAGE FILL RATE</span>
              <span className="enrich-summary-card-value">74.2%</span>
            </div>
            <div className="enrich-summary-card">
              <div className="enrich-summary-card-icon enrich-summary-card-icon--purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="enrich-summary-card-title">COVERAGE</span>
              <span className="enrich-summary-card-value">159,727</span>
            </div>
          </div>

          {/* Attribute Selection */}
          <div className="enrich-attribute-selection">
            <div className="enrich-attribute-selection-header">
              <div>
                <h3 className="enrich-attribute-selection-title">Attribute Selection</h3>
                <p className="enrich-attribute-selection-sub">Search from 600+ Deep Sync attributes</p>
              </div>
              <button type="button" className="enrich-add-attribute-btn">+ Add Attribute</button>
            </div>
            <div className="enrich-attribute-tags">
              {selectedAttributes.map((attr) => (
                <span key={attr} className="enrich-attribute-tag">
                  <svg className="enrich-attribute-tag-check" width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6 11L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {attr}
                  <button type="button" className="enrich-attribute-tag-remove" aria-label={`Remove ${attr}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Attribute Analysis */}
          <div className="enrich-attribute-analysis">
            <div className="enrich-attribute-analysis-header">
              <h3 className="enrich-attribute-analysis-title">Attribute Analysis</h3>
              <div className="enrich-attribute-analysis-toggles">
                <button
                  type="button"
                  className={`enrich-analysis-toggle ${enrichDistributionTab === 'all' ? 'active' : ''}`}
                  onClick={() => setEnrichDistributionTab('all')}
                >
                  All Matches
                </button>
                <button
                  type="button"
                  className={`enrich-analysis-toggle ${enrichDistributionTab === 'selected' ? 'active' : ''}`}
                  onClick={() => setEnrichDistributionTab('selected')}
                >
                  Selected Match Types Only
                </button>
              </div>
            </div>
            <table className="enrich-attribute-table">
              <thead>
                <tr>
                  <th>ATTRIBUTE NAME</th>
                  <th>RECORDS</th>
                  <th>FILL RATE</th>
                  <th>DISTRIBUTION</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { attribute: 'Age', records: '54,090', fillRate: 74.2 },
                  { attribute: 'Gender', records: '28,432', fillRate: 74.2 },
                  { attribute: 'Income Range', records: '44,381', fillRate: 74.2 },
                  { attribute: 'Home Owner Status', records: '32,824', fillRate: 74.2 },
                ].map((row) => (
                  <tr key={row.attribute}>
                    <td><strong>{row.attribute}</strong></td>
                    <td>{row.records}</td>
                    <td>{row.fillRate}%</td>
                    <td>
                      <button type="button" className="enrich-view-chart-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 12V6L6 10L10 4L14 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        View Chart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentTab === 'full-report' && (
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
