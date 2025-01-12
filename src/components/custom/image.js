'use client'
import NextImage from 'next/image'
import { useState } from 'react'

export default function Image({ src, alt, width, height, ...rest }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className="relative">
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
        `}
        onLoadingComplete={() => setLoading(false)}
        {...rest}
      />
    </div>
  )
}