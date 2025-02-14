import fs from "fs";
import path from "path";

/**
 * Recursively scans a directory for Markdown files.
 * @param {string} dir - The directory path to scan.
 * @returns {Promise<string[]>} - A list of found Markdown files.
 */
export async function scanDirectory(dir) {
  let mdFiles = [];

  try {
    const files = fs.readdirSync(dir);
    console.log(`Scanning directory: ${dir}`); // Debugging

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        mdFiles = mdFiles.concat(await scanDirectory(filePath));
      } else if (stats.isFile() && file.endsWith(".md")) {
        console.log(`Markdown file found: ${filePath}`); // Debugging
        mdFiles.push(filePath);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory: ${error.message}`);
  }

  return mdFiles;
}
