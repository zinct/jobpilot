export function truncateString(str, maxLength) {
  if (str?.length ?? 0 > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}
