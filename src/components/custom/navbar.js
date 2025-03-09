'use client'

import { useState, useEffect, memo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import config from "@/config/config"

const NAVIGATION_LINKS = [
  { name: "Home", href: "/", hideOnMobile: true },
  { name: "Tags", href: "/tags", hideOnMobile: true },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
]

const NavLink = memo(({ href, name, hideOnMobile }) => (
  <li>
    <Link
      href={href}
      className={`${hideOnMobile ? "hidden sm:inline-block" : "inline-block"} 
        hover:text-gray-600 dark:hover:text-gray-300 transition-colors`}
    >
      {name}
    </Link>
  </li>
))

NavLink.displayName = 'NavLink'

const ThemeToggleButton = ({ theme, onClick }) => (
  <motion.button
    onClick={onClick}
    className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    key={theme === "dark" ? "dark-icon" : "light-icon"}
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 20, opacity: 0 }}
    transition={{ duration: 0.2 }}
    aria-label="Toggle theme"
  >
    {theme === "dark" ? (
      <Sun className="h-5 w-5 text-yellow-500" />
    ) : (
      <Moon className="h-5 w-5 text-yellow-500" />
    )}
  </motion.button>
)

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur dark:border-gray-600 dark:bg-gray-800/75">
      <div className="flex h-16 items-center justify-between w-full px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96">
        <Link href="/" className="text-lg font-extrabold tracking-tight hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          {config.blogName}
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-6">
              {NAVIGATION_LINKS.map(link => (
                <NavLink key={link.href} {...link} />
              ))}
            </ul>
          </nav>

          <AnimatePresence mode="wait" initial={false}>
            <ThemeToggleButton theme={theme} onClick={toggleTheme} />
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
