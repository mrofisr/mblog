"use client"
import Link from "next/link"
import kebabCase from "@/lib/kebab-case"
import * as motion from "motion/react-client"

const TagList = ({ tags }) => {
    const sortedTags = Object.entries(tags)
        .sort(([, countA], [, countB]) => countB - countA)

    const TagItem = ({ tag, count }) => (
        <motion.div
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
                    ({count})
                </span>
            </Link>
        </motion.div>
    )

    return (
        <div className="my-3 flex flex-wrap -m-1">
            {sortedTags.map(([tag, count]) => (
                <TagItem key={tag} tag={tag} count={count} />
            ))}
        </div>
    )
}

export default TagList
