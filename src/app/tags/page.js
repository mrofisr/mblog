import Layout from "@/components/custom/layout"
import Title from "@/components/custom/title"
import config from "@/config/config"
import { getAllTags } from "@/lib/tags"
import { TagsPageAnalytics } from "@/components/custom/page-analytics"
import TagList from "@/components/custom/taglist"

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
            <TagsPageAnalytics />
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
                <TagList tags={tags} /> // delegate client (hook) logic to TagList
            )}
        </Layout>
    )
}