import type { YouTubeEmbedProps } from '../components/YouTubeEmbed/YouTubeEmbed.types';

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
