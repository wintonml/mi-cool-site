import React, { useMemo, useState } from 'react';
import YouTubeEmbed from '../components/YouTubeEmbed/YouTubeEmbed';
import { YouTubeEmbedProps } from '../components/YouTubeEmbed/YouTubeEmbed.types';
import { sortVideos, VideoSortOption } from '../utils/videoUtils';
import { VideoProps } from './interfaces/Video.types';
import styles from './Video.module.css';

const Video: React.FC<VideoProps> = ({ videos }) => {
  const [sortOption, setSortOption] = useState<VideoSortOption>(VideoSortOption.DateDesc);

  const sortedVideos = useMemo(() => sortVideos(videos, sortOption), [videos, sortOption]);

  return (
    <div className={styles.videosPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Featured Videos</h1>
        <label className={styles.sortControl}>
          <span>Sort by</span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value as VideoSortOption)}
          >
            <option value={VideoSortOption.DateDesc}>Date published (newest first)</option>
            <option value={VideoSortOption.DateAsc}>Date published (oldest first)</option>
            <option value={VideoSortOption.TitleAsc}>Title (A-Z)</option>
            <option value={VideoSortOption.TitleDesc}>Title (Z-A)</option>
          </select>
        </label>
      </div>
      <div className={styles.videosGrid}>
        {sortedVideos.map((video: YouTubeEmbedProps) => (
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
