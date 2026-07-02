import { YouTubeEmbedProps } from '../../components/YouTubeEmbed';
import { BlogPost as BlogPostType } from '../../utils/markdownUtils';

export interface HomeProps {
  post?: BlogPostType | null;
  video?: YouTubeEmbedProps | null;
}
