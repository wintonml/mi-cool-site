import { getLatestVideo, parseVideoPublishedDate, sortVideos } from '../utils/videoUtils';
import type { YouTubeEmbedProps } from '../components/YouTubeEmbed/YouTubeEmbed.types';

describe('videoUtils', () => {
  it('parses DD-MM-YYYY into a Date', () => {
    const result = parseVideoPublishedDate('18-05-2026');

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(4); // May is month index 4
    expect(result.getDate()).toBe(18);
  });

  it('returns the latest video from an array', () => {
    const customVideos: YouTubeEmbedProps[] = [
      {
        videoId: '1',
        title: 'Older',
        datePublished: '01-01-2024',
      },
      {
        videoId: '2',
        title: 'Newer',
        datePublished: '15-06-2024',
      },
      {
        videoId: '3',
        title: 'Newest',
        datePublished: '31-12-2024',
      },
    ];

    const latest = getLatestVideo(customVideos);

    expect(latest).not.toBeNull();
    expect(latest?.videoId).toBe('3');
    expect(latest?.title).toBe('Newest');
  });

  it('sorts videos by title and by published date', () => {
    const customVideos: YouTubeEmbedProps[] = [
      {
        videoId: '1',
        title: 'Beta video',
        datePublished: '15-06-2024',
      },
      {
        videoId: '2',
        title: 'Alpha video',
        datePublished: '01-01-2024',
      },
      {
        videoId: '3',
        title: 'Gamma video',
        datePublished: '31-12-2024',
      },
    ];

    const titleSorted = sortVideos(customVideos, 'title-asc');
    expect(titleSorted.map((video) => video.videoId)).toEqual(['2', '1', '3']);

    const dateSorted = sortVideos(customVideos, 'date-desc');
    expect(dateSorted.map((video) => video.videoId)).toEqual(['3', '1', '2']);
  });

  it('returns null for an empty video list', () => {
    expect(getLatestVideo([])).toBeNull();
  });
});
