import { useState, useRef } from 'react'
import Header from '../../components/layout/Header'
import { mockConnections } from '../../utils/constants'

const RunMatchReport = () => {
  const [selectedSource, setSelectedSource] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 
                         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    const allowedExtensions = ['.csv', '.xls', '.xlsx', '.parquet']
    
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      alert('Please upload a CSV, XLS, XLSX, or Parquet file')
      return
    }
    
    setSelectedFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0])
    }
  }

  return (
    <>
      <Header
        title="Run Match Report"
        subtitle="Import your customer data to generate a comprehensive match report."
      />

      {/* Import Data Section */}
      <div className="content-section">
        <div className="section-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--primary-blue)' }}>
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <h2 className="section-title">Import Data</h2>
            <p className="section-description">Select a data source to begin.</p>
          </div>
        </div>

        {/* Import from Connected Source */}
        <div style={{ marginBottom: '32px' }}>
          <label className="form-label" style={{ marginBottom: '12px' }}>Import from Connected Source</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <select
                className="form-input"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                <option value="">-- Select a source --</option>
                {mockConnections.map((conn) => (
                  <option key={conn.id} value={conn.id}>
                    {conn.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="btn-secondary"
              style={{ opacity: selectedSource ? 1 : 0.5, cursor: selectedSource ? 'pointer' : 'not-allowed' }}
              disabled={!selectedSource}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="3" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M3 8H13M8 3V13" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Import from Source
            </button>
          </div>
        </div>

        {/* Upload Local Files */}
        <div>
          <label className="form-label" style={{ marginBottom: '12px' }}>Upload Local Files</label>
          <div
            className={`upload-area ${isDragging ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xls,.xlsx,.parquet"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
            {selectedFile ? (
              <div style={{ textAlign: 'center' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '12px', color: '#10b981' }}>
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p style={{ fontWeight: 600, marginBottom: '4px' }}>{selectedFile.name}</p>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <div className="upload-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="upload-text">Drag and drop your file here</p>
                <p className="upload-hint">or</p>
                <button
                  className="browse-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBrowseClick()
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V12C4 12.5304 4.21071 13.0391 4.58579 13.4142C4.96086 13.7893 5.46957 14 6 14H14C14.5304 14 15.0391 13.7893 15.4142 13.4142C15.7893 13.0391 16 12.5304 16 12V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                  Browse Files
                </button>
                <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Supports CSV, XLS, XLSX, Parquet files.
                </p>
              </>
            )}
          </div>
          <div style={{ marginTop: '16px' }}>
            <a href="#" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
              Use Sample Data
            </a>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="content-section how-it-works">
        <h2 className="how-it-works-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-circle step-1 active">1</div>
            <h3 className="step-title">Import Data</h3>
            <p className="step-description">Select your source and import customer records.</p>
          </div>
          <div className="step">
            <div className="step-circle step-2 active">2</div>
            <h3 className="step-title">Map Columns</h3>
            <p className="step-description">Map your data fields to Deep Sync identifiers.</p>
          </div>
          <div className="step">
            <div className="step-circle step-3 active">3</div>
            <h3 className="step-title">Deep Sync Matches</h3>
            <p className="step-description">Our AI-powered engine matches and enhances your records.</p>
          </div>
          <div className="step">
            <div className="step-circle step-4 active">4</div>
            <h3 className="step-title">Get Insights</h3>
            <p className="step-description">Review comprehensive metrics and export enhanced data.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RunMatchReport
