'use client'
import config from "@/config/config"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bottom-0 left-0 w-full border-t border-gray-200 bg-transparent backdrop-blur dark:border-gray-600 dark:bg-transparent">
            <div className="flex flex-col items-center justify-center w-full px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96 py-4">
                <div className="flex items-center gap-4 mb-2">
                    {config.socialLinks?.map((link, index) => (
                        <Link 
                            key={index}
                            href={link.url}
                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} {config.blogName}. All rights reserved.
                </span>
            </div>
        </footer>
    )
}
