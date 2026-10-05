import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Calendar, MapPin, School, BookMarked } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export const Education = () => {
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

  const edu = educationData[0];

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className={`section education-section ${isVisible ? 'is-visible' : ''}`} 
      aria-label="Education"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <GraduationCap size={14} />
            <span>EDUCATION</span>
          </div>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Academic qualifications and formal engineering education in Computer Science.
          </p>
        </div>

        {/* Education Timeline / Connector Layout */}
        <div className="education-timeline-wrap">
          {/* Small Timeline Connector Element */}
          <div className="education-connector-spine" aria-hidden="true">
            <div className="edu-spine-line" />
            <div className="edu-spine-badge">
              <GraduationCap size={18} className="edu-badge-icon" />
              <div className="edu-node-halo" />
            </div>
            <div className="edu-spine-line" />
          </div>

          {/* Education Card */}
          <div className="education-card-container">
            <article className="glass-card education-card" tabIndex={0}>
              {/* Subtle Academic Background Pattern */}
              <div className="academic-grid-pattern" aria-hidden="true" />
              
              <div className="education-card-content">
                {/* Top Meta Bar */}
                <div className="edu-meta-bar">
                  <div className="edu-type-chip">
                    <span className="edu-status-pulse" />
                    <span>Undergraduate Degree</span>
                  </div>

                  <div className="edu-duration-pill">
                    <Calendar size={13} className="edu-meta-icon" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                {/* Main Degree Title */}
                <h3 className="education-degree-title">
                  {edu.degree}
                </h3>

                {/* Institution & Location Line */}
                <div className="education-institution-group">
                  <div className="edu-institution-row">
                    <School size={18} className="edu-school-icon" />
                    <span className="edu-institution-text">{edu.institution}</span>
                  </div>
                  
                  <div className="edu-location-row">
                    <MapPin size={14} className="edu-location-icon" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                {/* Clean Academic Visual Banner */}
                <div className="academic-visual-box">
                  <div className="academic-visual-header">
                    <div className="academic-icon-frame">
                      <BookMarked size={16} />
                    </div>
                    <div>
                      <h4 className="academic-visual-title">Computer Science & Engineering</h4>
                      <p className="academic-visual-desc">Core Engineering Curriculum & Disciplines</p>
                    </div>
                  </div>

                  <div className="academic-curriculum-tags">
                    <span className="curriculum-tag">Software Engineering</span>
                    <span className="curriculum-tag">Data Structures & Algorithms</span>
                    <span className="curriculum-tag">Object-Oriented Programming (OOP)</span>
                    <span className="curriculum-tag">Database Management Systems (DBMS)</span>
                    <span className="curriculum-tag">Operating Systems</span>
                    <span className="curriculum-tag">Computer Networks</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
