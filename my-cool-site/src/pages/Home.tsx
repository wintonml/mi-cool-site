import React from 'react';
import Styles from './Home.module.css';
import YouTubeEmbed from '../components/YouTubeEmbed/YouTubeEmbed';
import { getAllPosts } from '../utils/markdownUtils';
import { getLatestVideoFromJson } from '../utils/videoUtils';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from './../common/constants/pages';

const Home: React.FC = () => {
  const posts = getAllPosts();
  const latestPost = posts[0];
  const latestVideo = getLatestVideoFromJson();
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
          <div className={Styles.ctaGroup}>
            <Link to={PAGE_PATHS.PROJECTS} className={Styles.ctaButton}>
              View Projects
            </Link>
            <Link to={PAGE_PATHS.BLOG} className={Styles.ctaSecondary}>
              Read Blog
            </Link>
          </div>
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
              <p>{latestPost ? latestPost.title : 'New content coming soon.'}</p>
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
            <h3>{latestPost ? latestPost.title : 'Nothing new to share yet'}</h3>
            <p>
              {latestPost
                ? `${latestPost.content.slice(0, 160)}...`
                : 'Life has been quiet. Hopefully there will be an update soon.'}
            </p>
            {latestPost && (
              <Link to={PAGE_PATHS.BLOG} className={Styles.cardLink}>
                Read the latest post
              </Link>
            )}
          </article>
          <article className={Styles.featuredCard}>
            <span className={Styles.sectionBadge}>Latest video</span>
            {latestVideo ? (
              <YouTubeEmbed
                key={latestVideo?.videoId}
                videoId={latestVideo?.videoId}
                title={latestVideo?.title}
                datePublished={latestVideo?.datePublished}
                description={latestVideo?.description}
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
