'use client'

import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import Image from '@/components/custom/image'
import Pre from '@/components/custom/pre'
import Link from 'next/link'

// Dynamically import with loading state
const SimplePost = dynamic(() => import('@/components/custom/simple-post'), {
  loading: () => {
    return (<>
      <div className="flex justify-center items-center h-screen">
        <span className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"/>
      </div>
    </>)
  }
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
    if (!mdxSource) return null

    try {
      return getMDXComponent(mdxSource)
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

MDXLayoutRenderer.propTypes = {
  mdxSource: PropTypes.string.isRequired,
}