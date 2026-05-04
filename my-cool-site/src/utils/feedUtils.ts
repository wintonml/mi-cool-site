import { FeedItem } from '../components/ActionFeed/ActionFeed.types';
import { getAllPosts } from './markdownUtils';
import '../utils/initBlogPosts'; // Initialize blog posts

// Video data - hardcoded for now, ready for future date fields
const videoData = [
  {
    id: 'video-1',
    title: 'Climbing with M',
    date: '2024-01-15', // Placeholder date
    description: 'A climbing session with M in Klättercentret Telefonplan.',
  },
  {
    id: 'video-2',
    title: 'Climbing Session @ Baring Head',
    date: '2024-01-10', // Placeholder date
    description: 'An outdoor session at Baring Head.',
  },
  {
    id: 'video-3',
    title: 'A Session @ The Hangar',
    date: '2024-01-05', // Placeholder date
    description: 'A session at the best slab wall in Wellington.',
  },
];

// Project data - placeholder for now
const projectData = [
  {
    id: 'project-1',
    title: 'Portfolio Website',
    date: '2024-01-20', // Placeholder date
    description: 'Personal portfolio website built with React.',
  },
  {
    id: 'project-2',
    title: 'Climbing Tracker',
    date: '2024-01-18', // Placeholder date
    description: 'App to track climbing progress and sessions.',
  },
];

export function getBlogFeedItems(): FeedItem[] {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: `blog-${post.slug}`,
    title: post.title,
    date: post.date,
    type: 'blog' as const,
    link: `/blog#${post.slug}`,
  }));
}

export function getVideoFeedItems(): FeedItem[] {
  return videoData.map((video) => ({
    id: video.id,
    title: video.title,
    date: video.date,
    type: 'video' as const,
    link: '/videos',
  }));
}

export function getProjectFeedItems(): FeedItem[] {
  return projectData.map((project) => ({
    id: project.id,
    title: project.title,
    date: project.date,
    type: 'project' as const,
    link: '/projects',
  }));
}

export function getAllFeedItems(): FeedItem[] {
  const blogItems = getBlogFeedItems();
  const videoItems = getVideoFeedItems();
  const projectItems = getProjectFeedItems();

  return [...blogItems, ...videoItems, ...projectItems];
}
