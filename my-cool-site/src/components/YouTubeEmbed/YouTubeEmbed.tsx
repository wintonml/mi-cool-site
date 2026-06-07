import React from 'react';
import styles from './YouTubeEmbed.module.css';
import { YouTubeEmbedProps } from './YouTubeEmbed.types';

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title,
  datePublished,
  description,
  displayVideoOnly,
}) => {
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
      {!displayVideoOnly && (
        <div className={styles.videoInfo}>
          <h3 className={styles.videoTitle}>{title}</h3>
          <p className={styles.videoDatePublished}>Date Published: {datePublished}</p>
          {description && <p className={styles.videoDescription}>{description}</p>}
        </div>
      )}
    </div>
  );
};

export default YouTubeEmbed;
