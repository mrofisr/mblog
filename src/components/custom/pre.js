'use client'

import { CopyButton } from '@/components/ui/copy-button'

/**
 * A custom Pre component for rendering code blocks with line numbers and copy functionality
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to be rendered inside the pre element
 * @param {string} [props.className] - Additional CSS classes to apply to the pre element
 * @param {...Object} props.props - Additional props to spread to the pre element
 * @returns {JSX.Element} A pre element with line numbers and copy functionality
 *
 * @example
 * <Pre className="my-class">
 *   {codeContent}
 * </Pre>
 */
export default function Pre({ children, className, ...props }) {
  const code = children?.props?.children || ''
  const lines = Array.isArray(code) ? code : code.toString().split('\n')

  const renderLineNumbers = () => (
    <span 
      className="select-none text-gray-500 dark:text-[#6272a4] pr-4 text-sm" 
      aria-hidden="true"
    >
      {lines.map((_, i) => (
        <div key={`line-num-${i}`} className="py-0.5">
          {i + 1}
        </div>
      ))}
    </span>
  )

  const renderCode = () => (
    <span className="space-y-0.5 text-gray-800 dark:text-white">
      {lines.map((line, i) => (
        <div key={`line-${i}`}>
          {line || '\u00A0'}
        </div>
      ))}
    </span>
  )

  return (
    <div className="group relative">
      <pre
        className={`relative overflow-auto bg-gray-100 dark:bg-[#282a36] p-4 rounded ${className}`}
        {...props}
      >
        <code className="flex">
          {renderLineNumbers()}
          {renderCode()}
        </code>
      </pre>
      {code && <CopyButton value={code} />}
    </div>
  )
}
