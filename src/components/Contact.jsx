import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  FileDown, 
  MessageSquare,
  AlertCircle,
  Info,
  X
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export const Contact = () => {
  const [copiedField, setCopiedField] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formState.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email.trim())) {
        newErrors.email = 'Please provide a valid email format (e.g., name@domain.com).';
      }
    }
    if (!formState.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormStatus(null);

    // Simulate structured frontend submission preparation
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({
        type: 'demo',
        message: 'Frontend Demo: Your input is validated and structured for backend integration. No backend is connected yet. You can also send this message directly via your email client.',
        mailtoLink: `mailto:${personalInfo.email}?subject=${encodeURIComponent(
          `Portfolio Contact from ${formState.name}`
        )}&body=${encodeURIComponent(
          `Hi Aman,\n\nName: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
        )}`
      });
    }, 500);
  };

  const handleResumeDownload = async (e) => {
    e.preventDefault();
    const resumePath = personalInfo.socials.resume || '/resume/Aman_Kumar_Resume.pdf';
    
    try {
      const response = await fetch(resumePath, { method: 'HEAD' });
      const contentType = response.headers.get('content-type') || '';
      if (response.ok && !contentType.includes('text/html')) {
        // Actual PDF file exists, trigger download
        const link = document.createElement('a');
        link.href = resumePath;
        link.download = 'Aman_Kumar_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // File not uploaded yet, display helpful configuration dialog to prevent 404
        setResumeModalOpen(true);
      }
    } catch {
      // In case of network error or missing file
      setResumeModalOpen(true);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`section contact-section ${isVisible ? 'is-visible' : ''}`} 
      aria-label="Contact Aman Kumar"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <MessageSquare size={14} />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Let's build something great. Have a project idea, opportunity, or just want to connect? Feel free to reach out.
          </p>
        </div>

        {/* Contact Grid: Two-Column Layout */}
        <div className="contact-grid">
          {/* LEFT SIDE: Contact Information Cards & Social Links */}
          <div className="contact-info-panel">
            {/* Direct Channels Card */}
            <div className="glass-card contact-channels-card">
              <h3 className="contact-panel-heading">Direct Contact Information</h3>

              {/* Email Card Item */}
              <div className="contact-channel-item">
                <div className="channel-icon">
                  <Mail size={20} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Email</span>
                  <a 
                    href={`mailto:${personalInfo.email}`} 
                    className="channel-value channel-link"
                    title={`Send email to ${personalInfo.email}`}
                  >
                    {personalInfo.email}
                  </a>
                  <div className="channel-actions">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="mini-action-btn"
                      title="Open default email client"
                    >
                      <Send size={12} />
                      <span>Send Mail</span>
                    </a>
                    <button
                      type="button"
                      className="mini-action-btn"
                      onClick={() => handleCopy(personalInfo.email, 'email')}
                      aria-label="Copy email address"
                    >
                      {copiedField === 'email' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                      <span>{copiedField === 'email' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone Card Item */}
              <div className="contact-channel-item">
                <div className="channel-icon">
                  <Phone size={20} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Phone</span>
                  <a 
                    href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} 
                    className="channel-value channel-link"
                    title={`Call ${personalInfo.phone}`}
                  >
                    {personalInfo.phone}
                  </a>
                  <div className="channel-actions">
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                      className="mini-action-btn"
                      title="Initiate phone call"
                    >
                      <Phone size={12} />
                      <span>Call</span>
                    </a>
                    <button
                      type="button"
                      className="mini-action-btn"
                      onClick={() => handleCopy(personalInfo.phone, 'phone')}
                      aria-label="Copy phone number"
                    >
                      {copiedField === 'phone' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                      <span>{copiedField === 'phone' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Location Card Item */}
              <div className="contact-channel-item">
                <div className="channel-icon">
                  <MapPin size={20} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Location</span>
                  <p className="channel-value">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links & Resume Card */}
            <div className="glass-card socials-panel">
              <h3 className="socials-title">
                <span>Social Profiles & Resume</span>
              </h3>

              <div className="social-actions-grid">
                {/* LinkedIn Button */}
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn btn-linkedin"
                  aria-label="Aman Kumar's LinkedIn Profile (opens in new tab)"
                  id="btn-linkedin"
                >
                  <LinkedinIcon size={20} />
                  <span>LinkedIn</span>
                </a>

                {/* GitHub Button */}
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn btn-github"
                  aria-label="Aman Kumar's GitHub Profile (opens in new tab)"
                  id="btn-github"
                >
                  <GithubIcon size={20} />
                  <span>GitHub</span>
                </a>

                {/* Download Resume Button */}
                <button
                  type="button"
                  className="social-btn btn-resume"
                  onClick={handleResumeDownload}
                  id="btn-download-resume"
                  aria-label="Download Aman Kumar's Resume"
                >
                  <FileDown size={20} />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Professional Contact Form */}
          <div className="glass-card contact-form-card">
            <div className="form-card-header">
              <h3 className="form-title">Send a Message</h3>
              <p className="form-subtitle">
                Fill in the details below to initiate contact directly.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleFormSubmit} noValidate>
              {/* Name Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">
                  Name <span className="required-star">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  required
                />
                {errors.name && (
                  <span className="field-error-text" role="alert">
                    <AlertCircle size={13} />
                    <span>{errors.name}</span>
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">
                  Email <span className="required-star">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  required
                />
                {errors.email && (
                  <span className="field-error-text" role="alert">
                    <AlertCircle size={13} />
                    <span>{errors.email}</span>
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">
                  Message <span className="required-star">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here..."
                  className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                  rows={5}
                  required
                />
                {errors.message && (
                  <span className="field-error-text" role="alert">
                    <AlertCircle size={13} />
                    <span>{errors.message}</span>
                  </span>
                )}
              </div>

              {/* Status Message / Demo Notice */}
              {formStatus && (
                <div className="form-demo-notice" role="status">
                  <div className="notice-header">
                    <Info size={16} className="notice-icon" />
                    <span className="notice-title">Frontend Form Demo</span>
                  </div>
                  <p className="notice-body">{formStatus.message}</p>
                  <div className="notice-actions">
                    <a
                      href={formStatus.mailtoLink}
                      className="btn btn-primary btn-notice-mail"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Send size={14} />
                      <span>Open in Email Client</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-submit-message"
                disabled={isSubmitting}
                id="contact-submit-btn"
                aria-label="Send Message"
              >
                <Send size={16} />
                <span>{isSubmitting ? 'Validating...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Resume Configuration Dialog (Prevents broken 404 download) */}
      {resumeModalOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => setResumeModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-content" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setResumeModalOpen(false)}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'rgba(99, 102, 241, 0.15)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'var(--accent-indigo-light)' 
              }}>
                <FileDown size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 700 }}>
                Resume Download Ready
              </h3>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              The download button is configured to serve your resume from the placeholder path:
            </p>

            <div style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              padding: '12px 14px', 
              borderRadius: '8px', 
              border: '1px solid var(--border-subtle)', 
              marginBottom: '20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'var(--accent-cyan)'
            }}>
              <code>public/resume/Aman_Kumar_Resume.pdf</code>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '24px' }}>
              To enable instant downloads, simply place your actual resume PDF in the <code>public/resume/</code> folder named <code>Aman_Kumar_Resume.pdf</code>.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => setResumeModalOpen(false)}
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
