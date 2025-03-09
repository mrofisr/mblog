// src/lib/rss.js
import fs from 'fs/promises'; // Use promise-based fs
import path from 'path';
import { escape } from '@/lib/html-escaper';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import kebabCase from '@/lib/kebab-case';
import config from '@/config/config';

const root = process.cwd();

// Validate required post fields
const isValidPost = (post) => {
  const requiredFields = ['slug', 'title', 'date'];
  return requiredFields.every(field => post?.[field]);
};

// Generate individual RSS item
const generateRssItem = (post) => {
  if (!isValidPost(post)) {
    console.error('Invalid post object:', post);
    return '';
  }

  const { siteUrl, author } = config;
  return `
    <item>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <title>${escape(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      ${post.desc ? `<description>${escape(post.desc)}</description>` : ''}
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${author}</author>
    </item>
  `.trim();
};

// Generate RSS feed content
const generateRss = (posts, page = 'feed.xml') => {
  if (!Array.isArray(posts) || posts.length === 0) {
    throw new Error('No posts available to generate RSS feed');
  }

  const { title, siteUrl, description, language, author } = config;
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escape(title)}</title>
        <link>${siteUrl}/blog</link>
        <description>${escape(description)}</description>
        <language>${language}</language>
        <managingEditor>${author}</managingEditor>
        <webMaster>${author}</webMaster>
        <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
        <atom:link href="${siteUrl}/${page}" rel="self" type="application/rss+xml"/>
        ${posts.map(generateRssItem).join('\n')}
      </channel>
    </rss>
  `.trim();
};

// Write RSS feed to file
async function writeRSSFeed(content, filePath) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, content);
}

// Generate RSS feeds for all tags
export async function generateTagRSSFeeds() {
  const allPosts = await getAllFilesFrontMatter("posts");
  const tags = new Set(allPosts.flatMap(post => post.tags?.map(kebabCase) || []));

  await Promise.all([...tags].map(async tag => {
    const filteredPosts = allPosts.filter(
      post => !post.draft && post.tags?.map(kebabCase).includes(tag)
    );

    if (filteredPosts.length > 0) {
      const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`);
      await writeRSSFeed(rss, path.join(root, "public", "tags", tag, "feed.xml"));
    }
  }));
}

// Generate main RSS feed
export async function generateMainRSSFeed() {
  const allPosts = await getAllFilesFrontMatter("posts");
  const filteredPosts = allPosts.filter(post => !post.draft);

  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, 'feed.xml');
    await writeRSSFeed(rss, path.join(root, "public", "feed.xml"));
  }
}

// Generate all RSS feeds
export async function generateAllRSSFeeds() {
  try {
    await Promise.all([
      generateMainRSSFeed(),
      generateTagRSSFeeds()
    ]);
    console.log('All RSS feeds generated successfully!');
  } catch (error) {
    console.error('Error generating RSS feeds:', error);
    throw error;
  }
}

export default generateRss;