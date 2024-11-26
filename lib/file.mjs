import fs from 'fs';
import path from 'path';

// Function to list all HTML files in a given folder
export function listHtmlFilesInFolder(folderPath, subfolder = false) {
  let htmlFiles = [];

  function readFolder(folder) {
    fs.readdirSync(folder).forEach(file => {
      const fullPath = path.join(folder, file);
      if (fs.statSync(fullPath).isDirectory() && subfolder) {
        readFolder(fullPath);
      } else if (path.extname(file) === '.html') {
        htmlFiles.push(fullPath);
      }
    });
  }

  readFolder(folderPath);
  return htmlFiles;
}
