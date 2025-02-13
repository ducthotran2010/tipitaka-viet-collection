import { writeFileSync } from 'fs';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { readFileSync } from 'fs';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

/**
 * Returns an array of objects, one for each heading3 in the AST.
 * Each object contains:
 *   - h1: the closest preceding heading1 and its content,
 *   - h2: the closest preceding heading2 and its content,
 *   - h3: the current heading3.
 *
 * The "content" for a header is defined as the concatenation of the texts
 * of all non-heading nodes that follow the header until a new header of equal
 * or higher level is encountered.
 */
function listActiveHeading3(ast) {
  delete ast.position;
  const results = [];
  let currentH1 = [];
  let currentH2 = [];
  let currentH3 = [];
  let lastHeadingLevel = 0;

  // Iterate over the top-level children.
  for (const node of ast.children) {
    delete node.position;

    if (node.type === 'heading') {
      if (node.depth === 1) {
        currentH1 = [node];
        lastHeadingLevel = 1;
      } else if (node.depth === 2) {
        currentH2 = [node];
        lastHeadingLevel = 2;
      } else if (node.depth === 3) {
        if (currentH3.length > 0) {
          results.push([...currentH1, ...currentH2, ...currentH3]);
        }
        currentH3 = [node];
        lastHeadingLevel = 3;
      }
    } else {
      // For non-heading nodes, add to the content of the deepest active header.
      if (lastHeadingLevel == 3) {
        currentH3.push(node);
      } else if (lastHeadingLevel == 2) {
        currentH2.push(node);
      } else if (lastHeadingLevel == 1) {
        currentH1.push(node);
      }
    }
  }

  if (currentH3.length > 0) {
    results.push([...currentH1, ...currentH2, ...currentH3]);
  }

  return results;
}

// Example usage:
const markdown = readFileSync('dist/others/CG-KINH-PHAP-CU.md', 'utf8');
const ast = unified().use(remarkParse).parse(markdown);

visit(ast, node => {
  if (node.type == 'text') {
    node.value = node.value.replace(/\n+(?![A-Z])/g, ' ');
  }
});

const heading3List = listActiveHeading3(ast);
const sources = [];

for (const [index, ast] of heading3List.entries()) {
  const lastH3Contents = {
    type: 'root',
    children: [...ast],
  };
  let h1Text = '',
    h2Text = '',
    h3Text = '';
  for (const node of ast) {
    if (node.type === 'heading') {
      const text = toString(node);
      if (node.depth === 1) h1Text = text;
      if (node.depth === 2) h2Text = text;
      if (node.depth === 3) h3Text = text;
    }
  }

  sources.push({
    name: `${h1Text}\n${h2Text}\n${h3Text}`,
    path: `${index}.md`,
  });

  const markdownOutput = unified()
    .use(remarkStringify, { bullet: '-', emphasis: '_' })
    .stringify(lastH3Contents);
  writeFileSync(`dist/others/CG-KINH-PHAP-CU/${index}.md`, markdownOutput, 'utf-8');
}

writeFileSync('dist/others/CG-KINH-PHAP-CU/sources.json', JSON.stringify(sources, null, 2), 'utf-8');
