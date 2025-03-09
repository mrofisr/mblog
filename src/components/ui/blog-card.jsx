import React, { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import Layout from "@/components/custom/layout" // Imported Layout
import BackToTop from "@/components/custom/back-to-top"

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (scrollY / docHeight) * 100
      setProgress(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div style={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-blue-200 via-blue-100 to-gray-200" />
    </div>
  )
}

export function BlogCard({ children, frontMatter, className }) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className="space-y-2 pb-4 border-b">
        {frontMatter?.title && (
          <h1 className="text-4xl font-bold tracking-tight text-center">
            {frontMatter.title}
          </h1>
        )}
        {frontMatter?.tags && (
          <div className="flex flex-wrap gap-2 justify-center">
            {frontMatter.tags.map((tag) => (
              <a key={tag} href={`/tags/${tag}`} className="cursor-pointer">
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  {tag}
                </Badge>
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

/* New BlogLayout component wrapping Layout around BlogCard and adding ScrollProgress */
export function BlogLayout({ frontMatter, children, className }) {
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