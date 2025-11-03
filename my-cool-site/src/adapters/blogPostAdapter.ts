/**
 * Adapter for transforming blog post data between API and application formats
 */

type BlogPostApiResponse = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  publishedAt: string;
  slug: string;
  // Add other API-specific fields here
};

type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: Date;
  slug: string;
  // Add other application-specific fields here
};

export const toBlogPost = (apiData: BlogPostApiResponse): BlogPost => ({
  id: apiData.id,
  title: apiData.title,
  content: apiData.content,
  excerpt: apiData.excerpt || apiData.content.substring(0, 200) + '...',
  publishedAt: new Date(apiData.publishedAt),
  slug: apiData.slug,
});

export const toBlogPostList = (apiData: BlogPostApiResponse[]): BlogPost[] =>
  apiData.map(toBlogPost);
