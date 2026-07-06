import React from 'react';
import styles from './YouTubeEmbed.module.css';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';
import { YouTubeEmbedProps } from './YouTubeEmbed.types';

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title,
  datePublished,
  description,
}) => {
  return (
    <div className={styles.videoContainer}>
      <YouTubeVideo videoId={videoId} title={title} />
      <div className={styles.videoInfo}>
        <h3 className={styles.videoTitle}>{title}</h3>
        <p className={styles.videoDatePublished}>Date Published: {datePublished}</p>
        {description && <p className={styles.videoDescription}>{description}</p>}
      </div>
    </div>
  );
};

export default YouTubeEmbed;
