import { generateMetadata } from 'next'
import Layout from "@/components/custom/layout"
import Tag from "@/components/custom/tag"
import Title from "@/components/custom/title"
import config from "@/config/config"
import formatDate from "@/lib/format-date"
import { getAllFilesFrontMatter } from "@/lib/mdx"
import Link from "next/link"

const MAX_DISPLAY = 5

// Metadata configuration using Next.js 15 metadata API
export const metadata = {
  title: config.page.index.header,
  description: `${config.page.index.title} - ${config.page.index.subtitle}`,
}

// Data fetching using Next.js 15 Server Components
async function getPosts() {
  const posts = await getAllFilesFrontMatter("posts")
  return posts
}

export default async function Home() {
  // Fetch posts directly in the component
  const posts = await getPosts()

  return (
    <Layout>
      <Title title={config.page.index.title} subtitle={config.page.index.subtitle} />
      <ul className="divide-y divide-gray-400 md:divide-y-1 dark:divide-gray-700">
        {!posts.length && "No posts found."}
        {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
          const { slug, date, title, desc, tags } = frontMatter
          return (
            <li key={slug} className="py-4">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl hover:underline text-yellow-600 dark:text-yellow-400 font-bold leading-8 tracking-tight">
                          <Link href={`/blog/${slug}`}>{title}</Link>
                        </h2>
                        <div className="flex flex-wrap mt-1">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                        {desc}
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6 dark:text-white">
                      <Link
                        href={`/blog/${slug}`}
                        aria-label={`Read "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6 dark:text-white">
          <Link href="/blog" aria-label="all posts">
            All Posts &rarr;
          </Link>
        </div>
      )}
    </Layout>
  )
}