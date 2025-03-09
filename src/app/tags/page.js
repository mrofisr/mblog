import Layout from "@/components/custom/layout"
import Title from "@/components/custom/title"
import kebabCase from "@/lib/kebab-case"
import config from "@/config/config"
import Link from "next/link"
import { getAllTags } from "@/lib/tags"
import * as motion from "motion/react-client"

// Loading Skeleton Component
const TagsSkeleton = () => (
    <div className="my-3 flex flex-wrap -m-1 animate-pulse">
        {[...Array(8)].map((_, i) => (
            <div
                key={i}
                className="m-1 bg-gray-200 dark:bg-gray-700 rounded-full 
                         h-8 w-24 opacity-60"
            />
        ))}
    </div>
)

// Error Message Component
const ErrorMessage = ({ message }) => (
    <div className="my-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400">
            {message || "Failed to load tags"}
        </p>
    </div>
)

// Metadata configuration using Next.js 15 metadata API
export const metadata = {
    title: config.page.tags.header,
    description: `${config.page.tags.title} - ${config.page.tags.subtitle}`,
}

// Data fetching using Next.js 15 Server Components
async function getTags() {
    try {
        const tags = await getAllTags("posts")
        return { tags, error: null }
    } catch (error) {
        return { tags: null, error: "Failed to load tags" }
    }
}

export default async function Tags() {
    // Fetch tags directly in the component
    const { tags, error } = await getTags()

    return (
        <Layout
            title={config.page.tags.header}
            description={`${config.page.tags.title} - ${config.page.tags.subtitle}`}
        >
            <Title
                title={config.page.tags.title}
                subtitle={config.page.tags.subtitle}
            />

            {error ? (
                <ErrorMessage message={error} />
            ) : !tags ? (
                <TagsSkeleton />
            ) : Object.keys(tags).length === 0 ? (
                <div className="my-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-yellow-600 dark:text-yellow-400">
                        No tags found.
                    </p>
                </div>
            ) : (
                <div className="my-3 flex flex-wrap -m-1">
                    {Object.keys(tags)
                        .sort((a, b) => tags[b] - tags[a])
                        .map((tag) => (
                            <motion.div
                                key={tag}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link
                                    href={`/tags/${kebabCase(tag)}`}
                                    className="group m-1 bg-gray-300 hover:bg-gray-400 
                                             dark:bg-gray-700 dark:hover:bg-gray-600 
                                             rounded-full px-3 py-1 font-medium text-sm 
                                             leading-loose cursor-pointer transition-all 
                                             duration-200 hover:scale-105 inline-block"
                                >
                                    <motion.span
                                        className="group-hover:text-gray-900 
                                                 dark:group-hover:text-white"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        {tag}
                                    </motion.span>{" "}
                                    <span className="text-gray-600 dark:text-gray-400 
                                                 group-hover:text-gray-700 
                                                 dark:group-hover:text-gray-300">
                                        ({tags[tag]})
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                </div>
            )}
        </Layout>
    )
}