// app/mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import { MDXComponents as CustomMDXComponents } from '@/components/custom/mdx-components'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...CustomMDXComponents,
        ...components,
    }
}