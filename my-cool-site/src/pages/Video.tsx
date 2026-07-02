import React from 'react';
import YouTubeEmbed from '../components/YouTubeEmbed/YouTubeEmbed';
import { YouTubeEmbedProps } from '../components/YouTubeEmbed/YouTubeEmbed.types';
import { VideoProps } from './interfaces/Video.types';
import styles from './Video.module.css';

const Video: React.FC<VideoProps> = ({ videos }) => {
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
            displayVideoOnly={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Video;
