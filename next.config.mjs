import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Ensure plugins are passed as plain arrays
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeKatex, rehypePrismPlus],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    optimizeCss: true,
  }
}

export default withMDX(nextConfig)