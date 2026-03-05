export interface BlogPostProps {
  title: string;
  content: string;
  date: string;
  author: string;
  excerpt?: string;
  tags?: string[];
  slug?: string;
}
