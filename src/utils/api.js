// Simulated backend using localStorage
export const createShortLink = async (longUrl, validity = 30, shortcode = '') => {
  const all = JSON.parse(localStorage.getItem('shortLinks') || '[]');

  if (shortcode && all.some(link => link.shortcode === shortcode)) {
    throw new Error('Shortcode already exists');
  }

  const newCode = shortcode || Math.random().toString(36).substring(2, 8);
  const expiry = new Date(Date.now() + validity * 60 * 1000).toISOString();

  const newLink = {
    id: Date.now(),
    longUrl,
    shortcode: newCode,
    shortUrl: `http://localhost:3000/${newCode}`,
    createdAt: new Date().toISOString(),
    expiry,
    clicks: [],
  };

  localStorage.setItem('shortLinks', JSON.stringify([...all, newLink]));
  return newLink;
};

export const getShortLinks = () => {
  return JSON.parse(localStorage.getItem('shortLinks') || '[]');
};

export const trackClick = (shortcode, source) => {
  const links = getShortLinks();
  const index = links.findIndex(link => link.shortcode === shortcode);
  if (index !== -1) {
    links[index].clicks.push({
      timestamp: new Date().toISOString(),
      source: source || 'unknown',
      location: 'India', // placeholder for geo (can use IP location API)
    });
    localStorage.setItem('shortLinks', JSON.stringify(links));
    return links[index].longUrl;
  }
  return null;
};
