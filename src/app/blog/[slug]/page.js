import { MDXContent } from '@/components/custom/mdx-components'
import { getAllFilesFrontMatter, getFileBySlug } from "@/lib/mdx"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export async function generateStaticParams() {
    const posts = await getAllFilesFrontMatter("posts")
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function Blog({ params }) {
    // Await the params before using them 
    const { slug } = await params

    if (!slug) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Invalid blog post URL</AlertDescription>
            </Alert>
        )
    }

    try {
        const rawSlug = Array.isArray(slug) ? slug.join('/') : slug
        const { mdxSource, frontMatter } = await getFileBySlug('posts', rawSlug)

        if (!mdxSource) {
            return (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Not Found</AlertTitle>
                    <AlertDescription>Blog post content not found</AlertDescription>
                </Alert>
            )
        }

        return (
            <MDXContent mdxSource={mdxSource} frontMatter={frontMatter} />
        )
    } catch (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to load blog post</AlertDescription>
            </Alert>
        )
    }
}