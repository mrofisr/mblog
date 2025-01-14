// import createMDX from '@next/mdx'
// import remarkGfm from 'remark-gfm'
// import remarkMath from 'remark-math'
// import rehypeSlug from 'rehype-slug'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import rehypeKatex from 'rehype-katex'
// import rehypePrismPlus from 'rehype-prism-plus'

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   pageExtensions: ['js', 'jsx', 'mdx'],
//   reactStrictMode: true,
//   transpilePackages: ['next-mdx-remote'],
//   compiler: {
//     removeConsole: process.env.NODE_ENV === 'production'
//   },
//   experimental: {
//     optimizeCss: true,
//     mdxRs: true, // Enable the new RSC-compatible MDX implementation
//   },
//   images: {
//     unoptimized: false
//   },
//   webpack: (
//     config,
//     { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
//   ) => {
//     if (config.cache && !dev) {
//       config.cache = Object.freeze({
//         type: 'memory',
//       })
//     }
//     return config
//   },
// }

// const withMDX = createMDX({
//   options: {
//     remarkPlugins: [remarkGfm, remarkMath],
//     rehypePlugins: [
//       rehypeSlug,
//       rehypeAutolinkHeadings,
//       rehypeKatex,
//       [rehypePrismPlus, { ignoreMissing: true }]
//     ],
//     providerImportSource: "@mdx-js/react"
//   }
// })

// export default withMDX(nextConfig)

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;