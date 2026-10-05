import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section on scroll
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a 
          href="#home" 
          className="nav-brand" 
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="Aman Kumar Portfolio Home"
        >
          <div className="nav-brand-logo">
            <Code2 size={20} />
          </div>
          <div>
            <span className="nav-brand-text">{personalInfo.name}</span>
            <span className="nav-brand-badge">dev</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-links" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA and Social Links */}
        <div className="nav-actions">
          <div className="nav-social-links" aria-label="Social Profiles">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-icon-btn"
              aria-label="Aman Kumar's LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-icon-btn"
              aria-label="Aman Kumar's GitHub Profile"
              title="GitHub Profile"
            >
              <GithubIcon size={16} />
            </a>
          </div>

          <a
            href="#contact"
            className="btn btn-outline"
            style={{ padding: '8px 18px', fontSize: '0.86rem' }}
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <Send size={14} />
            <span>Get in Touch</span>
          </a>

          <button
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`mobile-nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.name}
          </a>
        ))}

        <div className="mobile-social-row">
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-social-pill"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={16} />
            <span>LinkedIn</span>
          </a>
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-social-pill"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>
        </div>

        <a
          href="#contact"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '8px' }}
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          <Send size={16} />
          <span>Contact Me</span>
        </a>
      </div>
    </header>
  );
};
