import React from 'react';
import YouTubeEmbed from '../components/YouTubeEmbed/YouTubeEmbed';
import { YouTubeEmbedProps } from '../components/YouTubeEmbed/YouTubeEmbed.types';
import styles from './Video.module.css';
import videos from '../content/videos/videos.json';

const Video: React.FC = () => {
  return (
    <div className={styles.videosPage}>
      <h1 className={styles.pageTitle}>Featured Videos</h1>
      <div className={styles.videosGrid}>
        {videos.map((video: YouTubeEmbedProps) => (
          <YouTubeEmbed
            key={video.videoId}
            videoId={video.videoId}
            title={video.title}
            datePublished={video.datePublished}
            description={video.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Video;
