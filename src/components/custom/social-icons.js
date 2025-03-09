import { Github, Linkedin, Pen, Cloud } from "lucide-react"

const links = [
  {
    Icon: Cloud,
    href: "https://jawara.cloud",
    arialabel: "JawaraCloud",
    hoverColor: "hover:text-blue-500"
  },
  {
    Icon: Github,
    href: "https://github.com/mrofisr",
    arialabel: "Github",
    hoverColor: "hover:text-gray-900"
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/mrofisr",
    arialabel: "LinkedIn",
    hoverColor: "hover:text-blue-600"
  },
  {
    Icon: Pen,
    href: "https://substack.com/@mrofisr",
    arialabel: "Substack",
    hoverColor: "hover:text-orange-500"
  },
]

/**
 * A component that renders a row of social media icons with links.
 * Each icon is rendered with a hover color effect and opens in a new tab when clicked.
 * The icons are spaced with margin-right except for the last one.
 * 
 * @returns {JSX.Element} A div containing social media icon links
 * 
 * @example
 * // Assuming links array is defined with following shape:
 * // links = [{ Icon: ComponentName, href: string, arialabel: string, hoverColor: string }]
 * <SocialIcon />
 */
export default function SocialIcon() {
  return (
    <div className="flex flex-row text-2xl my-6 text-gray-500 dark:text-gray-300">
      {links.map(({ Icon, href, arialabel, hoverColor }, i) => (
        <a
          key={href}
          href={href}
          target="_blank"
          aria-label={arialabel}
          rel="noopener noreferrer nofollow"
          className={`transition-colors ${hoverColor} dark:${hoverColor} ${
            i < links.length - 1 ? "mr-3" : ""
          }`}
        >
          <Icon size={24} strokeWidth={2} />
        </a>
      ))}
    </div>
  )
}