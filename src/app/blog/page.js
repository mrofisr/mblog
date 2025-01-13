import Layout from "@/components/custom/layout"
import ListLayout from "@/components/custom/list-layout"
import Title from "@/components/custom/title"
import config from "@/config/config"
import { getAllFilesFrontMatter } from "@/lib/mdx"

const POSTS_PER_PAGE = 10

export const metadata = {
  title: config.page.blog.title,
  description: config.page.blog.subtitle,
}

async function getBlogPosts() {
  const posts = await getAllFilesFrontMatter("posts")
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    posts,
    initialDisplayPosts,
    pagination,
  }
}

export default async function BlogPage() {
  const { posts, initialDisplayPosts, pagination } = await getBlogPosts()

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