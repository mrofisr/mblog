'use client'

import Image from '@/components/custom/image'
import Pre from '@/components/custom/pre'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MDXRemote } from 'next-mdx-remote'
import { Suspense } from 'react'
import { BlogLayout } from '@/components/ui/blog-card'

// Define base styles as constants for reusability
const SCROLL_MARGIN = 'scroll-m-10'
const BASE_SPACING = 'my-4'

// Custom MDX components mapping with improved organization
export const mdxComponents = {
  Image,
  pre: ({ className, ...props }) => (
    <Pre
      className={cn(
        'mb-4 mt-4 overflow-x-auto rounded-lg border bg-muted px-4 py-4',
        'relative font-mono text-sm leading-[1.5] text-muted-foreground',
        className
      )}
      {...props}
    />
  ),
  h1: ({ className, ...props }) => (
    <h1 className={cn(`${SCROLL_MARGIN} text-4xl font-bold tracking-tight`, className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn(`${SCROLL_MARGIN} text-3xl font-semibold tracking-tight`, className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn(`${SCROLL_MARGIN} text-2xl font-semibold tracking-tight`, className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-4', className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn(`${BASE_SPACING} ml-6 list-disc`, className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn(`${BASE_SPACING} ml-6 list-decimal`, className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote className={cn('mt-4 border-l-2 pl-6 italic', className)} {...props} />
  ),
  a: ({ href = '', children, className, ...props }) => {
    const isInternal = href.startsWith('/') || href.startsWith('#')
    return isInternal ? (
      <Link
        href={href}
        className={cn('font-medium underline underline-offset-4', className)}
        {...props}
      >
        {children}
      </Link>
    ) : (
      <a
        href={href}
        className={cn('font-medium underline underline-offset-4', className)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  },
  code: ({ className, ...props }) => (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className
      )}
      {...props}
    />
  )
}

export function MDXContent({ mdxSource, frontMatter }) {
  if (!mdxSource) return null

  return (
    <BlogLayout frontMatter={frontMatter}>
      <div suppressHydrationWarning className="mdx-content">
        <MDXRemote {...mdxSource} components={mdxComponents} />
      </div>
    </BlogLayout>
  )
}

export function MDXWrapper({ source, frontmatter }) {
  if (!source) return null

  const mdxOptions = {
    parseFrontmatter: true,
    mdxOptions: {
      development: process.env.NODE_ENV === 'development'
    }
  }

  return (
    <div suppressHydrationWarning>
      <Suspense fallback={<div>Loading content...</div>}>
        <MDXRemote
          source={source}
          components={mdxComponents}
          frontmatter={frontmatter}
          options={mdxOptions}
        />
      </Suspense>
    </div>
  )
}
