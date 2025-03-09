import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeKatex from 'rehype-katex'
import remarkCodeTitle from './remark-code-title'
import getAllFilesRecursively from '@/lib/files'

const root = process.cwd()

export function formatSlug(slug) {
    return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a, b) {
    if (a > b) return -1
    if (a < b) return 1
    return 0
}

export async function getFileBySlug(type, slug) {
    try {
        const mdxPath = path.join(root, type, `${slug}.mdx`)
        const mdPath = path.join(root, type, `${slug}.md`)
        const source = fs.existsSync(mdxPath)
            ? fs.readFileSync(mdxPath, 'utf8')
            : fs.readFileSync(mdPath, 'utf8')

        const { data: frontMatter, content } = matter(source)
        const mdxSource = await serialize(content, {
            parseFrontmatter: true,
            scope: frontMatter,
            mdxOptions: {
                remarkPlugins: [
                    remarkGfm,
                    remarkMath,
                    remarkCodeTitle,
                ],
                rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                    [rehypePrismPlus, { ignoreMissing: true }],
                    rehypeKatex,
                ],
            },
        })

        return {
            mdxSource,
            frontMatter: {
                readingTime: readingTime(content),
                slug: slug || null,
                fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
                ...frontMatter,
                date: frontMatter.date ? new Date(frontMatter.date).toISOString() : null,
            },
        }
    } catch (error) {
        console.error(`Error processing MDX file: ${slug}`, error)
        throw error
    }
}

export async function getAllFilesFrontMatter(folder) {
    try {
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
    } catch (error) {
        console.error(`Error processing folder: ${folder}`, error)
        throw error
    }
}