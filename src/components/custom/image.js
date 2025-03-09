'use client'
import NextImage from 'next/image'
import { useState, memo } from 'react'

const ImageComponent = memo(function ImageComponent({ src, alt, width, height, ...props }) {
  const [isLoading, setLoading] = useState(true)

  const handleLoadComplete = () => setLoading(false)

  const imageClasses = [
    'duration-700',
    'ease-in-out',
    isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
  ].join(' ')

  return (
    <div className="relative">
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imageClasses}
        onLoadingComplete={handleLoadComplete}
        {...props}
      />
    </div>
  )
})

export default ImageComponent