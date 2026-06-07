import videos from '../content/videos/videos.json';
import {
  getLatestVideo,
  getLatestVideoFromJson,
  parseVideoPublishedDate,
} from '../utils/videoUtils';
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

  it('returns null for an empty video list', () => {
    expect(getLatestVideo([])).toBeNull();
  });
});
