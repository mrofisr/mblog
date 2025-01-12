// app/posts/[slug]/page.js
import fs from "fs"
import { MDXLayoutRenderer } from "@/components/custom/mdx-components"
import {
    formatSlug,
    getAllFilesFrontMatter,
    getFileBySlug,
    getFiles,
} from "@/lib/mdx"
import generateRss from "@/lib/rss"

// Generate static params for all blog posts
export async function generateStaticParams() {
    const posts = getFiles("posts")
    return posts.map((post) => ({
        slug: formatSlug(post) // This returns a single string
    }))
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
    // Since params.slug is a string, we don't need to join it
    const post = await getFileBySlug("posts", params.slug)
    return {
        title: post.frontMatter.title,
        description: post.frontMatter.summary,
    }
}

// Main page component
export default async function BlogPost({ params }) {
    const allPosts = await getAllFilesFrontMatter("posts")

    // Update this to use params.slug directly since it's a string
    const postIndex = allPosts.findIndex(
        (post) => formatSlug(post.slug) === params.slug
    )

    const prev = allPosts[postIndex + 1] || null
    const next = allPosts[postIndex - 1] || null

    // Update this to use params.slug directly
    const post = await getFileBySlug("posts", params.slug)

    try {
        const rss = generateRss(allPosts)
        fs.writeFileSync("./public/feed.xml", rss)
    } catch (error) {
        console.error('Error generating RSS feed:', error)
    }

    const { mdxSource, frontMatter } = post

    return (
        <MDXLayoutRenderer
            mdxSource={mdxSource}
            frontMatter={frontMatter}
            prev={prev}
            next={next}
        />
    )
}

export function loading() {
    return <div>Loading post...</div>
}

export function error({ error }) {
    return <div>Error: {error.message}</div>
}