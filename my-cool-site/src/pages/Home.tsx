import React from 'react';
import ActionFeed from '../components/ActionFeed/ActionFeed';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <h1>Welcome to My Cool Site</h1>
        <p>Check out my latest activities below</p>
      </div>
      <ActionFeed maxItems={5} />
    </div>
  );
};

export default Home;
