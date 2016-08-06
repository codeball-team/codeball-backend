export default function getDomain(url) {
  const domainRegExp = /(https?:\/\/[^\/]*)/;
  return url.match(domainRegExp)[0];
}
