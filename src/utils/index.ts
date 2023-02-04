export const timeAgo = (t: number) => {
  let e = Math.floor((Date.now() - 1e3 * t) / 1e3),
    n = e / 31536e3;

  return n > 1
    ? Math.floor(n) + ' years ago'
    : (n = e / 2592e3) > 1
    ? Math.floor(n) + ' months ago'
    : (n = e / 86400) > 1
    ? Math.floor(n) + ' days ago'
    : (n = e / 3600) > 1
    ? Math.floor(n) + ' hours ago'
    : (n = e / 60) > 1
    ? Math.floor(n) + ' minutes ago'
    : Math.floor(e) + ' seconds ago';
};
