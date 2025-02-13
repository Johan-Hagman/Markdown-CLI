import { promises as fs } from 'fs';
import path from 'path';

/**
 * Recursively scans a directory for Markdown files.
 * @param {string} dir - The directory path to scan.
 * @returns {Promise<string[]>} - A promise that resolves to an array of Markdown file paths.
 */

export async function scanDirectory(dir) {
  try {
    const files = await fs.readdir(dir);
    let markdownFiles = [];

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        // Recursively scan subdirectories
        const subDirFiles = await scanDirectory(filePath);
        markdownFiles = markdownFiles.concat(subDirFiles);
      } else if (file.endsWith('.md')) {
        markdownFiles.push(filePath);
      }
    }

    return markdownFiles;
  } catch (err) {
    console.error(`Error reading directory ${dir}: ${err.message}`);
    return [];
  }
}
