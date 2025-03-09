// src/lib/rss.js
import fs from 'fs';
import path from 'path';
import { escape } from '@/lib/html-escaper';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import kebabCase from '@/lib/kebab-case';
import config from '@/config/config';

const root = process.cwd();

// Generate individual RSS item
const generateRssItem = (post) => {
  if (!post || !post.slug || !post.title || !post.date) {
    console.error('Invalid post object:', post);
    return '';
  }

  return `
    <item>
      <guid>${config.siteUrl}/blog/${post.slug}</guid>
      <title>${escape(post.title)}</title>
      <link>${config.siteUrl}/blog/${post.slug}</link>
      ${post.desc ? `<description>${escape(post.desc)}</description>` : ''}
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>(${config.author})</author>
    </item>
  `;
};

// Generate RSS feed content
const generateRss = (posts, page = 'feed.xml') => {
  if (!posts || posts.length === 0) {
    console.error('No posts available to generate RSS feed');
    return '';
  }

  return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escape(config.title)}</title>
        <link>${config.siteUrl}/blog</link>
        <description>${escape(config.description)}</description>
        <language>${config.language}</language>
        <managingEditor>(${config.author})</managingEditor>
        <webMaster>(${config.author})</webMaster>
        <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
        <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
        ${posts.map(generateRssItem).join('')}
      </channel>
    </rss>
  `;
};

// Generate RSS feeds for all tags
export async function generateTagRSSFeeds() {
  const allPosts = await getAllFilesFrontMatter("posts");
  
  // Get unique tags
  const allTags = new Set();
  allPosts.forEach(post => {
    post.tags.forEach(tag => {
      allTags.add(kebabCase(tag));
    });
  });

  // Generate RSS feed for each tag
  for (const tag of allTags) {
    const filteredPosts = allPosts.filter(
      (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
    );

    if (filteredPosts.length > 0) {
      const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`);
      const rssPath = path.join(root, "public", "tags", tag);
      fs.mkdirSync(rssPath, { recursive: true });
      fs.writeFileSync(path.join(rssPath, "feed.xml"), rss);
    }
  }
}

// Generate main RSS feed
export async function generateMainRSSFeed() {
  const allPosts = await getAllFilesFrontMatter("posts");
  const filteredPosts = allPosts.filter((post) => post.draft !== true);

  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, 'feed.xml');
    const rssPath = path.join(root, "public");
    fs.writeFileSync(path.join(rssPath, "feed.xml"), rss);
  }
}

// Generate all RSS feeds
export async function generateAllRSSFeeds() {
  try {
    console.log('Generating main RSS feed...');
    await generateMainRSSFeed();
    
    console.log('Generating tag-specific RSS feeds...');
    await generateTagRSSFeeds();
    
    console.log('All RSS feeds generated successfully!');
  } catch (error) {
    console.error('Error generating RSS feeds:', error);
    throw error;
  }
}

export default generateRss;