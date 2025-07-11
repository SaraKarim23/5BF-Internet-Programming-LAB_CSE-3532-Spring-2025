import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './securityaudit.css';

const SecurityAudit = () => {
  const [passwords, setPasswords] = useState([]);
  const [metrics, setMetrics] = useState({
    weakPasswords: 2,
    reusedPasswords: 1,
    strongPasswords: 2,
    securityScore: 48
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('g3N3r@T3dP@ssw0rD');
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  useEffect(() => {
  fetch('http://localhost:3000/audit')
    .then(res => res.json())
    .then(data => setMetrics(data))
    .catch(err => console.error('Failed to fetch audit data:', err));
}, []);



  // useEffect(() => {
  //   // Sample password data
  //   setPasswords([
  //     {
  //       id: 1,
  //       website: 'facebook.com',
  //       username: 'john_doe',
  //       password: 'password123',
  //       status: 'weak',
  //       lastUpdated: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
  //     },
  //     {
  //       id: 2,
  //       website: 'twitter.com',
  //       username: 'john_doe',
  //       password: 'password123',
  //       status: 'reused',
  //       lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  //     },
  //     {
  //       id: 3,
  //       website: 'github.com',
  //       username: 'john123',
  //       password: 'Gh@9xK2mN#8qR$5z',
  //       status: 'strong',
  //       lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  //     },
  //     {
  //       id: 4,
  //       website: 'netflix.com',
  //       username: 'john_doe',
  //       password: 'N3tfl!x@2024$ecur3',
  //       status: 'strong',
  //       lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  //     },
  //     {
  //       id: 5,
  //       website: 'oldforum.com',
  //       username: 'john_doe',
  //       password: '123456',
  //       status: 'weak',
  //       lastUpdated: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000)
  //     }
  //   ]);
  // }, []);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInDays < 7) {
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    } else if (diffInWeeks < 4) {
      return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
    } else {
      return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
    }
  };

  const getWebsiteColor = (website) => {
    const domain = website.toLowerCase();
    if (domain.includes('facebook')) return '#1877f2';
    if (domain.includes('twitter')) return '#1da1f2';
    if (domain.includes('github')) return '#333';
    if (domain.includes('netflix')) return '#e50914';
    return '#6b7280';
  };

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) return 'Select at least one option';

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedPassword(password);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const filteredPasswords = passwords.filter(password => 
    password.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div>
          <h1 className="page-title">Password Security Audit</h1>
          <p className="page-subtitle">Review and improve your password security</p>
        </div>
        <button className="export-btn">
          <span>📄</span>
          Export PDF Report
        </button>
      </div>

      {/* Security Metrics */}
      <div className="metrics-grid">
        <div className="metric-card weak">
          <div className="metric-header">Weak Passwords</div>
          <div className="metric-value weak">{metrics.weakPasswords}</div>
        </div>
        <div className="metric-card reused">
          <div className="metric-header">Reused Passwords</div>
          <div className="metric-value reused">{metrics.reusedPasswords}</div>
        </div>
        <div className="metric-card strong">
          <div className="metric-header">Strong Passwords</div>
          <div className="metric-value strong">{metrics.strongPasswords}</div>
        </div>
        <div className="metric-card score">
          <div className="metric-header">Security Score</div>
          <div className="metric-value score">
            {metrics.securityScore}
            <span className="metric-subtext">/100</span>
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="recommended-actions">
        <h2 className="section-title">
          <span>⚠️</span>
          Recommended Actions
        </h2>
        <div className="actions-grid">
          <div className="action-card weak">
            <h3 className="action-title">Weak Password Alert</h3>
            <p className="action-description">
              You have {metrics.weakPasswords} weak password(s) that need attention
            </p>
            <button className="action-btn weak">Strengthen Now</button>
          </div>
          <div className="action-card reused">
            <h3 className="action-title">Reused Password Alert</h3>
            <p className="action-description">
              You have {metrics.reusedPasswords} reused password(s) across accounts
            </p>
            <button className="action-btn reused">Change Password</button>
          </div>
        </div>
      </div>

      {/* Password Inventory */}
      <div className="password-inventory">
        <div className="inventory-header">
          <h2 className="section-title">Password Inventory</h2>
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search passwords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Website</th>
              <th>Username</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPasswords.map((password) => (
              <tr key={password.id}>
                <td>
                  <div className="website-cell">
                    <div 
                      className="website-icon"
                      style={{ backgroundColor: getWebsiteColor(password.website) }}
                    >
                      🌐
                    </div>
                    {password.website}
                  </div>
                </td>
                <td>{password.username}</td>
                <td>
                  <span className={`status-${password.status}`}>
                    {password.status.charAt(0).toUpperCase() + password.status.slice(1)}
                  </span>
                </td>
                <td>{formatTimeAgo(password.lastUpdated)}</td>
                <td>
                  <div className="actions-cell">
                    <button className="table-btn">Edit</button>
                    <button 
                      className="table-btn"
                      onClick={() => copyToClipboard(password.password)}
                    >
                      Copy
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Security Recommendations */}
        <div className="recommendations-section">
          <h2 className="section-title">Security Recommendations</h2>
          
          <div className="recommendation-item weak">
            <h3 className="recommendation-title">Strengthen Weak Passwords</h3>
            <p className="recommendation-desc">
              You have {metrics.weakPasswords} weak passwords that need to be strengthened.
            </p>
            <button className="recommendation-btn weak">Fix Now</button>
          </div>

          <div className="recommendation-item reused">
            <h3 className="recommendation-title">Replace Reused Passwords</h3>
            <p className="recommendation-desc">
              You have {metrics.reusedPasswords} reused passwords across multiple accounts.
            </p>
            <button className="recommendation-btn reused">Fix Now</button>
          </div>

          <div className="recommendation-item tfa">
            <h3 className="recommendation-title">Enable Two-Factor Authentication</h3>
            <p className="recommendation-desc">
              Add an extra layer of security to your important accounts.
            </p>
            <button className="recommendation-btn tfa">Learn More</button>
          </div>
        </div>

        {/* Password Generator */}
        <div className="generator-section">
          <h2 className="section-title">Password Generator</h2>
          
          <div className="password-display">
            {generatedPassword}
            <button 
              className="copy-btn"
              onClick={() => copyToClipboard(generatedPassword)}
            >
              📋
            </button>
          </div>

          <div className="length-section">
            <div className="length-label">
              <span>Password Length:</span>
              <span className="length-value">{passwordLength}</span>
            </div>
            <input
              type="range"
              className="slider"
              min="8"
              max="32"
              value={passwordLength}
              onChange={(e) => setPasswordLength(parseInt(e.target.value))}
            />
          </div>

          <div className="options-grid">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="uppercase"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              <label htmlFor="uppercase">Include Uppercase</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="lowercase"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              <label htmlFor="lowercase">Include Lowercase</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="numbers"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              <label htmlFor="numbers">Include Numbers</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="symbols"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              <label htmlFor="symbols">Include Symbols</label>
            </div>
          </div>

          <button className="generate-btn" onClick={generatePassword}>
            <span>🔄</span>
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityAudit;



