import { useState } from 'react'
import Header from '../../components/layout/Header'
import Modal from '../../components/common/Modal'
import { mockConnections } from '../../utils/constants'
import { Connection } from '../../types'

const Connections = () => {
  const [activeTab, setActiveTab] = useState<'sources' | 'destinations'>('sources')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [connectionType, setConnectionType] = useState<'s3' | 'snowflake' | 'sftp' | 'databricks'>('s3')
  const [formData, setFormData] = useState({
    connectionName: '',
    bucketName: '',
    path: '',
    accessKeyId: '',
    secretAccessKey: '',
    host: '',
    database: '',
    schema: '',
    table: '',
    username: '',
    password: '',
  })

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case 'snowflake':
      case 'databricks':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M3 9H21M9 3V21" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      case 's3':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'sftp':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 10C21 17 17 21 10 21C3 21 3 17 3 10C3 3 7 3 14 3C21 3 21 3 21 10Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      default:
        return null
    }
  }

  const getConnectionTypeLabel = (type: string) => {
    return type.toUpperCase()
  }

  const handleSaveConnection = () => {
    // TODO: Save connection logic
    alert('Connection saved! (This will call API later)')
    setIsModalOpen(false)
    setFormData({
      connectionName: '',
      bucketName: '',
      path: '',
      accessKeyId: '',
      secretAccessKey: '',
      host: '',
      database: '',
      schema: '',
      table: '',
      username: '',
      password: '',
    })
  }

  const handleTestConnection = () => {
    alert('Testing connection... (This will call API later)')
  }

  return (
    <>
      <Header title="Data Source Connections" subtitle="Configure connections to your data sources." />

      <div className="content-section">
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Connections</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Manage your source and destination connections.
          </p>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'sources' ? 'active' : ''}`}
              onClick={() => setActiveTab('sources')}
            >
              Sources
            </button>
            <button
              className={`tab ${activeTab === 'destinations' ? 'active' : ''}`}
              onClick={() => setActiveTab('destinations')}
            >
              Destinations
            </button>
          </div>
        </div>

        {/* Connection Cards */}
        <div className="connections-grid">
          {/* Add New Connection Card */}
          <div className="connection-card add-new" onClick={() => setIsModalOpen(true)}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h3>Add New Connection</h3>
            <p>Connect a new data source</p>
          </div>

          {/* Existing Connections */}
          {mockConnections.map((connection) => (
            <div key={connection.id} className="connection-card">
              <div className="connection-icon">
                {getConnectionIcon(connection.type)}
              </div>
              <div className="connection-type-label">{getConnectionTypeLabel(connection.type)}</div>
              <div className="connection-name">{connection.name}</div>
              <div className={`connection-status ${connection.status}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" fill="currentColor"/>
                </svg>
                {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
              </div>
              <div className="connection-details">
                <div className="connection-detail-item">
                  <span className="connection-detail-label">Created:</span>
                  <span className="connection-detail-value">{connection.createdDate}</span>
                </div>
                {connection.details.host && (
                  <div className="connection-detail-item">
                    <span className="connection-detail-label">Host:</span>
                    <span className="connection-detail-value">{connection.details.host}</span>
                  </div>
                )}
                {connection.details.bucket && (
                  <div className="connection-detail-item">
                    <span className="connection-detail-label">Bucket:</span>
                    <span className="connection-detail-value">{connection.details.bucket}</span>
                  </div>
                )}
                {connection.details.path && (
                  <div className="connection-detail-item">
                    <span className="connection-detail-label">Path:</span>
                    <span className="connection-detail-value">{connection.details.path}</span>
                  </div>
                )}
                {connection.details.database && (
                  <div className="connection-detail-item">
                    <span className="connection-detail-label">Database:</span>
                    <span className="connection-detail-value">{connection.details.database}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Connection Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Source Connection"
        subtitle="Configure a new data connection."
      >
        {/* Connection Type Selector */}
        <div className="form-group">
          <label className="form-label">Connection Type</label>
          <div className="connection-type-selector">
            <button
              className={`connection-type-btn ${connectionType === 'snowflake' ? 'selected' : ''}`}
              onClick={() => setConnectionType('snowflake')}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M3 9H21M9 3V21" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <div className="type-label">Snowflake</div>
            </button>
            <button
              className={`connection-type-btn ${connectionType === 'databricks' ? 'selected' : ''}`}
              onClick={() => setConnectionType('databricks')}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M3 9H21M9 3V21" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <div className="type-label">Databricks</div>
            </button>
            <button
              className={`connection-type-btn ${connectionType === 's3' ? 'selected' : ''}`}
              onClick={() => setConnectionType('s3')}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="type-label">AWS S3</div>
            </button>
            <button
              className={`connection-type-btn ${connectionType === 'sftp' ? 'selected' : ''}`}
              onClick={() => setConnectionType('sftp')}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M21 10C21 17 17 21 10 21C3 21 3 17 3 10C3 3 7 3 14 3C21 3 21 3 21 10Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div className="type-label">SFTP</div>
            </button>
          </div>
        </div>

        {/* S3 Fields */}
        {connectionType === 's3' && (
          <>
            <div className="form-group">
              <label className="form-label required">Connection Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="My Production Database"
                value={formData.connectionName}
                onChange={(e) => setFormData({ ...formData, connectionName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Bucket Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="my-bucket-name"
                value={formData.bucketName}
                onChange={(e) => setFormData({ ...formData, bucketName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Path / Prefix</label>
              <input
                type="text"
                className="form-input"
                placeholder="/data/exports/"
                value={formData.path}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Access Key ID</label>
              <input
                type="text"
                className="form-input"
                placeholder="AKIAIOSFODNN7EXAMPLE"
                value={formData.accessKeyId}
                onChange={(e) => setFormData({ ...formData, accessKeyId: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Secret Access Key</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.secretAccessKey}
                onChange={(e) => setFormData({ ...formData, secretAccessKey: e.target.value })}
              />
            </div>
          </>
        )}

        {/* Snowflake Fields */}
        {connectionType === 'snowflake' && (
          <>
            <div className="form-group">
              <label className="form-label required">Connection Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="My Production Database"
                value={formData.connectionName}
                onChange={(e) => setFormData({ ...formData, connectionName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Host / Account URL</label>
              <input
                type="text"
                className="form-input"
                placeholder="account.snowflakecomputing.com"
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Database</label>
              <input
                type="text"
                className="form-input"
                placeholder="CUSTOMER_DB"
                value={formData.database}
                onChange={(e) => setFormData({ ...formData, database: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Schema</label>
              <input
                type="text"
                className="form-input"
                placeholder="PUBLIC"
                value={formData.schema}
                onChange={(e) => setFormData({ ...formData, schema: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Table (for source connections)</label>
              <input
                type="text"
                className="form-input"
                placeholder="CUSTOMERS"
                value={formData.table}
                onChange={(e) => setFormData({ ...formData, table: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                placeholder="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </>
        )}

        {/* SFTP Fields */}
        {connectionType === 'sftp' && (
          <>
            <div className="form-group">
              <label className="form-label required">Connection Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="My Production Database"
                value={formData.connectionName}
                onChange={(e) => setFormData({ ...formData, connectionName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Host</label>
              <input
                type="text"
                className="form-input"
                placeholder="sftp.example.com"
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Path</label>
              <input
                type="text"
                className="form-input"
                placeholder="/uploads/"
                value={formData.path}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                placeholder="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </>
        )}

        {/* Databricks Fields */}
        {connectionType === 'databricks' && (
          <>
            <div className="form-group">
              <label className="form-label required">Connection Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="My Production Database"
                value={formData.connectionName}
                onChange={(e) => setFormData({ ...formData, connectionName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Host</label>
              <input
                type="text"
                className="form-input"
                placeholder="dbc-xxxxx.cloud.databricks.com"
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Database</label>
              <input
                type="text"
                className="form-input"
                placeholder="analytics"
                value={formData.database}
                onChange={(e) => setFormData({ ...formData, database: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                placeholder="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </>
        )}

        {/* Demo Mode Banner */}
        <div className="demo-mode-banner">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L12 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L8 7L10 2Z" fill="currentColor"/>
          </svg>
          <span>Demo Mode: Leave credentials blank to use a mock dataset for demonstration purposes.</span>
        </div>

        <div className="modal-actions">
          <button className="btn-test" onClick={handleTestConnection}>Test Connection</button>
          <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button className="btn-save" onClick={handleSaveConnection}>Save Connection</button>
        </div>
      </Modal>
    </>
  )
}

export default Connections
