import fs from 'fs'
import path from 'path'

/**
 * Recursively retrieves all file paths from a given folder and its subfolders
 * @param {string} folder - The path to the folder to search in
 * @returns {string[]} An array of full file paths for all files found
 * @throws {Error} If the folder path is invalid or there are permission issues
 */
function getAllFilesRecursively(folder) {
  const entries = fs.readdirSync(folder, { withFileTypes: true })
  const files = entries.flatMap(entry => {
    const fullPath = path.join(folder, entry.name)
    return entry.isDirectory() ? getAllFilesRecursively(fullPath) : fullPath
  })
  return files
}

export default getAllFilesRecursively