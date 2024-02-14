export function getWordCount(content: string) {
  return content.split(" ").filter(Boolean).length;
  // const words = content.replace(/(<([^>]+)>)/gi, "").split(/\s/);
  // return Math.ceil(words.length / 200);
}
