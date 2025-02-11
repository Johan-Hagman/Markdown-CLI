import fs from "fs";
import path from "path";

/**
 * Recursively scans a directory for Markdown files.
 * @param {string} dir - The directory path to scan.
 */
export function scanDirectory(dir) {
  fs.stat(dir, (err, stats) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      process.exit(1);
    }

    if (!stats.isDirectory()) {
      console.log(`${dir} is not a directory`);
      process.exit(1);
    }

    console.log(`Scanning directory: ${dir}`);

    // Start recursive search
    findMarkdownFiles(dir);
  });
}

/**
 * Helper function that finds Markdown files within a directory and its subdirectories.
 * @param {string} dir - The directory path to search.
 */
function findMarkdownFiles(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log(`Error reading directory ${dir}: ${err.message}`);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log(`Error checking stats for ${filePath}: ${err.message}`);
          return;
        }

        if (stats.isDirectory()) {
          findMarkdownFiles(filePath);
        } else if (stats.isFile() && file.endsWith(".md")) {
          console.log(`Markdown file found: ${filePath}`);
          // Future integration: Call analyze.js to process content
        }
      });
    });
  });
}
