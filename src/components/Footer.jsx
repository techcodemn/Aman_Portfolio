import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-container">
        {/* Footer Main Content */}
        <div className="footer-top">
          {/* Identity & Tagline */}
          <div className="footer-brand">
            <h3 className="footer-brand-title">{personalInfo.name}</h3>
            <p className="footer-brand-subtitle">{personalInfo.title}</p>
            <p className="footer-brand-motto">{personalInfo.location}</p>
          </div>

          {/* Quick Nav Links */}
          <nav className="footer-nav" aria-label="Footer Quick Links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="footer-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(link.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="footer-socials" aria-label="Social Profiles">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Aman Kumar's LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>

            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Aman Kumar's GitHub Profile"
              title="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © 2026 Aman Kumar. All rights reserved.
          </p>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top of the page"
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};
