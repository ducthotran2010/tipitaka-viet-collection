import { convertHtmlToMarkdown } from '../lib/html2md.mjs';

// Example usage
const htmlContent = '<strong>bold text</strong>';
convertHtmlToMarkdown(htmlContent).then(markdown => {
  console.log('Converted Markdown:', markdown);
});
