// scripts/generate-rss.js
import { generateTagRSSFeeds } from '../src/lib/rss';

async function main() {
  console.log('Generating RSS feeds for tags...');
  await generateTagRSSFeeds();
  console.log('RSS feeds generated successfully!');
}

main().catch(console.error);