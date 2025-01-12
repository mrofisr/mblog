// app/tags/[tag]/page.jsx
import Layout from "@/components/custom/layout";
import ListLayout from "@/components/custom/list-layout";
import generateRss from "@/lib/rss";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import kebabCase from "@/lib/kebab-case";
import fs from "fs";
import path from "path";

export async function generateStaticParams() {
    const tags = await getAllTags("posts");

    return Object.keys(tags).map((tag) => ({
        tag: tag,
    }));
}

export async function generateMetadata({ params }) {
    const tag = params.tag;
    // Fixed title formatting
    const title = tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : '';

    return {
        title: `${tag} - @mrofisr`,
        description: `${title} - @mrofisr`,
    };
}

export default async function TagPage({ params }) {
    const tag = params.tag;
    // Fixed title formatting
    const title = tag ? tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ') : '';

    // Get and filter posts
    const allPosts = await getAllFilesFrontMatter("posts");
    const filteredPosts = allPosts.filter(
        (post) =>
            post.draft !== true &&
            post.tags.map((t) => kebabCase(t)).includes(tag)
    );

    // Generate RSS feed
    const root = process.cwd();
    const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`);
    const rssPath = path.join(root, "public", "tags", tag);
    fs.mkdirSync(rssPath, { recursive: true });
    fs.writeFileSync(path.join(rssPath, "feed.xml"), rss);

    return (
        <Layout>
            <ListLayout posts={filteredPosts} title={title} />
        </Layout>
    );
}