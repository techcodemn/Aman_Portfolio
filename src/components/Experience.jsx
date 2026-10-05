import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export const Experience = () => {
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

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className={`section experience-section ${isVisible ? 'is-visible' : ''}`} 
      aria-label="Professional Experience"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Briefcase size={14} />
            <span>CAREER</span>
          </div>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Demonstrated experience managing live web platforms, digital visibility, and business listings.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="experience-timeline-container">
          {experienceData.map((item, index) => (
            <div key={index} className="timeline-split-row">
              {/* Left Column: Date & Meta Side */}
              <div className="timeline-date-side">
                <div className="timeline-date-pill">
                  <Calendar size={14} className="timeline-meta-icon" />
                  <span className="timeline-duration-text">{item.period}</span>
                </div>
                <div className="timeline-location-pill">
                  <MapPin size={13} className="timeline-meta-icon" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Center Column: Spine Line & Glowing Node */}
              <div className="timeline-spine-side" aria-hidden="true">
                <div className="timeline-spine-line" />
                <div className="timeline-spine-node">
                  <div className="spine-node-ping" />
                  <div className="spine-node-core" />
                </div>
                <div className="timeline-connector-arm" />
              </div>

              {/* Right Column: Experience Card */}
              <div className="timeline-card-side">
                <article className="glass-card experience-card" tabIndex={0}>
                  {/* Card Header */}
                  <div className="experience-card-header">
                    <div className="experience-title-group">
                      <span className="experience-status-badge">Professional Role</span>
                      <h3 className="experience-job-title">{item.role}</h3>
                      <div className="experience-company-line">
                        <Building2 size={16} className="company-building-icon" />
                        <span className="company-name">{item.company}</span>
                      </div>
                    </div>

                    {/* Inline Date Pill (Shown on tablet/mobile when columns stack) */}
                    <div className="experience-mobile-meta">
                      <span className="meta-chip">
                        <Calendar size={12} />
                        <span>{item.period}</span>
                      </span>
                      <span className="meta-chip">
                        <MapPin size={12} />
                        <span>{item.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities Box */}
                  <div className="experience-responsibilities-wrapper">
                    <h4 className="responsibilities-heading">Key Responsibilities</h4>
                    <ul className="responsibilities-list">
                      {item.responsibilities.map((resp, i) => (
                        <li key={i} className="responsibility-item">
                          <CheckCircle2 size={16} className="resp-icon" />
                          <span className="resp-text">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
