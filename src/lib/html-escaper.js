const { replace } = '';

// Regex patterns for HTML entities and special characters
const htmlEntitiesPattern = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
const specialCharsPattern = /[&<>'"]/g;

// Mapping of special characters to their HTML entities
const htmlEscapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
};

// Mapping of HTML entities to their special characters
const htmlUnescapeMap = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&#60;': '<',
    '&gt;': '>',
    '&#62;': '>',
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"',
};

/**
 * Replaces special characters with their HTML entity equivalents
 * @param {string} char - The character to replace
 * @returns {string} The HTML entity
 * @private
 */
const replaceChar = (char) => htmlEscapeMap[char];

/**
 * Replaces HTML entities with their original characters
 * @param {string} entity - The HTML entity to replace
 * @returns {string} The original character
 * @private
 */
const replaceEntity = (entity) => htmlUnescapeMap[entity];

/**
 * Safely escapes HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param {string} input - The input string to safely escape
 * @returns {string} The escaped input string
 * @throws {TypeError} If input is not coercible to a string
 */
export const escape = (input) => {
    if (input == null) {
        throw new TypeError('Input cannot be null or undefined');
    }
    return replace.call(String(input), specialCharsPattern, replaceChar);
};

/**
 * Converts HTML entities to their original characters.
 * @param {string} input - The input string to unescape
 * @returns {string} The unescaped input string
 * @throws {TypeError} If input is not coercible to a string
 */
export const unescape = (input) => {
    if (input == null) {
        throw new TypeError('Input cannot be null or undefined');
    }
    return replace.call(String(input), htmlEntitiesPattern, replaceEntity);
};