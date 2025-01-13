import fs from "fs";
import path from "path";
import { MDXLayoutRenderer } from "@/components/custom/mdx-components";
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from "@/lib/mdx";
import generateRss from "@/lib/rss";

export async function generateStaticParams() {
  const posts = await getFiles("posts"); // Ensure getFiles is awaited
  return posts.map((p) => ({
    slug: formatSlug(p),  // Ensure slug is a string
  }));
}

async function fetchData(slug) {
  const allPosts = await getAllFilesFrontMatter("posts");
  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug) === slug
  );
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug("posts", slug);

  // Generate RSS
  const rss = generateRss(allPosts);
  fs.writeFileSync(path.join(process.cwd(), "public", "feed.xml"), rss);

  return { post, prev, next };
}

export default async function Blog({ params }) {
  const { slug } = params; // Remove await from params.slug

  // Ensure slug is a string
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;

  const { post, prev, next } = await fetchData(slugString);

  const { mdxSource, frontMatter } = post;

  return (
    <>
      <MDXLayoutRenderer
        mdxSource={mdxSource}
        frontMatter={frontMatter}
        prev={prev}
        next={next}
      />
    </>
  );
}