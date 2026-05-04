export interface FeedItem {
  id: string;
  title: string;
  date: string;
  type: 'blog' | 'video' | 'project';
  link: string;
}

export interface ActionFeedProps {
  maxItems?: number;
}
