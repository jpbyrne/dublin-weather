// https://community.shopify.com/c/Shopify-Design/Ordinal-Number-in-javascript-1st-2nd-3rd-4th/m-p/72156
function getOrdinal(n) {
  const s = [ 'th', 'st', 'nd', 'rd' ];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export function getFormattedDateString(date) {
  const locale = 'en-GB';

  const dayString = date.toLocaleDateString(locale, { weekday: 'long' });
  const dateString = getOrdinal(date.getDate());
  const monthString = date.toLocaleDateString(locale, { month: 'long' });

  return `${dayString}, ${dateString} ${monthString}`;
};
