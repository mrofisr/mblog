'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function CopyButton({ value, className }) {
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const copy = () => {
    if (typeof window === 'undefined') return
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        'absolute right-4 top-4 z-20 h-7 w-7 rounded-md transition-all duration-200',
        'border border-transparent',
        isHovered && 'border-gray-200 dark:border-gray-700 shadow-sm',
        copied && 'bg-gray-100 dark:bg-gray-800',
        !copied && isHovered && 'bg-gray-50 dark:bg-gray-800/60',
        !copied && !isHovered && 'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/60',
        className
      )}
      onClick={copy}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full flex items-center justify-center">
        {copied ? (
          <>
            <Check className={cn(
              "h-3.5 w-3.5 text-green-600 dark:text-green-400 animate-in zoom-in-50 duration-200",
              "absolute"
            )} />
            <span className={cn(
              "absolute -bottom-8 rounded-md bg-gray-800 dark:bg-gray-700 px-2 py-1",
              "text-xs text-white whitespace-nowrap animate-in fade-in slide-in-from-bottom-2",
              "pointer-events-none opacity-0",
              copied && "opacity-100"
            )}>
              Copied!
            </span>
          </>
        ) : (
          <Copy className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
        )}
      </div>
      <span className="sr-only">Copy code</span>
    </Button>
  )
}