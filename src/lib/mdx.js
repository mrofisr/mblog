import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import imgToJsx from '@/lib/img-to-jsx'
import getAllFilesRecursively from '@/lib/files'
import remarkCodeTitle from '@/lib/remark-code-title'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { visit } from 'unist-util-visit'
import { bundleMDX } from 'mdx-bundler'

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

    // Parse frontmatter and content
    const { data: frontMatter, content } = matter(source, {
        delimiters: ['---', '---'],
        engines: {
            yaml: (s) => require('js-yaml').load(s, { schema: require('js-yaml').JSON_SCHEMA })
        }
    })

    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe')
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild')
    }

    try {
        const { code } = await bundleMDX({
            source: content,
            files: {}, // Provide imported files here if needed
            mdxOptions(options) {
                options.remarkPlugins = [
                    ...(options.remarkPlugins ?? []),
                    remarkGfm,
                    remarkMath,
                    remarkCodeTitle,
                    [imgToJsx, { dir: path.join(root, type) }],
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
                    [rehypePrismPlus, { 
                        ignoreMissing: true,
                        showLineNumbers: true 
                    }],
                    () => (tree) => {
                        visit(tree, 'element', (node) => {
                            let [token, type] = node.properties.className || []
                            if (token === 'token') {
                                node.properties.className = [tokenClassNames[type]]
                            }
                        })
                    },
                ]
                return options
            },
            esbuildOptions: (options) => ({
                ...options,
                target: 'es2020',
                platform: 'node',
                loader: {
                    ...options.loader,
                    '.js': 'jsx',
                    '.ts': 'tsx',
                },
                minify: false,
                bundle: true,
                logLevel: 'error',
                write: false,
                outdir: path.join(root, 'dist'),
            }),
        })

        return {
            mdxSource: code,
            frontMatter: {
                readingTime: readingTime(content),
                slug: slug || null,
                fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
                ...frontMatter,
                date: frontMatter.date ? new Date(frontMatter.date).toISOString() : null,
            },
        }
    } catch (error) {
        console.error('MDX bundling error:', error)
        throw error
    }
}

export async function getAllFilesFrontMatter(folder) {
    const prefixPaths = path.join(root, folder)
    const files = getAllFilesRecursively(prefixPaths)
    const allFrontMatter = []

    files.forEach((file) => {
        const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
        if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
            return
        }
        const source = fs.readFileSync(file, 'utf8')
        const { data } = matter(source)
        if (data.draft !== true) {
            allFrontMatter.push({ 
                ...data,
                slug: formatSlug(fileName),
                date: data.date ? new Date(data.date).toISOString() : null
            })
        }
    })

    return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}