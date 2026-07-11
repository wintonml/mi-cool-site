export const BLOG_TAGS = {
  climb: 'climb',
  introduction: 'introduction',
  music: 'music',
  run: 'run',
  sport: 'sport',
  welcome: 'welcome',
} as const;

export type BlogTag = (typeof BLOG_TAGS)[keyof typeof BLOG_TAGS];
