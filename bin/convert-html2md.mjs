import fs from 'fs';
import TurndownService from 'turndown';
import { listHtmlFilesInFolder } from '../lib/file.mjs';

// Usage: node bin/convert-html2md.mjs path/to/folder (without sources/)
// Example: node bin/convert-html2md.mjs legacy-suttacentral-data/text/vn/pi/su/
const sourceDir = 'sources/';
const destDir = 'dest/';
const folderPath = process.argv[2];
const htmlFiles = listHtmlFilesInFolder(`${sourceDir}${folderPath}`, true);
const turndownService = new TurndownService({ headingStyle: 'atx' });

htmlFiles.forEach(file => {
  console.log('Converting HTML to Markdown:', file);
  
  const mdFile = `${destDir}${file.slice(sourceDir.length, file.lastIndexOf('.html'))}.md`;
  const content = fs.readFileSync(file, 'utf-8');
  const markdown = turndownService.turndown(content);

  // Create the folder to store md file if it does not exist
  const mdDir = mdFile.substring(0, mdFile.lastIndexOf('/'));
  if (!fs.existsSync(mdDir)) {
    fs.mkdirSync(mdDir, { recursive: true });
  }
  fs.writeFileSync(mdFile, markdown, 'utf-8');
});
console.log('Done');
