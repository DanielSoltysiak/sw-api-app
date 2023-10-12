export function getSlug(url: string) {
  return url.replace(/[^0-9]/g, "");
}
