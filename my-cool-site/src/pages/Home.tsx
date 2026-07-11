import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Styles from './Home.module.css';
import YouTubeVideo from '../components/YouTubeVideo/YouTubeVideo';
import { YouTubeEmbedProps } from '../components/YouTubeEmbed';
import { HomeProps } from './interfaces/Home.types';
import { BlogPost } from '../utils/markdownUtils';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from './../common/constants/pages';

const Home: React.FC<HomeProps> = ({ post, video }) => {
  return (
    <div className={Styles.homePage}>
      {displayHeroSection(post)}
      {displayFeatureSection(post, video)}
      {displayTechnicalSkillsSection()}
    </div>
  );
};

function displayHeroSection(post: BlogPost | null = null) {
  const postContent = post ? post.title : 'New content coming soon.';

  return (
    <section className={Styles.hero}>
      <div className={Styles.heroCopy}>
        <p className={Styles.heroIntro}>Welcome to Mi-cool Site</p>
        <h1 className={Styles.heroTitle}>A place for projects, videos, and ideas.</h1>
        <p className={Styles.heroDescription}>
          I&#39;m a Kiwi who has moved from Wellington to Edinburgh. Solving problems is a passion
          of mine, whether it be coding or climbing.
          <br />
          I&#39;ve been working in the software industry since 2021. Starting out as a software
          automation engineer and now work as a full-stack developer.
        </p>
        {/* Add this section back when I have a projects page to add.
        I've removed the blog button at the same time as it did not look good as it was.
        <div className={Styles.ctaGroup}>
          <Link to={PAGE_PATHS.PROJECTS} className={Styles.ctaButton}>
            View Projects
          </Link>
          <Link to={PAGE_PATHS.BLOG} className={Styles.ctaSecondary}>
            Read Blog
          </Link>
        </div> */}
      </div>
      <aside className={Styles.heroAside}>
        <div className={Styles.statCard}>
          <span className={Styles.statLabel}>Current Focus</span>
          <p>
            Learning about designing data-intensive applications.
            <br />
            Currently, I&#39;m reading Designing Data-Intensive Applications by Martin Kleppmann.
          </p>
        </div>
        <div className={Styles.statCard}>
          <Link to={PAGE_PATHS.BLOG} className={Styles.statLink}>
            <span className={Styles.statLabel}>Latest Update</span>
            <p>{postContent}</p>
          </Link>
        </div>
      </aside>
    </section>
  );
}

function displayFeatureSection(
  post: BlogPost | null = null,
  video: YouTubeEmbedProps | null = null
) {
  const contentSliceLength = 160;
  const postTitle = post ? post.title : 'Nothing new to share yet';
  let content = post?.content.slice(0, contentSliceLength).trim();
  if (content && post && contentSliceLength < post.content.length && !content.endsWith('.')) {
    content = content.concat('...');
  }

  const postContent = content ? (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
  ) : (
    <p>Life has been quiet. Hopefully there will be an update soon.</p>
  );
  const videoContent = video ? (
    <YouTubeVideo key={video.videoId} videoId={video.videoId} title={video.title} />
  ) : (
    <p>No videos to show.</p>
  );

  return (
    <section className={Styles.section}>
      <div className={Styles.sectionHeader}>
        <h2>Featured</h2>
        <Link to={PAGE_PATHS.BLOG} className={Styles.sectionLink}>
          More posts →
        </Link>
      </div>
      <div className={Styles.featuredGrid}>
        <article className={Styles.featuredCard}>
          <span className={Styles.sectionBadge}>My Hobbies</span>
          <ul className={Styles.unorderedList}>
            <li>Climbing</li>
            <p>Bouldering since 2019.</p>
            <li>Running</li>
            <p>Consistently running since 2021.</p>
            <li>DJing</li>
            <p>Got my first decks in 2024.</p>
            <li>Talking nonsense</li>
            <p>Since the day I was born.</p>
          </ul>
        </article>
        <article className={Styles.featuredCard}>
          <span className={Styles.sectionBadge}>Latest post</span>
          <h3>{postTitle}</h3>
          <div className={Styles.markdownContent}>{postContent}</div>
          {post && (
            <Link to={PAGE_PATHS.BLOG} className={Styles.cardLink}>
              Read the latest post
            </Link>
          )}
        </article>
        <article className={Styles.featuredCard}>
          <span className={Styles.sectionBadge}>Latest video</span>
          {videoContent}
          <Link to={PAGE_PATHS.VIDEOS} className={Styles.cardLink}>
            Browse videos
          </Link>
        </article>
      </div>
    </section>
  );
}

function displayTechnicalSkillsSection() {
  const technicalSkills = [
    '.NET Development',
    'SQL',
    'JavaScript',
    'React',
    'TypeScript',
    'Git',
    'Python',
  ];

  return (
    <section className={Styles.section}>
      <div className={Styles.sectionHeader}>
        <h2>Technical Skills</h2>
      </div>
      <div className={Styles.skillsGrid}>
        {technicalSkills.map((skill) => (
          <div key={skill} className={Styles.skillChip}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
