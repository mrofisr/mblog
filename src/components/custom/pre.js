'use client'
import { useState } from 'react'

export default function Pre({ children }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(children.props.children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  return (
    <div className="relative">
      <button
        aria-label="Copy code"
        className="absolute right-2 top-2 rounded bg-gray-700 p-1 text-sm text-gray-200"
        onClick={onCopy}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre>{children}</pre>
    </div>
  )
}