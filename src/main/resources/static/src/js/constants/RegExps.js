export function getDomain(string) {
  const domainRegExp = /(https?:\/\/[^\/]*)/;
  return string.match(domainRegExp)[0];
}
