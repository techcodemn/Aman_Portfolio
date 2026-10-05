import React, { useState, useEffect, useRef } from 'react';
import { 
  Wrench, 
  Cpu, 
  FileCode2, 
  Code2, 
  Flame, 
  Layers, 
  Zap, 
  Network, 
  Database, 
  Server, 
  CheckCircle2, 
  ShieldCheck, 
  Boxes, 
  GitBranch, 
  Cloud, 
  Terminal, 
  Send, 
  Box,
  Palette
} from 'lucide-react';
import { PythonIcon, Html5Icon, Css3Icon, GithubIcon } from './Icons';
import { skillsData } from '../data/portfolioData';

// Map icon strings to components
const iconMap = {
  Python: PythonIcon,
  Cpu,
  FileCode2,
  Code2,
  Palette,
  Html5: Html5Icon,
  Css3: Css3Icon,
  Flame,
  Layers,
  Zap,
  Network,
  DatabaseZap: Database,
  GitFork: GitBranch,
  Database,
  Server,
  CheckCircle2,
  ShieldCheck,
  Boxes,
  GitBranch,
  Github: GithubIcon,
  Cloud,
  Terminal,
  Send,
  Box,
};

// Quick helper for individual skill icon lookup
const getSkillIcon = (skill) => {
  if (skill.name === 'Python') return PythonIcon;
  if (skill.name === 'HTML5') return Html5Icon;
  if (skill.name === 'CSS3') return Css3Icon;
  if (skill.name === 'GitHub') return GithubIcon;
  return iconMap[skill.icon] || Code2;
};

export const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('All');
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

  const filterTabs = [
    'All',
    'Languages',
    'Frameworks',
    'Backend',
    'Database',
    'Testing',
    'DevOps',
    'Cloud',
    'Tools',
  ];

  const filteredCategories = activeFilter === 'All'
    ? skillsData
    : skillsData.filter((cat) => cat.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className={`section skills-section ${isVisible ? 'is-visible' : ''}`} 
      aria-label="Technical Skills"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Wrench size={14} />
            <span>Core Competencies</span>
          </div>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="skills-filter-bar" role="tablist" aria-label="Skill Categories Filter">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab}
              className={`filter-btn ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab)}
              id={`filter-skills-${tab.toLowerCase()}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Categorized Skills Grid */}
        <div className="skills-category-grid">
          {filteredCategories.map((cat) => (
            <div key={cat.category} className="glass-card skill-card-container">
              {/* Category Header */}
              <div className="skill-card-header">
                <div className="cat-title-wrap">
                  <span className="cat-number">{cat.categoryNumber}</span>
                  <h3 className="cat-name">{cat.category}</h3>
                </div>
                <span className="cat-count-pill">{cat.skills.length} Techs</span>
              </div>

              <p className="cat-description">{cat.description}</p>

              {/* Skills Chips Grid */}
              <div className="skills-chips-wrapper">
                {cat.skills.map((skill) => {
                  const SkillIcon = getSkillIcon(skill);
                  return (
                    <div 
                      key={skill.name} 
                      className="skill-chip"
                      title={`${skill.name} (${cat.category})`}
                    >
                      <span className="skill-chip-icon">
                        <SkillIcon size={16} />
                      </span>
                      <span className="skill-chip-text">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
