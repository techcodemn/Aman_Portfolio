import React, { useEffect, useRef, useState } from 'react';
import { 
  UserCheck, 
  Layers, 
  Server, 
  Cpu, 
  Terminal, 
  Sparkles,
  Code2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About = () => {
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

  const highlights = personalInfo.aboutHighlights || [
    {
      number: "01",
      title: "Full Stack Development",
      description: "Python, Flask, Django, FastAPI and modern frontend technologies.",
      tag: "Full Stack",
      icon: Layers,
    },
    {
      number: "02",
      title: "Backend & APIs",
      description: "REST API development, database integration and backend architecture.",
      tag: "Backend & APIs",
      icon: Server,
    },
    {
      number: "03",
      title: "Problem Solving",
      description: "Object-oriented programming, data structures and structured coding.",
      tag: "OOP & Algorithms",
      icon: Cpu,
    },
  ];

  const highlightIcons = [Layers, Server, Cpu];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`section about-section ${isVisible ? 'is-visible' : ''}`} 
      aria-label="About Aman Kumar"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <UserCheck size={14} />
            <span>Profile Overview</span>
          </div>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Software engineer dedicated to writing clean, maintainable code and engineering dependable backend and full-stack web applications.
          </p>
        </div>

        {/* Narrative & Visual Element Row */}
        <div className="about-main-grid">
          {/* Left Column: Professional Narrative */}
          <div className="about-narrative-card glass-card">
            <div className="about-card-badge">
              <Sparkles size={13} color="#6366f1" />
              <span>Engineering Background</span>
            </div>

            <p className="about-body-text">
              {personalInfo.summary}
            </p>

            {/* Core Competency Tags */}
            <div className="about-core-tags">
              <span className="about-tag">Python & Backends</span>
              <span className="about-tag">RESTful Architecture</span>
              <span className="about-tag">Relational Databases (MySQL)</span>
              <span className="about-tag">Clean OOP Design</span>
              <span className="about-tag">Modern Web Interfaces</span>
            </div>
          </div>

          {/* Right Column: Developer Code Manifest Visual */}
          <div className="about-visual-terminal" aria-label="Developer Profile Code Manifest">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot dot-red" />
                <span className="terminal-dot dot-yellow" />
                <span className="terminal-dot dot-green" />
              </div>
              <div className="terminal-tab">
                <Terminal size={13} />
                <span>engineer_profile.py</span>
              </div>
              <span className="terminal-lang-pill">Python 3.x</span>
            </div>

            <div className="terminal-body">
              <p><span className="code-keyword">class</span> <span className="code-variable">SoftwareEngineer</span>:</p>
              <p style={{ paddingLeft: '18px' }}>
                <span className="code-keyword">def</span> <span className="code-property">__init__</span>(<span className="code-variable">self</span>):
              </p>
              <p style={{ paddingLeft: '36px' }}>
                <span className="code-variable">self</span>.<span className="code-property">name</span> = <span className="code-string">"{personalInfo.name}"</span>
              </p>
              <p style={{ paddingLeft: '36px' }}>
                <span className="code-variable">self</span>.<span className="code-property">title</span> = <span className="code-string">"{personalInfo.title}"</span>
              </p>
              <p style={{ paddingLeft: '36px' }}>
                <span className="code-variable">self</span>.<span className="code-property">location</span> = <span className="code-string">"{personalInfo.location}"</span>
              </p>
              <p style={{ paddingLeft: '36px' }}>
                <span className="code-variable">self</span>.<span className="code-property">education</span> = <span className="code-string">"B.Tech Computer Science & Engineering"</span>
              </p>
              <br />
              <p style={{ paddingLeft: '18px' }}>
                <span className="code-keyword">def</span> <span className="code-property">core_focus</span>(<span className="code-variable">self</span>):
              </p>
              <p style={{ paddingLeft: '36px' }}>
                <span className="code-keyword">return</span> [
              </p>
              <p style={{ paddingLeft: '54px' }}>
                <span className="code-string">"Python Full Stack Architecture"</span>,
              </p>
              <p style={{ paddingLeft: '54px' }}>
                <span className="code-string">"REST API Design & Integration"</span>,
              </p>
              <p style={{ paddingLeft: '54px' }}>
                <span className="code-string">"Relational Database Engineering"</span>
              </p>
              <p style={{ paddingLeft: '36px' }}>
                ]
              </p>
            </div>
          </div>
        </div>

        {/* 3 Small Highlight Cards */}
        <div className="about-highlights-grid">
          {highlights.map((item, index) => {
            const IconComp = highlightIcons[index] || Code2;
            return (
              <div key={item.number} className="glass-card about-highlight-card">
                <div className="highlight-card-header">
                  <span className="highlight-number">{item.number}</span>
                  <div className="highlight-icon-wrap">
                    <IconComp size={18} />
                  </div>
                </div>

                <h3 className="highlight-card-title">{item.title}</h3>
                <p className="highlight-card-desc">{item.description}</p>

                <div className="highlight-card-footer">
                  <span className="highlight-tag">{item.tag || item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
