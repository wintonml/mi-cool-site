import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar/NavBar';
//import Project from './pages/Project';
import Video from './pages/Video';
import Blog from './pages/Blog';
import Home from './pages/Home';
import { PAGE_NAMES, PAGE_PATHS } from './common/constants/pages';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar
          header="Mi-cool"
          links={[
            PAGE_NAMES.HOME,
            PAGE_NAMES.BLOG,
            //PAGE_NAMES.PROJECTS,
            PAGE_NAMES.VIDEOS,
          ]}
        />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to={PAGE_PATHS.HOME} replace />} />
            <Route
              path={PAGE_PATHS.MI_COOL_SITE}
              element={<Navigate to={PAGE_PATHS.HOME} replace />}
            />
            <Route path={PAGE_PATHS.HOME} element={<Home />} />
            {/** <Route path={PAGE_PATHS.PROJECTS} element={<Project />} />
             * Add this back in once I have information to populate this page.
             */}
            <Route path={PAGE_PATHS.VIDEOS} element={<Video />} />
            <Route path={PAGE_PATHS.BLOG} element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
