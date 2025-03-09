import SocialIcon from "@/components/custom/social-icons";
import PropTypes from 'prop-types';

/**
 * A component that renders a title, optional subtitle, and optional social icons.
 * @param {Object} props - The component props
 * @param {string} props.title - The main title text
 * @param {string} [props.subtitle=""] - Optional subtitle text
 * @param {boolean} [props.center=false] - Whether to center-align the title on medium and larger screens
 * @param {boolean} [props.icons=true] - Whether to show social icons
 * @returns {JSX.Element} A div containing the title, optional subtitle, and optional social icons
 */
export default function Title({
  title,
  subtitle = "",
  center = false,
  icons = true,
}) {
  const titleClasses = `text-4xl sm:text-5xl lg:text-6xl mb-2 ${
    center ? "md:text-center" : ""
  }`;

  const subtitleClasses = 
    "text-2xl sm:text-3xl lg:text-4xl w-11/12 sm:w-5/6 md:w-11/12 lg:w-4/5 xl:w-3/5";

  return (
    <div className="mt-14 lg:mt-32 font-light w-full text-black dark:text-white">
      <h1 className={titleClasses}>{title}</h1>
      {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
      {icons && <SocialIcon />}
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  center: PropTypes.bool,
  icons: PropTypes.bool,
};