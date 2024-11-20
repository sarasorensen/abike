/**
 * Formats a given date into a specific locale format.
 * @param {string | Date} inputDate - The date to be formatted.
 * @param {string} locale - The locale to format the date (e.g., 'en-GB' for European format).
 * @param {string} [dateFormat] - The custom format (e.g., 'DD/MM/YYYY').
 * @returns {string} - The formatted date as a string.
 */

export const formatDate = (
  inputDate: string | Date,
  locale: string = "en-GB",
  dateFormat: string = "short"
): string => {
  const date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  if (dateFormat === "short") {
    return date.toLocaleDateString(locale, options);
  }

  return date.toLocaleDateString(locale);
};
