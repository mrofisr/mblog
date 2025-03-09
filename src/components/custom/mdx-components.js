'use client'

import Image from '@/components/custom/image'
import Pre from '@/components/custom/pre'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MDXRemote } from 'next-mdx-remote'
import { Suspense } from 'react'
import { BlogLayout } from '@/components/ui/blog-card'

// Custom MDX components mapping
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
    <h1 className={cn('scroll-m-10 text-4xl font-bold tracking-tight', className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn('scroll-m-10 text-3xl font-semibold tracking-tight', className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn('scroll-m-10 text-2xl font-semibold tracking-tight', className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-4', className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn('my-4 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('my-4 ml-6 list-decimal', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote className={cn('mt-4 border-l-2 pl-6 italic', className)} {...props} />
  ),
  a: ({ href = '', children, className, ...props }) => {
    const isInternal = href.startsWith('/') || href.startsWith('#')
    const Component = isInternal ? Link : 'a'
    return (
      <Component
        href={href}
        className={cn('font-medium underline underline-offset-4', className)}
        {...(isInternal ? props : { target: '_blank', rel: 'noopener noreferrer', ...props })}
      >
        {children}
      </Component>
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

// MDX for blog pages using a layout component
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

// MDX wrapper for standalone MDX rendering with Suspense fallback
export function MDXWrapper({ source, frontmatter }) {
  if (!source) return null

  return (
    <div suppressHydrationWarning>
      <Suspense fallback={<div>Loading content...</div>}>
        <MDXRemote
          source={source}
          components={mdxComponents}
          frontmatter={frontmatter}
          options={{
            parseFrontmatter: true,
            mdxOptions: {
              development: process.env.NODE_ENV === 'development'
            }
          }}
        />
      </Suspense>
    </div>
  )
}
