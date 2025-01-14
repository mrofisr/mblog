import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import Image from '@/components/custom/image'
import Pre from '@/components/custom/pre'
import Link from 'next/link'

// Dynamically import with loading state
const SimplePost = dynamic(() => import('@/components/custom/simple-post'), {
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

MDXLayoutRenderer.propTypes = {
  mdxSource: PropTypes.string.isRequired,
}