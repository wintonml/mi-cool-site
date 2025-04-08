import React from 'react';
import BlogList from './components/BlogList/BlogList';
import './App.css';
import { BlogListProps } from './components/BlogList/BlogList.types';

function App() {
  const Author = 'Michael Lennon Winton';
  const PlaceHolderPosts: BlogListProps['posts'] = [
    {
      title: 'Welcome to My Blog',
      content:
        "This is my first blog post. I'm excited to share my thoughts and experiences with you.",
      date: '2024-04-06',
      author: Author,
      tags: ['welcome', 'introduction'],
    },
    {
      title: 'Getting Started with React',
      content: 'React is a powerful JavaScript library for building user interfaces.',
      date: '2024-04-07',
      author: Author,
      tags: ['react', 'javascript', 'web-development'],
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi-cool</h1>
      </header>
      <main>
        <BlogList posts={PlaceHolderPosts} />
      </main>
    </div>
  );
}

export default App;
