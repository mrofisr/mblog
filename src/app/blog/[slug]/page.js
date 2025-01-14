import { MDXLayoutRenderer } from "@/components/custom/mdx-components"
import {
    formatSlug,
    getAllFilesFrontMatter,
    getFileBySlug,
} from "@/lib/mdx"

// Replace getStaticPaths with generateStaticParams
// export async function generateStaticParams() {
//     const posts = getFiles("posts")
//     return posts.map((post) => ({
//         slug: formatSlug(post).split("/"),
//     }))
// }

// Page component with built-in data fetching
export default async function Blog({ params }) {
    const { slug } = params;
    const allPosts = await getAllFilesFrontMatter("posts")
    console.log(slug)
    const postIndex = allPosts.findIndex(
        (post) => formatSlug(post.slug) === slug.join("/")
    )
    
    const prev = allPosts[postIndex + 1] || null
    const next = allPosts[postIndex - 1] || null
    const post = await getFileBySlug("posts", params.slug.join("/"))
    
    const { mdxSource, frontMatter } = post
    
    return (
        <>
            <MDXLayoutRenderer
                mdxSource={mdxSource}
                frontMatter={frontMatter}
                prev={prev}
                next={next}
            />
        </>
    )
}