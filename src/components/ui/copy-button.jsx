'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function CopyButton({ value, className }) {
  const [copied, setCopied] = useState(false)

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
        'absolute right-4 top-4 z-20 h-6 w-6 hover:bg-muted/80',
        copied && 'text-green-500',
        className
      )}
      onClick={copy}
    >
      {copied ? (
        <Check className="h-3 w-3 animate-in zoom-in" />
      ) : (
        <Copy className="h-3 w-3 animate-in zoom-in" />
      )}
      <span className="sr-only">Copy code</span>
    </Button>
  )
}
