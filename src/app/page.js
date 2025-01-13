// src/app/page.js
import Layout from "@/components/custom/layout"
import Tag from "@/components/custom/tag"
import Title from "@/components/custom/title"
import config from "@/config/config"
import formatDate from "@/lib/format-date"
import { getAllFilesFrontMatter } from "@/lib/mdx"
import * as motion from "motion/react-client"
import Link from "next/link"

const MAX_DISPLAY = 10

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
          const { slug, date, title, desc, tags } = frontMatter;
          return (
            <motion.li
              key={slug}
              className="py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg p-4 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
              >
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-4 xl:col-span-3">
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 leading-7 tracking-tight transition-colors duration-200">
                          <Link href={`/blog/${slug}`} className="group-hover:text-gray-600 dark:group-hover:text-gray-300">
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose prose-gray text-gray-600 dark:text-gray-300 line-clamp-3">
                        {desc}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                      <Link
                        href={`/blog/${slug}`}
                        className="inline-flex items-center group-hover:text-gray-900 dark:group-hover:text-gray-100"
                        aria-label={`Read "${title}"`}
                      >
                        Read more
                        <svg
                          className="ml-1 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.li>
          );
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