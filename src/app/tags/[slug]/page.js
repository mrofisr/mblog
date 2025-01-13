// src/app/tags/[slug]/page.js
import Layout from '@/components/custom/layout';
import Title from '@/components/custom/title';
import ListLayout from '@/components/custom/list-layout';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import { getAllTags } from '@/lib/tags';
import kebabCase from '@/lib/kebab-case';
import config from '@/config/config';

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = await getAllTags("posts");
  return Object.keys(tags).map((tag) => ({
    slug: tag,
  }));
}

// Metadata configuration
export async function generateMetadata({ params }) {
  const { slug } = params;
  const title = slug[0].toUpperCase() + slug.slice(1).split(" ").join("-");
  
  return {
    title: `${slug} - @mrofisr`,
    description: `${title} - @mrofisr`,
  };
}

// Main page component
export default async function TagPage({ params }) {
  const { slug } = params;
  const allPosts = await getAllFilesFrontMatter("posts");

  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(slug)
  );

  if (filteredPosts.length === 0) {
    console.warn(`No posts available for tag: ${slug}`);
    notFound();
  }

  const title = slug[0].toUpperCase() + slug.slice(1).split(" ").join("-");

  return (
    <Layout>
      <Title title={slug} subtitle={config.page.tags.subtitle} />
      <ListLayout posts={filteredPosts} title={title} />
    </Layout>
  );
}