import React from 'react';
import { Link } from 'react-router-dom';
import { ActionFeedProps, FeedItem } from './ActionFeed.types';
import { getAllFeedItems } from '../../utils/feedUtils';
import styles from './ActionFeed.module.css';

const ActionFeed: React.FC<ActionFeedProps> = ({ maxItems }) => {
  const feedItems: FeedItem[] = getAllFeedItems();

  const sortedItems = feedItems
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, maxItems);

  if (sortedItems.length === 0) {
    return (
      <div className={styles.actionFeed}>
        <h2>Latest Activity</h2>
        <p className={styles.noContent}>No content available</p>
      </div>
    );
  }

  return (
    <div className={styles.actionFeed}>
      <h2>Latest Activity</h2>
      <div className={styles.feedList}>
        {sortedItems.map((item) => (
          <Link key={item.id} to={item.link} className={styles.feedItem}>
            <div className={styles.itemContent}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDate}>{new Date(item.date).toLocaleDateString()}</p>
              <span className={styles.itemType}>{item.type}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActionFeed;
