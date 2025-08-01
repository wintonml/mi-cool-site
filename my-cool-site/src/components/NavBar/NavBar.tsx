import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { NavBarProps } from './NavBar.types';
import styles from './NavBar.module.css';
import { capitalize } from '../../utils/StringHelpers/stringHelpers';

const NavBar = ({ header, links }: NavBarProps) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Filter out the current page from the navigation links
  const currentPage = location.pathname.split('/')[1]; // Get the current page name
  const filteredLinks = links.filter(
    (link) => link.toLowerCase() !== currentPage && currentPage !== ''
  );

  return (
    <div className={`${styles.headerContainer} ${visible ? styles.visible : styles.hidden}`}>
      <header className={styles.header}>
        <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
          <h1>{header}</h1>
        </Link>
      </header>
      <nav className={styles.navbar}>
        <Link to={`/${currentPage}`} style={{ textDecoration: 'none', color: 'Black' }}>
          <div className={styles.logo}>{capitalize(currentPage)}</div>
        </Link>
        <ul className={styles.navLinks}>
          {filteredLinks.map((link, index) => (
            <li key={index}>
              <Link to={`/${link.toLowerCase()}`}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

NavBar.propTypes = {
  header: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NavBar;
