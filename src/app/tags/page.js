import Layout from "@/components/custom/layout"
import Title from "@/components/custom/title"
import kebabCase from "@/lib/kebab-case"
import config from "@/config/config"
import Link from "next/link"
import { getAllTags } from "@/lib/tags"

async function getTags() {
    const posts = await getAllTags("posts")
    return posts
}

export default async function Tags() {
    const tags = await getTags()
    const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
    return (
        <Layout
            title={config.page.tags.header}
            description={`${config.page.tags.title} - ${config.page.tags.subtitle}`}
        >
            <Title
                title={config.page.tags.title}
                subtitle={config.page.tags.subtitle}
            />

            <div className="my-3 flex flex-wrap -m-1">
                {Object.keys(tags).length === 0 ? (
                    "No tags found."
                ) : (
                    sortedTags.map((tag) => (
                        <Link
                            key={tag}
                            href={`/tags/${kebabCase(tag)}`}
                            className="m-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 
                                     dark:hover:bg-gray-600 rounded-full px-3 py-1 
                                     font-medium text-sm leading-loose cursor-pointer
                                     transition-colors duration-200"
                        >
                            {tag} <span className="text-gray-600 dark:text-gray-400">
                                ({tags[tag]})
                            </span>
                        </Link>
                    ))
                )}
            </div>
        </Layout>
    )
}