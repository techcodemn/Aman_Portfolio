import React, { useState, useRef } from 'react';
import { Terminal, Database, Code2, Sparkles, User } from 'lucide-react';
import { PythonIcon } from './Icons';

export const ProfilePhoto = () => {
  // Permanent, verified photo asset
  const profilePhotoSrc = '/images/aman-profile.jpg';
  
  // Track fallback only if asset fails to load
  const [imageError, setImageError] = useState(false);

  // 3D tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Mouse move handler for silky-smooth 3D tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
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
            <span className="verified-pill">Verified</span>
          </div>

          {/* Photo Display Viewport */}
          <div className="photo-display-viewport">
            {!imageError ? (
              <div className="photo-image-wrap">
                <img
                  src={profilePhotoSrc}
                  alt="Aman Kumar - Python Full Stack Software Engineer"
                  className="real-profile-photo"
                  loading="eager"
                  decoding="async"
                  width="420"
                  height="440"
                  onError={() => setImageError(true)}
                />

                <div className="photo-caption-strip">
                  <span className="photo-strip-dot" />
                  <span>Aman Kumar</span>
                </div>
              </div>
            ) : (
              <div className="tasteful-dev-placeholder">
                <div className="placeholder-monogram-ring">
                  <div className="monogram-core">
                    <User size={48} strokeWidth={1.4} />
                  </div>
                  <div className="monogram-glow-spin" aria-hidden="true" />
                </div>
                <div className="placeholder-info">
                  <p className="placeholder-name">Aman Kumar</p>
                  <p className="placeholder-asset-hint">Python Full Stack Software Engineer</p>
                </div>
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
