import React from 'react';
import BlogList from './components/BlogList/BlogList';
import './App.css';

function App() {
  const samplePosts = [
    {
      title: 'Welcome to My Blog',
      content:
        "This is my first blog post. I'm excited to share my thoughts and experiences with you.",
      date: '2024-04-06',
      author: 'Your Name',
      tags: ['welcome', 'introduction'],
    },
    {
      title: 'Getting Started with React',
      content:
        "React is a powerful JavaScript library for building user interfaces. In this post, we\'ll explore the basics.",
      date: '2024-04-07',
      author: 'Your Name',
      tags: ['react', 'javascript', 'web-development'],
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Personal Blog</h1>
      </header>
      <main>
        <BlogList posts={samplePosts} />
      </main>
    </div>
  );
}

export default App;
