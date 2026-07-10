import React from 'react';
import { VideoSortOption } from '../../utils/videoUtils';
import styles from './VideoSortSelector.module.css';

type SortSelectorProps = {
  value: VideoSortOption;
  onChange: (value: VideoSortOption) => void;
};

const VideoSortSelector: React.FC<SortSelectorProps> = ({ value, onChange }) => {
  return (
    <label className={styles.sortControl}>
      <span>Sort by</span>
      <select value={value} onChange={(event) => onChange(event.target.value as VideoSortOption)}>
        <option value={VideoSortOption.DateDesc}>Date published (newest first)</option>
        <option value={VideoSortOption.DateAsc}>Date published (oldest first)</option>
        <option value={VideoSortOption.TitleAsc}>Title (A-Z)</option>
        <option value={VideoSortOption.TitleDesc}>Title (Z-A)</option>
      </select>
    </label>
  );
};

export default VideoSortSelector;
