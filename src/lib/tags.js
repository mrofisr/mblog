import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getFiles } from '@/lib/mdx'
import kebabCase from '@/lib/kebab-case'

const root = process.cwd()

export async function getAllTags(type) {
    const files = await getFiles(type)
    let tagCount = {}
    
    files.forEach((file) => {
        const source = fs.readFileSync(path.join(root, type, file), 'utf8')
        const { data } = matter(source)
        if (data.tags && data.draft !== true) {
            data.tags.forEach((tag) => {
                const formattedTag = kebabCase(tag)
                if (formattedTag in tagCount) {
                    tagCount[formattedTag] += 1
                } else {
                    tagCount[formattedTag] = 1
                }
            })
        }
    })
    return tagCount
}