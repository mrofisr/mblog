"use client"
import Layout from "@/components/custom/layout"
import Title from "@/components/custom/title"
import kebabCase from "@/lib/kebab-case"
import config from "@/config/config"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Tags() {
    const [tags, setTags] = useState < Record < string > ({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState < string | null > (null)

    useEffect(() => {
        async function loadTags() {
            try {
                const response = await fetch('/api/tags')
                if (!response.ok) {
                    throw new Error('Failed to fetch tags')
                }
                const tagsData = await response.json()
                setTags(tagsData)
            } catch (error) {
                console.error('Error loading tags:', error)
                setError(error instanceof Error ? error.message : 'An error occurred')
            } finally {
                setIsLoading(false)
            }
        }

        loadTags()
    }, [])

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
                {isLoading ? (
                    <div className="w-full text-center py-4">Loading tags...</div>
                ) : error ? (
                    <div className="w-full text-center py-4 text-red-500">
                        Error: {error}
                    </div>
                ) : (
                    <>
                        {Object.keys(tags).length === 0 && "No tags found."}
                        {sortedTags.map((tag) => (
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
                        ))}
                    </>
                )}
            </div>
        </Layout>
    )
}