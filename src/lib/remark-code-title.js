import { visit } from 'unist-util-visit'

const remarkCodeTitle = function () {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return

      const nodeLang = node.lang || ''
      const titleMatch = nodeLang.match(/^([^:]+)?(?::(.+))?$/)

      if (!titleMatch || !titleMatch[2]) return

      const [, language = '', title = ''] = titleMatch
      const className = 'remark-code-title'

      const titleNode = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'className',
            value: className
          }
        ],
        children: [{ type: 'text', value: title.trim() }],
        data: { _xdmExplicitJsx: true }
      }

      parent.children.splice(index, 0, titleNode)
      node.lang = language.trim() || node.lang
    })
  }
}

export default remarkCodeTitle
