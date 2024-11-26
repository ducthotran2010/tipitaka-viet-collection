import TurndownService from 'turndown';
const turndownService = new TurndownService({ headingStyle: 'atx' });

// Example usage
const htmlContent = '<strong>bold text</strong>';
const markdown = turndownService.turndown(htmlContent);
console.log('Converted Markdown:', markdown);
