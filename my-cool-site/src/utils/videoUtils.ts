import type { YouTubeEmbedProps } from '../components/YouTubeEmbed/YouTubeEmbed.types';

export enum VideoSortOption {
  TitleAsc = 'title-asc',
  TitleDesc = 'title-desc',
  DateAsc = 'date-asc',
  DateDesc = 'date-desc',
}

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

  return sortVideos(videosToSearch, VideoSortOption.DateDesc)[0];
}

export function sortVideos(
  videosToSort: YouTubeEmbedProps[],
  sortOption: VideoSortOption
): YouTubeEmbedProps[] {
  const sortedVideos = [...videosToSort];

  switch (sortOption) {
    case VideoSortOption.TitleAsc:
      return sortedVideos.sort((a, b) => a.title.localeCompare(b.title));
    case VideoSortOption.TitleDesc:
      return sortedVideos.sort((a, b) => b.title.localeCompare(a.title));
    case VideoSortOption.DateAsc:
      return sortedVideos.sort(
        (a, b) =>
          parseVideoPublishedDate(a.datePublished).getTime() -
          parseVideoPublishedDate(b.datePublished).getTime()
      );
    case VideoSortOption.DateDesc:
    default:
      return sortedVideos.sort(
        (a, b) =>
          parseVideoPublishedDate(b.datePublished).getTime() -
          parseVideoPublishedDate(a.datePublished).getTime()
      );
  }
}
