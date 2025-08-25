import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import About from './pages/About';
import Project from './pages/Project';
import Video from './pages/Video';
import Blog from './pages/Blog';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar header="Mi-cool" links={['About', 'Projects', 'Videos', 'Blog', 'Home']} />
        <main>
          <Routes>
            <Route path="/mi-cool-site" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
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
