'use client'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from '@/components/custom/image'
import Link from 'next/link'
import Pre from '@/components/custom/pre'

// Dynamically import with loading state
const SimplePost = dynamic(() => import('@/components/custom/simple-post'), {
  ssr: true,
  loading: () => <div>Loading...</div>
})

export const MDXComponents = {
  Image,
  a: ({ href, children, ...rest }) => {
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
    if (isInternalLink) {
      return <Link href={href} {...rest}>{children}</Link>
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
  },
  pre: Pre,
  wrapper: ({ children, ...rest }) => {
    return <SimplePost {...rest}>{children}</SimplePost>
  },
}

export const MDXLayoutRenderer = ({ mdxSource, ...rest }) => {
  const MDXContent = useMemo(() => {
    try {
      return mdxSource ? getMDXComponent(mdxSource) : null
    } catch (error) {
      console.error('Error creating MDX component:', error)
      return null
    }
  }, [mdxSource])

  if (!MDXContent) {
    return <div>Error loading content</div>
  }

  return (
    <MDXContent
      components={MDXComponents}
      {...rest}
    />
  )
}