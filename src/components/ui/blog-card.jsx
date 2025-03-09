import React, { useState, useEffect } from "react"
import { CalendarDays, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import Layout from "@/components/custom/layout"
import BackToTop from "@/components/custom/back-to-top"
import { trackEvent } from "@/lib/umami"

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (scrollY / docHeight) * 100
      setProgress(scrolled)
      
      // Only show progress bar after scrolling down a bit
      setIsVisible(scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center justify-center">
      <div 
        className={`
          transition-all duration-300 rounded-full 
          px-3 py-1 text-xs font-medium
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
          bg-gray-800 text-white
          dark:bg-gray-700 dark:text-gray-100
          shadow-sm border border-gray-700 dark:border-gray-600
        `}
      >
        {Math.round(progress)}%
      </div>
    </div>
  )
}

// Monochrome tag component to replace Badge
function NotionTag({ children, onClick }) {
  return (
    <span 
      onClick={onClick}
      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 transition-colors duration-150 cursor-pointer"
    >
      {children}
    </span>
  )
}

export function BlogCard({ children, frontMatter, className }) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className="space-y-4 pb-6 border-b">
        {frontMatter?.title && (
          <h1 className="text-4xl font-bold tracking-tight text-center">
            {frontMatter.title}
          </h1>
        )}
        {frontMatter?.tags && (
          <div className="flex flex-wrap gap-2 justify-center">
            {frontMatter.tags.map((tag) => (
              <a key={tag} href={`/tags/${tag}`} className="no-underline">
                <NotionTag onClick={() => trackEvent("TagClick", { tag })}>
                  {tag}
                </NotionTag>
              </a>
            ))}
          </div>
        )}
        {(frontMatter?.date || frontMatter?.readingTime) && (
          <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
            {frontMatter.date && (
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={frontMatter.date}>
                  {new Date(frontMatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            )}
            {frontMatter?.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{frontMatter.readingTime.text}</span>
              </div>
            )}
          </div>
        )}
        {frontMatter?.summary && (
          <p className="text-center text-base text-muted-foreground leading-relaxed">
            {frontMatter.summary}
          </p>
        )}
      </div>
      <div className="pt-6 pb-8">
        <div className="prose dark:prose-invert max-w-none">{children}</div>
      </div>
    </div>
  )
}

export function BlogLayout({ frontMatter, children, className }) {
  useEffect(() => {
    trackEvent("BlogPostView", { title: frontMatter?.title })
  }, [])

  return (
    <Layout title={frontMatter?.title} description={frontMatter?.summary}>
      <ScrollProgress />
      <BlogCard frontMatter={frontMatter} className={className}>
        {children}
      </BlogCard>
      <BackToTop />
    </Layout>
  )
}