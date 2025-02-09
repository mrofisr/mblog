import { MDXLayoutRenderer } from "@/components/custom/mdx-components"
import {
    formatSlug,
    getAllFilesFrontMatter,
    getFileBySlug,
} from "@/lib/mdx"

// Page component with built-in data fetching
export default async function Blog({ params }) {
    const { slug } = await params
    const allPosts = await getAllFilesFrontMatter("posts")
    
    // If slug is an array, join it, otherwise use it as is
    const formattedSlug = Array.isArray(slug) ? slug.join("/") : slug
    
    const postIndex = allPosts.findIndex(
        (post) => formatSlug(post.slug) === formattedSlug
    )
    
    const prev = allPosts[postIndex + 1] || null
    const next = allPosts[postIndex - 1] || null
    
    try {
        const post = await getFileBySlug("posts", formattedSlug)
        const { mdxSource, frontMatter } = post
        return (
            <MDXLayoutRenderer
                mdxSource={mdxSource}
                frontMatter={frontMatter}
                prev={prev}
                next={next}
            />
        )
    } catch (error) {
        console.error('Error processing MDX:', error)
        return <div>Error loading post content</div>
    }
}