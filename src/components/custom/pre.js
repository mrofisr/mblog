'use client'

import { CopyButton } from '@/components/ui/copy-button'

export default function Pre({ children, className, ...props }) {
  // Get the raw code as a string
  const code = children?.props?.children
  const lines = typeof code === 'string' ? code.split('\n') : []

  return (
    <div className="group relative">
      <pre
        className={`relative overflow-auto bg-gray-100 dark:bg-[#282a36] p-4 rounded ${className}`}
        {...props}
      >
        <code className="flex">
          {/* Line numbers column */}
          <span className="select-none text-gray-500 dark:text-[#6272a4] pr-4 text-sm" aria-hidden="true">
            {lines.map((_, i) => (
              <div key={i} className="py-0.5">{i + 1}</div>
            ))}
          </span>
          {/* Code lines with adaptive text color */}
          <span className="space-y-0.5 text-gray-800 dark:text-white">
            {lines.map((line, i) => (
              <div key={i}>
                {line}
              </div>
            ))}
          </span>
        </code>
      </pre>
      {code && <CopyButton value={code} />}
    </div>
  )
}
