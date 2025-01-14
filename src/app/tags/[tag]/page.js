import Layout from "@/components/custom/layout"
import ListLayout from "@/components/custom/list-layout"
import Title from "@/components/custom/title"
import config from "@/config/config"
import { getAllFilesFrontMatter } from "@/lib/mdx"
import kebabCase from "@/lib/kebab-case"
import formatDate from "@/lib/format-date"

const POSTS_PER_PAGE = 10

export const metadata = {
    title: config.page.blog.title,
    description: config.page.blog.subtitle,
}

async function getBlogPosts(tag) {
    const posts = await getAllFilesFrontMatter("posts")
    const filteredPosts = posts.filter(
        (post) =>
            post.draft !== true &&
            post.tags.map((t) => kebabCase(t)).includes(tag)
    )
    const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    }

    return {
        posts: filteredPosts,
        initialDisplayPosts,
        pagination,
    }
}

export default async function TagPage({ params }) {
    const tag = params.tag
    const { posts, initialDisplayPosts, pagination } = await getBlogPosts(tag)

    return (
        <Layout>
            <Title
                title={config.page.blog.title}
                subtitle={config.page.blog.subtitle}
            />
            <ListLayout
                posts={posts}
                initialDisplayPosts={initialDisplayPosts}
                pagination={pagination}
                title="All Posts"
            />
        </Layout>
    )
}