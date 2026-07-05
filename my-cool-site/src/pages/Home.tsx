import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Styles from './Home.module.css';
import YouTubeEmbed from '../components/YouTubeEmbed/YouTubeEmbed';
import { HomeProps } from './interfaces/Home.types';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from './../common/constants/pages';

const Home: React.FC<HomeProps> = ({ post, video }) => {
  const contentSliceLength = 160;
  let content = post?.content.slice(0, contentSliceLength).trim();
  if (content && post && contentSliceLength < post.content.length && !content.endsWith('.')) {
    content = content.concat('...');
  }

  return (
    <div className={Styles.homePage}>
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
              Improving full-stack development skills by gaining more experience with React and
              TypeScript.
            </p>
          </div>
          <div className={Styles.statCard}>
            <Link to={PAGE_PATHS.BLOG} className={Styles.statLink}>
              <span className={Styles.statLabel}>Latest Update</span>
              <p>{post ? post.title : 'New content coming soon.'}</p>
            </Link>
          </div>
        </aside>
      </section>

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
            <h3>{post ? post.title : 'Nothing new to share yet'}</h3>
            {content ? (
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
            ) : (
              <p>Life has been quiet. Hopefully there will be an update soon.</p>
            )}
            {post && (
              <Link to={PAGE_PATHS.BLOG} className={Styles.cardLink}>
                Read the latest post
              </Link>
            )}
          </article>
          <article className={Styles.featuredCard}>
            <span className={Styles.sectionBadge}>Latest video</span>
            {video ? (
              <YouTubeEmbed
                key={video.videoId}
                videoId={video.videoId}
                title={video.title}
                datePublished={video.datePublished}
                description={video.description}
                displayVideoOnly={true}
              />
            ) : (
              <p>No videos to show.</p>
            )}
            <Link to={PAGE_PATHS.VIDEOS} className={Styles.cardLink}>
              Browse videos
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Home;
