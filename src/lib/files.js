import fs from 'fs'
import path from 'path'

function getAllFilesRecursively(folder) {
  const entries = fs.readdirSync(folder, { withFileTypes: true })
  const files = entries.flatMap(entry => {
    const fullPath = path.join(folder, entry.name)
    return entry.isDirectory() ? getAllFilesRecursively(fullPath) : fullPath
  })
  return files
}

export default getAllFilesRecursively