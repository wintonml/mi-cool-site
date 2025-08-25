import React from 'react';
import YouTubeEmbed from '../components/YouTubeEmbed/YouTubeEmbed';
import styles from './Video.module.css';

const Video: React.FC = () => {
  return (
    <div className={styles.videosPage}>
      <h1 className={styles.pageTitle}>Featured Videos</h1>
      <div className={styles.videosGrid}>
        <YouTubeEmbed
          videoId="VGlhhHlZxzo"
          title="Climbing with M"
          description="A climbing session with M in Klättercentret Telefonplan."
        />
        <YouTubeEmbed
          videoId="Fv5nLfCg9Ik"
          title="Climbing Session @ Baring Head"
          description="An outdoor session at Baring Head."
        />
        <YouTubeEmbed
          videoId="Lub6U89j1Ak"
          title="A Session @ The Hangar"
          description="A session at the best slab wall in Wellington."
        />
      </div>
    </div>
  );
};

export default Video;
