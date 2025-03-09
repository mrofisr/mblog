import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'
import getAllFilesRecursively from '@/lib/files'
import kebabCase from '@/lib/kebab-case'

const root = process.cwd()

/**
 * Asynchronously retrieves all files from a specified folder type, reads their content,
 * and counts the occurrences of each tag (formatted to kebab-case) found in the front matter,
 * excluding files marked as drafts.
 *
 * @async
 * @function getAllTags
 * @param {string} type - The type of folder to search within, which is appended to a root path.
 * @returns {Promise<Object<string, number>>} A promise that resolves to an object where each key is a tag
 * (in kebab-case) and the value is the count of its occurrences across the files.
 */
export async function getAllTags(type) {
    const folderPath = path.join(root, type)
    const files = getAllFilesRecursively(folderPath)
    const tagCount = {}

    await Promise.all(
        files.map(async (file) => {
            try {
                const source = await fs.readFile(file, 'utf8')
                const { data } = matter(source)
                if (data.tags && data.draft !== true) {
                    data.tags.forEach((tag) => {
                        const formattedTag = kebabCase(tag)
                        tagCount[formattedTag] = (tagCount[formattedTag] || 0) + 1
                    })
                }
            } catch (error) {
                console.error(`Error reading file ${file}:`, error)
            }
        })
    )

    return tagCount
}