import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { 
  FaWhatsapp, 
  FaFacebook, 
  FaTwitter, 
  FaTelegramPlane, 
  FaEnvelope, 
  FaTimes,
  FaCopy
} from 'react-icons/fa';

const ShareModal = ({ isOpen, onClose, product }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "auto";
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const productId = product._id || product.id;
  const shareUrl = `${window.location.origin}/product/${productId}`;
  const shareTitle = product.name;
  const shareText = `Check out this ${product.name} at CampusCircle!`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={24} />,
      color: "#25D366",
      action: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`, '_blank')
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={24} />,
      color: "#1877F2",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
    },
    {
      name: "Twitter",
      icon: <FaTwitter size={24} />,
      color: "#1DA1F2",
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank')
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane size={24} />,
      color: "#0088cc",
      action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank')
    },
    {
      name: "Email",
      icon: <FaEnvelope size={24} />,
      color: "#EA4335",
      action: () => { window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`; }
    }
  ];

  return ReactDOM.createPortal(
    <div className="share-modal-overlay" onClick={onClose}>
      <div 
        className="share-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="share-modal-header">
          <h3>Share</h3>
          <button className="share-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="share-modal-body">
          <div className="share-icons-grid">
            {shareOptions.map((option) => (
              <button 
                key={option.name} 
                className="share-icon-btn"
                onClick={option.action}
              >
                <div 
                  className="share-icon-wrapper" 
                  style={{ backgroundColor: option.color }}
                >
                  {option.icon}
                </div>
                <span>{option.name}</span>
              </button>
            ))}
          </div>

          <div className="share-copy-section">
            <input 
              type="text" 
              readOnly 
              value={shareUrl} 
              className="share-url-input"
            />
            <button 
              className={`share-copy-btn ${copied ? "copied" : ""}`}
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ShareModal;
