export const cx = (...values) => values.filter(Boolean).join(' ');

export const whatsappLink = (number, text = "Hi Blessing, I saw your site and I'd like to talk about a project.") =>
  `https://wa.me/${String(number).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;

export const prettyDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export const hostFromUrl = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};
