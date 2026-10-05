import React from 'react';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { ProfilePhoto } from './ProfilePhoto';

export const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section" aria-label="Aman Kumar - Hero Introduction">
      {/* Dynamic Background Tech Mesh and Ambient Glows are placed in CSS */}
      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Hero Text & Content */}
          <div className="hero-content">
            {/* Status Indicator */}
            <div className="hero-status-pill">
              <span className="status-indicator-ping">
                <span className="ping-wave" />
                <span className="ping-core" />
              </span>
              <span className="status-text">{personalInfo.availability}</span>
            </div>

            {/* Small text */}
            <p className="hero-small-intro">
              <span className="intro-line" />
              <span>Hello, I'm</span>
            </p>

            {/* Main Semantic Heading */}
            <h1 className="hero-main-name">
              <span className="name-gradient">{personalInfo.name}</span>
              <span className="hero-prof-title">{personalInfo.title}</span>
            </h1>

            {/* Tagline */}
            <p className="hero-tagline">
              {personalInfo.tagline}
            </p>

            {/* Tech Highlights Pill Bar */}
            <div className="hero-tech-highlights" aria-label="Core Technology Highlights">
              <span className="hero-mini-pill">Python 3.x</span>
              <span className="hero-mini-pill">Flask • Django • FastAPI</span>
              <span className="hero-mini-pill">REST APIs</span>
              <span className="hero-mini-pill">MySQL</span>
              <span className="hero-mini-pill">Docker</span>
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <button
                type="button"
                className="btn btn-primary hero-btn-primary"
                onClick={() => scrollTo('projects')}
                id="hero-view-projects-btn"
                aria-label="Navigate to Featured Projects"
              >
                <span>View Projects</span>
                <ArrowRight size={18} className="btn-arrow-icon" />
              </button>

              <button
                type="button"
                className="btn btn-secondary hero-btn-secondary"
                onClick={() => scrollTo('contact')}
                id="hero-contact-me-btn"
                aria-label="Navigate to Contact Section"
              >
                <Mail size={18} />
                <span>Contact Me</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dedicated 3D Interactive Profile Photo Area */}
          <ProfilePhoto />
        </div>

        {/* Scroll to Explore Indicator */}
        <div className="hero-scroll-indicator">
          <button
            type="button"
            className="scroll-indicator-btn"
            onClick={() => scrollTo('about')}
            aria-label="Scroll down to About section"
          >
            <span className="scroll-indicator-text">Scroll to explore</span>
            <div className="scroll-mouse-icon">
              <span className="scroll-wheel" />
            </div>
            <ChevronDown size={16} className="scroll-chevron" />
          </button>
        </div>
      </div>
    </section>
  );
};
