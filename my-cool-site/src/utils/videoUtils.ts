import type { YouTubeEmbedProps } from '../components/YouTubeEmbed/YouTubeEmbed.types';
import videos from '../content/videos/videos.json';

/**
 * Parses a published date string in DD-MM-YYYY format.
 */
export function parseVideoPublishedDate(datePublished: string): Date {
  const [day, month, year] = datePublished.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Returns the latest video from an array of videos based on the published date.
 */
export function getLatestVideo(videosToSearch: YouTubeEmbedProps[]): YouTubeEmbedProps | null {
  if (videosToSearch.length === 0) {
    return null;
  }

  return videosToSearch
    .slice()
    .sort(
      (a, b) =>
        parseVideoPublishedDate(b.datePublished).getTime() -
        parseVideoPublishedDate(a.datePublished).getTime()
    )[0];
}

/**
 * Returns the latest video from the project videos.json file.
 */
export function getLatestVideoFromJson(): YouTubeEmbedProps | null {
  return getLatestVideo(videos);
}
