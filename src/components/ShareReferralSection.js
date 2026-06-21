import React, { useState } from 'react';
import '../styles/ShareReferralSection.css';

function ShareReferralSection({ referral }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!referral) {
    return null;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referral.link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referral.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="share-referral-section" aria-label="Share referral">
      <div className="share-panel">
        <h2>Refer friends and earn more</h2>

        <div className="share-content">
          <div className="share-field">
            <label htmlFor="referral-link">Your Referral Link</label>
            <div className="input-with-button">
              <input
                id="referral-link"
                type="text"
                value={referral.link}
                readOnly
              />
              <button
                className="copy-button"
                onClick={handleCopyLink}
              >
                {copiedLink ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="share-field">
            <label htmlFor="referral-code">Your Referral Code</label>
            <div className="input-with-button">
              <input
                id="referral-code"
                type="text"
                value={referral.code}
                readOnly
              />
              <button
                className="copy-button"
                onClick={handleCopyCode}
              >
                {copiedCode ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShareReferralSection;
