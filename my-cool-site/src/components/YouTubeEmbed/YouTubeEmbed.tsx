import React from 'react';
import styles from './YouTubeEmbed.module.css';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  description?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title, description }) => {
  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoWrapper}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.videoIframe}
        />
      </div>
      <div className={styles.videoInfo}>
        <h3 className={styles.videoTitle}>{title}</h3>
        {description && <p className={styles.videoDescription}>{description}</p>}
      </div>
    </div>
  );
};

export default YouTubeEmbed;
