export function getReadingTime(content: string) {
  const words = content.replace(/(<([^>]+)>)/gi, "").split(/\s/);
  return Math.ceil(words.length / 200);
}
