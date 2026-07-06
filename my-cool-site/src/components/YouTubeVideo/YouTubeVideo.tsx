import React from 'react';
import styles from './YouTubeVideo.module.css';
import { YouTubeVideoProps } from './YouTubeVideo.types';

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoId, title }) => {
  return (
    <div className={styles.videoWrapper}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.videoIframe}
      />
    </div>
  );
};

export default YouTubeVideo;
