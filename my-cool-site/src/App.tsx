import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Project from './pages/Project';
import Video from './pages/Video';
import Blog from './pages/Blog';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar header="Mi-cool" links={['Home', 'Blog', 'Projects', 'Videos']} />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/mi-cool-site" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/videos" element={<Video />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
