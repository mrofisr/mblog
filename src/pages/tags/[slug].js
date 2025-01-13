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

export async function getStaticPaths() {
  const tags = await getAllTags("posts");

  const paths = Object.keys(tags).map((tag) => ({
    params: { slug: tag },
  }));

  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const allPosts = await getAllFilesFrontMatter("posts");

  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(slug)
  );

  if (filteredPosts.length === 0) {
    console.warn(`No posts available for tag: ${slug}`);
    return { notFound: true };
  }

  // Generate RSS feed
  const rss = generateRss(filteredPosts, `tags/${slug}/feed.xml`);
  const rssPath = path.join(root, "public", "tags", slug);
  fs.mkdirSync(rssPath, { recursive: true });
  fs.writeFileSync(path.join(rssPath, "feed.xml"), rss);

  return {
    props: {
      posts: filteredPosts,
      slug,
    },
  };
}

export default function TagPage({ posts, slug }) {
  const title = slug[0].toUpperCase() + slug.slice(1).split(" ").join("-");

  return (
    <Layout title={`${slug} - @mrofisr`} description={`${title} - @mrofisr`}>
      <Title title={slug} subtitle={config.page.tags.subtitle} />
      <ListLayout posts={posts} title={title} />
    </Layout>
  );
}