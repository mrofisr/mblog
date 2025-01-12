import Link from 'next/link'
import kebabCase from '@/lib/kebab-case'

const Tag = ({ text }) => {
  return (
    <Link className="mr-3 text-sm font-medium uppercase text-primary-500 dark:text-white" href={`/tags/${kebabCase(text)}`}>
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag