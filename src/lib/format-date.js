const locale = "id-ID";

/**
 * Formats a date into a localized string with the day, month, and year
 * @param {Date|string|number} date - The date to format, can be a Date object, timestamp, or date string
 * @returns {string} The formatted date string in the user's locale
 * @throws {TypeError} If the date parameter cannot be converted to a valid Date
 * @example
 * formatDate("2023-05-20")
 * // => "May 20, 2023" (output varies based on locale)
 */
const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const now = new Date(date).toLocaleDateString(locale, options);

  return now;
};

export default formatDate;