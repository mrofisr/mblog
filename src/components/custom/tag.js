import Link from 'next/link'
import kebabCase from '@/lib/kebab-case'

const Tag = ({ text }) => {
  return (
    <Link 
      href={`/tags/${kebabCase(text)}`}
      className="
        inline-flex items-center
        px-2 py-0.5
        mr-2 mb-2
        text-sm
        rounded-md
        bg-gray-100 dark:bg-gray-800
        text-gray-600 dark:text-gray-300
        border border-gray-200 dark:border-gray-700
        transition-all duration-200
        hover:bg-gray-200 dark:hover:bg-gray-700
        active:scale-95
        select-none
      "
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag