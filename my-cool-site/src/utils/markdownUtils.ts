import matter from 'gray-matter';
import { BlogPostProps } from '../components/BlogPost/BlogPost.types';

// These will be populated by initBlogPosts
export let BLOG_POSTS: Record<string, string> = {};
export let getAllPosts: () => BlogPostProps[] = () => [];
export let getPostBySlug: (slug: string) => BlogPostProps | null = () => null;

// This function should be called during app initialization
export function initializeBlogPosts(blogPosts: Record<string, string>) {
  BLOG_POSTS = blogPosts;

  getPostBySlug = (slug: string): BlogPostProps | null => {
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

  getAllPosts = (): BlogPostProps[] => {
    const slugs = Object.keys(BLOG_POSTS)
      .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx?$/, ''));

    return slugs
      .map((slug) => getPostBySlug(slug))
      .filter((post): post is BlogPostProps => post !== null)
      .sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
      });
  };
}

export function getAllPostSlugs(): string[] {
  return Object.keys(BLOG_POSTS)
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx?$/, ''));
}
