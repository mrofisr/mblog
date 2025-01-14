import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx'],
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  experimental: {
    optimizeCss: true,
    mdxRs: true, // Enable the new RSC-compatible MDX implementation
  },
  images: {
    unoptimized: false
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize webpack config for MDX
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        // This should come after any other loaders
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [
              rehypeSlug,
              rehypeAutolinkHeadings,
              rehypeKatex,
              [rehypePrismPlus, { ignoreMissing: true }]
            ],
          }
        }
      ]
    })

    if (!dev && !isServer) {
      // Enable memory cache in production
      config.cache = {
        type: 'memory',
        maxGenerations: 1,
      }
    }

    return config
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypePrismPlus, { ignoreMissing: true }]
    ],
    providerImportSource: "@mdx-js/react"
  }
})

export default withMDX(nextConfig)