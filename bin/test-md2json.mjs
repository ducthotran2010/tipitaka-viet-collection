import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import { readFileSync } from 'fs';
import { toString } from 'mdast-util-to-string';
import { writeFileSync } from 'fs';

const markdown = readFileSync('dist/others/CG-KINH-PHAP-CU.md', 'utf8');
const tree = unified().use(remarkParse).parse(markdown);
visit(tree, (node) => { delete node.position; });
writeFileSync('example.json', JSON.stringify(tree, null, 2));

const jsonContent = readFileSync('example.json', 'utf-8');
const ast = JSON.parse(jsonContent);
const markdownOutput = unified()
  .use(remarkStringify, { bullet: '-', emphasis: '_',  })
  .stringify(ast);
writeFileSync('example.md', markdownOutput, 'utf-8');
