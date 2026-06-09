import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const checkAtBottom = useCallback(() => {
    const threshold = 50; // px from bottom
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
    const scrolledToBottom = window.innerHeight + window.scrollY >= docHeight - threshold;
    setVisible(scrolledToBottom);
  }, []);

  useEffect(() => {
    checkAtBottom();
    window.addEventListener('scroll', checkAtBottom, { passive: true });
    window.addEventListener('resize', checkAtBottom);
    return () => {
      window.removeEventListener('scroll', checkAtBottom);
      window.removeEventListener('resize', checkAtBottom);
    };
  }, [checkAtBottom]);

  useEffect(() => {
    setVisible(false);
    checkAtBottom();
  }, [location, checkAtBottom]);

  return (
    <div className={`${styles.footerContainer} ${visible ? styles.visible : styles.hidden}`}>
      <footer className={styles.footer} role="contentinfo" aria-hidden={!visible}>
        <p className={styles.text}>
          Find me on:
          <a
            className={styles.link}
            href="https://github.com/wintonml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
          >
            GitHub
          </a>
          <span className={styles.sep}>•</span>
          <a
            className={styles.link}
            href="https://www.linkedin.com/in/wintonml/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
