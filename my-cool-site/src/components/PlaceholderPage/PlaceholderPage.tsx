import React from 'react';
import styles from './PlaceholderPage.module.css';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>This page has not been implemented yet.</p>
    </div>
  );
};

export default PlaceholderPage;
