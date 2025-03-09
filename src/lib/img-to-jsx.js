import { visit } from 'unist-util-visit'
import sizeOf from 'image-size'
import fs from 'fs'

const isHttpUrl = (url) => {
  try {
    new URL(url)
    return url.startsWith('http')
  } catch {
    return false
  }
}

const plugin = () => (tree) => {
  visit(
    tree,
    (node) => node.type === 'paragraph' && node.children?.some((n) => n.type === 'image'),
    (node) => {
      const imageNode = node.children.find((n) => n.type === 'image')

      if (!imageNode) return

      try {
        let dimensions = { width: 768, height: 432 }
        
        if (!isHttpUrl(imageNode.url)) {
          const imagePath = `${process.cwd()}/public${imageNode.url}`
          if (fs.existsSync(imagePath)) {
            dimensions = sizeOf(imagePath)
          }
        }

        const mdxImageNode = {
          type: 'mdxJsxFlowElement',
          name: 'Image',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt || '' },
            { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
            { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
            { type: 'mdxJsxAttribute', name: 'height', value: dimensions.height },
            { type: 'mdxJsxAttribute', name: 'loading', value: 'lazy' },
            { type: 'mdxJsxAttribute', name: 'quality', value: 75 }
          ],
          children: []
        }

        // Convert paragraph to div to avoid nesting issues
        node.type = 'div'
        node.children = [mdxImageNode]
      } catch (error) {
        console.warn(`Failed to process image: ${imageNode.url}`, error)
      }
    }
  )
}

export default plugin
