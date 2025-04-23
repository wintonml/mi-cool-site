import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavBarProps } from './NavBar.types';
import styles from './NavBar.module.css';

const NavBar = ({ header, navBar, links }: NavBarProps) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div className={`${styles.headerContainer} ${visible ? styles.visible : styles.hidden}`}>
      <header className={styles.header}>
        <h1>{header}</h1>
      </header>
      <nav className={styles.navbar}>
        <div className={styles.logo}>{navBar}</div>
        <ul className={styles.navLinks}>
          {links.map((link, index) => (
            <li key={index}>
              <a href={`/${link.toLowerCase()}`}>{link}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

NavBar.propTypes = {
  header: PropTypes.string.isRequired,
  navBar: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NavBar;
