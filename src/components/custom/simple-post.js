// components/custom/simple-post.js
'use client'

import Link from "next/link"
import formatDate from "@/lib/format-date"
import Layout from "@/components/custom/layout"

export default function SimplePost({ frontMatter, next, prev, children }) {
    const { date, title, desc } = frontMatter

    return (
        <Layout title={`${title} - @mrofisr`} description={desc}>
            <article className="max-w-none">
                <div>
                    <header>
                        <div className="space-y-1 text-center border-b border-gray-200 dark:border-gray-700">
                            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                                {title}
                            </h1>
                            <dl>
                                <div>
                                    <dt className="sr-only">Published on</dt>
                                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                        <time dateTime={date}>{formatDate(date)}</time>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </header>
                    <div
                        className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700"
                        style={{ gridTemplateRows: "auto 1fr" }}
                    >
                        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
                            <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">
                                {children}
                            </div>
                        </div>
                        <footer>
                            <nav className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                                {prev && (
                                    <div className="pt-4 xl:pt-8">
                                        <Link
                                            href={`/blog/${prev.slug}`}
                                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                        >
                                            <span aria-hidden="true">&larr;</span>
                                            {' '}
                                            <span className="sr-only">Previous post:</span>
                                            {prev.title}
                                        </Link>
                                    </div>
                                )}
                                {next && (
                                    <div className="pt-4 xl:pt-8">
                                        <Link
                                            href={`/blog/${next.slug}`}
                                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                        >
                                            <span className="sr-only">Next post:</span>
                                            {next.title}
                                            {' '}
                                            <span aria-hidden="true">&rarr;</span>
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </footer>
                    </div>
                </div>
            </article>
        </Layout>
    )
}