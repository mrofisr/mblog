"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Pagination from "@/components/custom/pagination";
import formatDate from "@/lib/format-date";
import Link from "next/link";
import Tag from "@/components/custom/tag";

const SearchIcon = () => (
  <svg
    className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const PostCard = ({ post }) => {
  const { slug, date, title, desc, tags } = post;

  return (
    <motion.li
      key={slug}
      className="py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.article
        className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg p-4 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
      >
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date)}</time>
            </dd>
          </dl>
          <div className="space-y-3 xl:col-span-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 leading-7 tracking-tight transition-colors duration-200">
                <Link href={`/blog/${slug}`} className="group-hover:text-gray-600 dark:group-hover:text-gray-300">
                  {title}
                </Link>
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
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
              <Link
                href={`/blog/${slug}`}
                className="inline-flex items-center group-hover:text-gray-900 dark:group-hover:text-gray-100"
                aria-label={`Read "${title}"`}
              >
                Read more
                <svg
                  className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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
      </motion.article>
    </motion.li>
  );
};

export default function ListLayout({
  posts,
  initialDisplayPosts = [],
  pagination,
}) {
  const [searchValue, setSearchValue] = useState("");

  const filteredBlogPosts = useMemo(() =>
    posts.filter((frontMatter) => {
      const searchContent = `${frontMatter.title} ${frontMatter.desc} ${frontMatter.tags.join(" ")}`;
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    }),
    [posts, searchValue]
  );

  const displayPosts = useMemo(() =>
    initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredBlogPosts,
    [initialDisplayPosts, searchValue, filteredBlogPosts]
  );

  return (
    <>
      <div>
        <div className="relative max-w-lg">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <SearchIcon />
        </div>
        <ul className="divide-y divide-gray-400 md:divide-y-1 dark:divide-gray-700">
          {!filteredBlogPosts.length && "No posts found."}
          {displayPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  );
}