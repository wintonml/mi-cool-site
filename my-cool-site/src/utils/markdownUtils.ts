import matter from 'gray-matter';

export interface BlogPostMetadata {
  title: string;
  date: string;
  author: string;
  excerpt?: string;
  tags?: string[];
}

export interface BlogPost extends BlogPostMetadata {
  slug: string;
  content: string;
}

// These will be populated by initBlogPosts
export let BLOG_POSTS: Record<string, string> = {};
export let getAllPosts: () => BlogPost[] = () => [];
export let getPostBySlug: (slug: string) => BlogPost | null = () => null;

// This function should be called during app initialization
export function initializeBlogPosts(blogPosts: Record<string, string>) {
  BLOG_POSTS = blogPosts;

  getPostBySlug = (slug: string): BlogPost | null => {
    const fileName = `${slug}.md`;
    const fileContents = BLOG_POSTS[fileName];

    if (!fileContents) return null;

    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      excerpt: data.excerpt || content.slice(0, 200) + '...',
      tags: data.tags || [],
    };
  };

  getAllPosts = (): BlogPost[] => {
    const slugs = Object.keys(BLOG_POSTS)
      .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx?$/, ''));

    return slugs
      .map((slug) => getPostBySlug(slug))
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  };
}

export function getAllPostSlugs(): string[] {
  return Object.keys(BLOG_POSTS)
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx?$/, ''));
}
