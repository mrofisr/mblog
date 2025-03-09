/**
 * Converts a string to kebab-case
 * @param {string} str - The input string to convert
 * @returns {string} The kebab-cased string
 */
const kebabCase = (str) => {
    if (!str) return '';
    
    return String(str)
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        ?.map(x => x.toLowerCase())
        .join('-') || '';
}

export default kebabCase;