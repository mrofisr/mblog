/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './image'
import Link from "next/link";
import Pre from './Pre'

export const MDXComponents = {
  Image,
  a: Link,
  pre: Pre,
  wrapper: ({ components, ...rest }) => {
    const Layout = require('./SimplePost').default
    return <Layout {...rest} />
  },
}

export const MDXLayoutRenderer = ({ mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout components={MDXComponents} {...rest} />
}