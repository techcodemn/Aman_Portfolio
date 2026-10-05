import React, { useState, useRef } from 'react';
import { User, Upload, RotateCcw, Terminal, Database, Code2, Sparkles } from 'lucide-react';
import { PythonIcon } from './Icons';

export const ProfilePhoto = () => {
  // Clear asset path as requested by user
  const defaultAssetPath = '/images/aman-profile.jpg';
  
  // Track if default image failed to load
  const [imageError, setImageError] = useState(false);
  
  // Custom uploaded/preview photo if user tests in-browser
  const [customPhoto, setCustomPhoto] = useState(() => {
    try {
      return localStorage.getItem('aman_portfolio_photo') || null;
    } catch {
      return null;
    }
  });

  // 3D tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Mouse move handler for lightweight, silky-smooth 3D tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max tilt: ~10 degrees
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setCustomPhoto(result);
          try {
            localStorage.setItem('aman_portfolio_photo', result);
          } catch {
            // storage quota fallback
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setCustomPhoto(null);
    try {
      localStorage.removeItem('aman_portfolio_photo');
    } catch {
      // ignore
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Determine active photo source
  const activePhotoSrc = customPhoto || (!imageError ? defaultAssetPath : null);

  return (
    <div 
      className="hero-visual"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Aman Kumar Profile Visual and Interactive 3D Showcase"
    >
      <div 
        className="profile-3d-wrapper"
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)` 
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        }}
      >
        {/* Subtle Ambient Radial Lighting Layer */}
        <div className="hero-3d-ambient-glow" aria-hidden="true" />

        {/* 3D Geometric Concentric Wireframe Ring */}
        <div className="tech-orbital-ring ring-outer" aria-hidden="true" />
        <div className="tech-orbital-ring ring-inner" aria-hidden="true" />

        {/* Depth Layer 1: Floating Python Tech Chip */}
        <div 
          className="depth-chip chip-python"
          style={{
            transform: isHovered 
              ? `translate3d(${tilt.y * -1.8}px, ${tilt.x * -1.8}px, 35px)` 
              : 'translate3d(0, 0, 0)',
          }}
        >
          <div className="chip-icon-box">
            <PythonIcon size={16} />
          </div>
          <div className="chip-text-group">
            <span className="chip-label">Core Specialization</span>
            <span className="chip-val">Python 3.x</span>
          </div>
        </div>

        {/* Depth Layer 2: Floating Backend & REST APIs Chip */}
        <div 
          className="depth-chip chip-backend"
          style={{
            transform: isHovered 
              ? `translate3d(${tilt.y * 1.5}px, ${tilt.x * 1.5}px, 45px)` 
              : 'translate3d(0, 0, 0)',
          }}
        >
          <div className="chip-icon-box icon-cyan">
            <Database size={15} />
          </div>
          <div className="chip-text-group">
            <span className="chip-label">Architecture</span>
            <span className="chip-val">REST APIs • SQL</span>
          </div>
        </div>

        {/* Depth Layer 3: Floating Micro Badge */}
        <div 
          className="depth-chip chip-status"
          style={{
            transform: isHovered 
              ? `translate3d(${tilt.y * -1.2}px, ${tilt.x * 1.2}px, 25px)` 
              : 'translate3d(0, 0, 0)',
          }}
        >
          <Sparkles size={13} color="#a855f7" />
          <span>Full Stack Engineering</span>
        </div>

        {/* Main Profile Photo Container */}
        <div className="futuristic-photo-card">
          {/* Cyber Corner Accents */}
          <span className="corner-bracket corner-tl" aria-hidden="true" />
          <span className="corner-bracket corner-tr" aria-hidden="true" />
          <span className="corner-bracket corner-bl" aria-hidden="true" />
          <span className="corner-bracket corner-br" aria-hidden="true" />

          {/* Card Terminal Header */}
          <div className="photo-card-topbar">
            <div className="topbar-traffic-lights">
              <span className="light-dot dot-red" />
              <span className="light-dot dot-yellow" />
              <span className="light-dot dot-green" />
            </div>
            <div className="topbar-filename">
              <Code2 size={12} />
              <span>aman_profile.py</span>
            </div>
            <span className="verified-pill">Engineer</span>
          </div>

          {/* Photo Display / Tasteful Placeholder Area */}
          <div 
            className="photo-display-viewport"
            onClick={() => fileInputRef.current?.click()}
            title="Click to preview your real photo"
          >
            {/* Hidden file input for real photo upload/preview */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
              aria-label="Upload your real professional photo"
            />

            {/* Check if image source is valid and rendering */}
            {activePhotoSrc ? (
              <div className="photo-image-wrap">
                <img
                  src={activePhotoSrc}
                  alt="Aman Kumar - Python Full Stack Software Engineer"
                  className="real-profile-photo"
                  loading="eager"
                  decoding="async"
                  width="420"
                  height="440"
                  onError={() => {
                    setImageError(true);
                  }}
                />
                
                {/* Overlay controls when previewing custom photo */}
                {customPhoto && (
                  <button
                    type="button"
                    className="photo-reset-button"
                    onClick={handleReset}
                    title="Remove custom photo preview"
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                )}

                <div className="photo-caption-strip">
                  <span className="photo-strip-dot" />
                  <span>Aman Kumar</span>
                </div>
              </div>
            ) : null}

            {/* Tasteful Developer Placeholder (renders if no image yet or on error) */}
            {(!activePhotoSrc || imageError) && (
              <div className="tasteful-dev-placeholder">
                <div className="placeholder-monogram-ring">
                  <div className="monogram-core">
                    <User size={48} strokeWidth={1.4} />
                  </div>
                  <div className="monogram-glow-spin" aria-hidden="true" />
                </div>

                <div className="placeholder-info">
                  <span className="placeholder-pill">Professional Headshot Area</span>
                  <p className="placeholder-name">Aman Kumar</p>
                  <p className="placeholder-asset-hint">
                    Place photo at: <code>/public/images/aman-profile.jpg</code>
                  </p>
                </div>

                <button
                  type="button"
                  className="quick-upload-chip"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  <Upload size={13} />
                  <span>Click to Preview Your Photo</span>
                </button>
              </div>
            )}
          </div>

          {/* Photo Card Bottom Status Strip */}
          <div className="photo-card-footer">
            <div className="tech-badge-mini">
              <Terminal size={12} color="#6366f1" />
              <span>Full Stack / Python</span>
            </div>
            <span className="location-mini">Ranchi, IN</span>
          </div>
        </div>
      </div>
    </div>
  );
};
