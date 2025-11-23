// This file initializes the blog posts in the browser
import { initializeBlogPosts, BlogPost, getAllPosts } from './markdownUtils';

declare global {
  interface Window {
    __BLOG_POSTS__?: Record<string, string>;
  }
}

// Common posts data used in both development and production
const COMMON_POSTS = {
  'hello-world.md': `---
title: "Hello World"
date: "2023-11-23"
author: "Your Name"
tags: ["welcome", "introduction"]
excerpt: "This is my first blog post on my new site!"
---

# Welcome to My Blog

This is my first blog post using my new blog system. I'm excited to start sharing my thoughts and ideas with you all!

## Why I Started This Blog

I've always wanted to share my knowledge and experiences with others. This blog will be a place where I can document my journey and help others who might be on a similar path.

## What to Expect

- Tutorials
- Project updates
- Tech insights
- And much more!

Stay tuned for more content!`,
};

// In development, we'll use the COMMON_POSTS directly
export function initBlogPosts() {
  // Always use the same posts data regardless of environment
  const postsToUse = process.env.NODE_ENV === 'development' 
    ? COMMON_POSTS 
    : window.__BLOG_POSTS__ || COMMON_POSTS;

  console.log(`Initializing blog posts in ${process.env.NODE_ENV} mode`);
  console.log('Available posts:', Object.keys(postsToUse));
  
  initializeBlogPosts(postsToUse);
  
  // Log the posts after initialization for debugging
  console.log('After initialization - getAllPosts() result:', getAllPosts());
}

// Export for testing and direct usage
export { COMMON_POSTS };

// Initialize immediately when this module is imported
initBlogPosts();

export type { BlogPost };
