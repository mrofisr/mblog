"use client"
import Layout from "@/components/custom/layout"
import Title from "@/components/custom/title"
import kebabCase from "@/lib/kebab-case"
import config from "@/config/config"
import Link from "next/link"
import formatDate from "@/lib/format-date"
import { getAllTags } from "@/lib/tags"

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

// TimeStamp Component
const TimeStamp = ({ timestamp }) => (
    <div className="mt-8 text-sm text-gray-600 dark:text-gray-400 space-y-1">
        <p>Current Date and Time (UTC+7): {formatDate(timestamp)}</p>
    </div>
)

// Data fetching using Next.js 15 Server Components
async function getTags() {
    const tags = await getAllTags("posts")
    return tags
  }
  

export default async function Tags() {
    const tags = await getTags()
    const sortedTags = tags
        ? Object.keys(tags).sort((a, b) => tags[b] - tags[a])
        : []

    return (
        <Layout
            title={config.page.tags.header}
            description={`${config.page.tags.title} - ${config.page.tags.subtitle}`}
        >
            <Title
                title={config.page.tags.title}
                subtitle={config.page.tags.subtitle}
            />

            {state.loading ? (
                <TagsSkeleton />
            ) : state.error ? (
                <ErrorMessage message={state.error} />
            ) : sortedTags.length === 0 ? (
                <div className="my-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-yellow-600 dark:text-yellow-400">
                        No tags found.
                    </p>
                </div>
            ) : (
                <div className="my-3 flex flex-wrap -m-1">
                    {sortedTags.map((tag) => (
                        <Link
                            key={tag}
                            href={`/tags/${kebabCase(tag)}`}
                            className="group m-1 bg-gray-300 hover:bg-gray-400 
                                     dark:bg-gray-700 dark:hover:bg-gray-600 
                                     rounded-full px-3 py-1 font-medium text-sm 
                                     leading-loose cursor-pointer transition-all 
                                     duration-200 hover:scale-105"
                        >
                            <span className="group-hover:text-gray-900 
                                         dark:group-hover:text-white">
                                {tag}
                            </span>{" "}
                            <span className="text-gray-600 dark:text-gray-400 
                                         group-hover:text-gray-700 
                                         dark:group-hover:text-gray-300">
                                ({state.tagsData[tag]})
                            </span>
                        </Link>
                    ))}
                </div>
            )}

            {!state.loading && !state.error && (
                <TimeStamp 
                    timestamp={state.timestamp} 
                    userLogin={state.userLogin}
                />
            )}
        </Layout>
    )
}