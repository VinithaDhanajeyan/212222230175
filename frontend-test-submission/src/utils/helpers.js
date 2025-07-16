export const generateShortcode = () =>
  Math.random().toString(36).substring(2, 8);

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};