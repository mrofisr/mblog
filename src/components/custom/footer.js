'use client'
import config from "@/config/config"

export default function Footer() {
    return (
        <footer className="bottom-0 left-0 w-full border-t border-gray-200 bg-transparent backdrop-blur dark:border-gray-600 dark:bg-transparent">
            <div className="flex items-center justify-center w-full px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96 py-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} {config.blogName}. All rights reserved.
                </span>
            </div>
        </footer>
    )
}
