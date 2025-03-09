import Link from 'next/link'
import kebabCase from '@/lib/kebab-case'

const Tag = ({ text }) => {
  return (
    <Link 
      href={`/tags/${kebabCase(text)}`}
      className="
        inline-flex items-center
        px-3 py-1
        mr-3 mb-3
        text-sm font-medium
        rounded-full
        bg-gray-50 dark:bg-gray-900/30
        text-gray-600 dark:text-gray-300
        border border-gray-200 dark:border-gray-800
        transition-all duration-300
        hover:bg-gray-100 dark:hover:bg-gray-800
        hover:scale-105
        active:scale-95
        shadow-sm
        select-none
      "
    >
      #{text}
    </Link>
  )
}

export default Tag