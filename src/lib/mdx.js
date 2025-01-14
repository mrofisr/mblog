import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import { visit } from 'unist-util-visit'
import { remarkExtractFrontmatter } from 'remark-extract-frontmatter'
import { bundleMDX } from 'mdx-bundler'
import imgToJsx from '@/lib/img-to-jsx'
import getAllFilesRecursively from '@/lib/files'
import remarkCodeTitle from '@/lib/remark-code-title'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const root = process.cwd()

const tokenClassNames = {
    tag: 'text-code-red',
    'attr-name': 'text-code-yellow',
    'attr-value': 'text-code-green',
    deleted: 'text-code-red',
    inserted: 'text-code-green',
    punctuation: 'text-code-white',
    keyword: 'text-code-purple',
    string: 'text-code-green',
    function: 'text-code-blue',
    boolean: 'text-code-red',
    comment: 'text-gray-400 italic',
}

export function getFiles(type) {
    const prefixPaths = path.join(root, type)
    const files = getAllFilesRecursively(prefixPaths)
    return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
}

export function formatSlug(slug) {
    return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a, b) {
    if (a > b) return -1
    if (a < b) return 1
    return 0
}

export async function getFileBySlug(type, slug) {
    const mdxPath = path.join(root, type, `${slug}.mdx`)
    const mdPath = path.join(root, type, `${slug}.md`)
    const source = fs.existsSync(mdxPath)
        ? fs.readFileSync(mdxPath, 'utf8')
        : fs.readFileSync(mdPath, 'utf8')

    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            'node_modules',
            'esbuild',
            'esbuild.exe'
        )
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            'node_modules',
            'esbuild',
            'bin',
            'esbuild'
        )
    }

    const { frontmatter, code } = await bundleMDX({
        source,
        cwd: path.join(process.cwd(), 'components'),
        mdxOptions(options) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                remarkGfm,
                remarkMath,
                remarkCodeTitle,
                remarkExtractFrontmatter,
                imgToJsx,
            ]
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                rehypeSlug,
                [
                    rehypeAutolinkHeadings,
                    {
                        properties: {
                            className: ['anchor'],
                        },
                    },
                ],
                rehypeKatex,
                [rehypePrismPlus, { ignoreMissing: true }],
                () => {
                    return (tree) => {
                        visit(tree, 'element', (node, index, parent) => {
                            let [token, type] = node.properties.className || []
                            if (token === 'token') {
                                node.properties.className = [tokenClassNames[type]]
                            }
                        })
                    }
                },
            ]
            return options
        },
        esbuildOptions: (options) => {
            options.loader = {
                ...options.loader,
                '.js': 'jsx',
            }
            return options
        },
    })

    return {
        mdxSource: code,
        frontMatter: {
            readingTime: readingTime(code),
            slug: slug || null,
            fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
            ...frontmatter,
        },
    }
}

export async function getAllFilesFrontMatter(folder) {
    const prefixPaths = path.join(root, folder)
    const files = getAllFilesRecursively(prefixPaths)
    const allFrontMatter = []

    files.forEach((file) => {
        // Replace is needed to work on Windows
        const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
        // Remove Unexpected File
        if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
            return
        }
        const source = fs.readFileSync(file, 'utf8')
        const { data } = matter(source)
        if (data.draft !== true) {
            allFrontMatter.push({ ...data, slug: formatSlug(fileName) })
        }
    })

    return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}