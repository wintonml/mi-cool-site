import { promises as fs } from 'fs';
import path from 'path';

async function generateBlogJson() {
  const postsDir = path.join(__dirname, '../content/posts');
  const outputDir = path.join(__dirname, '../public');
  const outputFile = path.join(outputDir, 'blog-posts.js');
  
  try {
    // Ensure content/posts directory exists
    try {
      await fs.access(postsDir);
    } catch {
      console.log('Creating content/posts directory...');
      await fs.mkdir(postsDir, { recursive: true });
      
      // Create a sample blog post if none exists
      const samplePostPath = path.join(postsDir, 'welcome.md');
      const sampleContent = `---
title: "Welcome to My Blog"
date: "${new Date().toISOString()}"
author: "Admin"
tags: ["welcome", "getting-started"]
excerpt: "Welcome to my new blog!"
---

# Welcome to My Blog

This is a sample blog post. You can create more posts by adding markdown files to the \`content/posts\` directory.

## Getting Started

1. Create a new markdown file in the \`content/posts\` directory
2. Add front matter at the top of the file
3. Write your content using markdown
4. The blog will automatically update

Happy blogging! 🚀
`;
      await fs.writeFile(samplePostPath, sampleContent, 'utf8');
      console.log('Created sample blog post at content/posts/welcome.md');
    }

    const files = await fs.readdir(postsDir);
    const blogPosts: Record<string, string> = {};
    
    for (const file of files) {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const content = await fs.readFile(path.join(postsDir, file), 'utf8');
        blogPosts[file] = content;
      }
    }
    
    // Ensure public directory exists
    try {
      await fs.access(outputDir);
    } catch {
      await fs.mkdir(outputDir, { recursive: true });
    }
    
    // Write the JavaScript file that will be loaded by the browser
    await fs.writeFile(
      outputFile,
      `// This file is auto-generated. Do not edit directly.
// It contains all blog posts for the static site.
window.__BLOG_POSTS__ = ${JSON.stringify(blogPosts, null, 2)};
`,
      'utf8'
    );
    
    console.log(`✅ Successfully generated ${Object.keys(blogPosts).length} blog posts to ${outputFile}`);
  } catch (error) {
    console.error('❌ Error generating blog posts:', error);
    process.exit(1);
  }
}

// Run the script
generateBlogJson().catch(console.error);
