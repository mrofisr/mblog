import fs from 'fs';
import path from 'path';
import Layout from '@/components/custom/layout';
import Title from '@/components/custom/title';
import ListLayout from '@/components/custom/list-layout';
import generateRss from '@/lib/rss';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import { getAllTags } from '@/lib/tags';
import kebabCase from '@/lib/kebab-case';
import config from '@/config/config';

const root = process.cwd();

export async function generateStaticParams() {
  const tags = await getAllTags("posts");

  return Object.keys(tags).map((tag) => ({
    slug: tag,
  }));
}

async function fetchPostsByTag(tag) {
  const allPosts = await getAllFilesFrontMatter("posts");

  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
  );

  if (filteredPosts.length === 0) {
    console.warn(`No posts available for tag: ${tag}`);
    return [];
  }

  // Generate RSS feed
  const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`);
  const rssPath = path.join(root, "public", "tags", tag);
  fs.mkdirSync(rssPath, { recursive: true });
  fs.writeFileSync(path.join(rssPath, "feed.xml"), rss);

  return filteredPosts;
}

export default async function TagPage({ params }) {
  const slug = await params.slug; // Ensure params is awaited
  const posts = await fetchPostsByTag(slug);
  const title = slug[0].toUpperCase() + slug.slice(1).split(" ").join("-");

  return (
    <Layout title={`${slug} - @mrofisr`} description={`${title} - @mrofisr`}>
      <Title title={slug.toUpperCase()} subtitle={config.page.tags.subtitle} />
      <ListLayout posts={posts} title={title} />
    </Layout>
  );
}