import { YouTubeEmbedProps } from '../../components/YouTubeEmbed';
import { BlogPostProps } from '../../components/BlogPost/BlogPost.types';

export interface HomeProps {
  post?: BlogPostProps | null;
  video?: YouTubeEmbedProps | null;
}
