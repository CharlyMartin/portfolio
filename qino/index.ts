import { initQino } from "@qino/cms";

export default initQino({
  contentFolder: "src/content",
  mediaFolder: "public",
  siteUrl: "https://charlymartin.me",
  // Writes public/llms.txt, llms-full.txt, index.md and section llms.txt files from src/content/llms.md.
  cli: { build: { llmsTxt: { sections: true } } },
});
