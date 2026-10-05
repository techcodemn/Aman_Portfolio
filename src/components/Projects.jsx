import React, { useState, useEffect, useRef } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  CheckCircle2, 
  Compass, 
  Search, 
  Check 
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/portfolioData';

// Component for rendering tailored abstract UI previews for each project
const ProjectVisualPreview = ({ project }) => {
  if (project.id === 'careerpilot') {
    return (
      <div className="project-abstract-preview preview-careerpilot" aria-hidden="true">
        <div className="preview-top-bar">
          <div className="preview-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="preview-url-bar">careerpilot.app / guidance</span>
          <span className="preview-chip-accent">Roadmap</span>
        </div>

        <div className="preview-content-area">
          <div className="career-nodes-flow">
            <div className="career-node node-start">
              <span className="node-indicator" />
              <span>Explore Paths</span>
            </div>
            <div className="flow-connector" />
            <div className="career-node node-active">
              <Compass size={13} className="node-icon-spin" />
              <span>Skill Mapping</span>
            </div>
            <div className="flow-connector" />
            <div className="career-node node-target">
              <span className="node-target-dot" />
              <span>Career Direction</span>
            </div>
          </div>

          <div className="preview-meta-badge">
            <span className="meta-pulse" />
            <span>Structured Development Workflow</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 'ai-resume-analyzer') {
    return (
      <div className="project-abstract-preview preview-resume" aria-hidden="true">
        <div className="preview-top-bar">
          <div className="preview-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="preview-url-bar">resume_analyzer.py / ats</span>
          <span className="preview-chip-accent">Parser Engine</span>
        </div>

        <div className="preview-content-area">
          <div className="resume-scan-mockup">
            <div className="scan-line" />
            <div className="resume-doc-row doc-row-title" />
            <div className="resume-doc-row doc-row-sub" />
            <div className="resume-skills-detected">
              <span className="detected-pill"><Check size={10} /> Python</span>
              <span className="detected-pill"><Check size={10} /> Flask</span>
              <span className="detected-pill"><Check size={10} /> SQL</span>
            </div>
          </div>

          <div className="preview-score-card">
            <span className="score-label">ATS Scoring Engine</span>
            <span className="score-value">Actionable Feedback</span>
          </div>
        </div>
      </div>
    );
  }

  // MITTRA
  return (
    <div className="project-abstract-preview preview-mittra" aria-hidden="true">
      <div className="preview-top-bar">
        <div className="preview-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <span className="preview-url-bar">mittra.marketplace / local</span>
        <span className="preview-chip-accent">Service Portal</span>
      </div>

      <div className="preview-content-area">
        <div className="mittra-search-bar">
          <Search size={13} color="#818cf8" />
          <span>Find: Electrician, Plumber, Technician...</span>
        </div>

        <div className="mittra-cards-mockup">
          <div className="worker-mock-card">
            <div className="worker-avatar-sim" />
            <div className="worker-info-sim">
              <span className="worker-name-sim">Skilled Worker Profile</span>
              <span className="worker-badge-sim">Verified Service</span>
            </div>
          </div>
          <div className="db-sync-pill">
            <span className="db-indicator-dot" />
            <span>MySQL Schema • Normalized</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
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
      id="projects" 
      ref={sectionRef}
      className={`section projects-section ${isVisible ? 'is-visible' : ''}`} 
      aria-label="Featured Projects"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <FolderGit2 size={14} />
            <span>MY WORK</span>
          </div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Projects I've built using modern Python and full-stack technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="featured-projects-grid">
          {projectsData.map((project) => (
            <article 
              key={project.id} 
              className={`project-card-container glass-card accent-${project.accentColor}`}
              aria-labelledby={`project-title-${project.id}`}
            >
              {/* Abstract Visual Preview Area */}
              <div className="project-card-visual">
                <ProjectVisualPreview project={project} />
              </div>

              {/* Card Body */}
              <div className="project-card-content">
                {/* Meta Header */}
                <div className="project-meta-row">
                  <span className="project-index-num">#{project.number}</span>
                  <span className="project-category-badge">{project.category}</span>
                </div>

                {/* Project Title */}
                <h3 id={`project-title-${project.id}`} className="project-card-title">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="project-card-desc">
                  {project.description}
                </p>

                {/* Key Features List */}
                <div className="project-features-box">
                  <h4 className="features-header-text">Key Features</h4>
                  <ul className="project-features-list">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="project-feature-item">
                        <CheckCircle2 size={14} className="feature-check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Tags */}
                <div className="project-tech-pills">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div className="project-card-actions">
                  {project.viewUrl ? (
                    <a
                      href={project.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary project-action-btn btn-view"
                      aria-label={`View ${project.title} project`}
                    >
                      <span>View Project</span>
                      <ExternalLink size={15} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary project-action-btn btn-view is-disabled"
                      disabled
                      aria-disabled="true"
                      title="Live project URL ready to be added"
                      aria-label={`${project.title} live demo coming soon`}
                    >
                      <span>View Project</span>
                      <ExternalLink size={15} />
                    </button>
                  )}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary project-action-btn btn-github"
                      aria-label={`View ${project.title} GitHub repository`}
                    >
                      <GithubIcon size={16} />
                      <span>GitHub</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary project-action-btn btn-github is-disabled"
                      disabled
                      aria-disabled="true"
                      title="Repository is private or URL not yet provided"
                      aria-label={`${project.title} repository not publicly available`}
                    >
                      <GithubIcon size={16} />
                      <span>GitHub</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Subtle Recruiter CTA */}
        <div className="projects-bottom-cta glass-card">
          <div className="projects-cta-content">
            <h3 className="projects-cta-heading">Interested in working together?</h3>
            <p className="projects-cta-desc">
              Available for Python Full Stack and Software Engineering opportunities.
            </p>
          </div>
          <div className="projects-cta-actions">
            <button
              type="button"
              className="btn btn-secondary btn-cta-subtle"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="View projects"
            >
              <span>View Projects</span>
            </button>
            <button
              type="button"
              className="btn btn-primary btn-cta-subtle"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Contact Aman Kumar"
            >
              <span>Contact Me</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
