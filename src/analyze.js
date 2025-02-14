import fs from "fs";

/**
 * Reads and merges Markdown files while preserving tables.
 * @param {string[]} files - Array of Markdown file paths.
 * @returns {string} - Merged Markdown content.
 */
export function analyzeMarkdownFiles(files) {
  let mergedContent = "";

  if (files.length === 0) {
    console.log("No Markdown files found.");
    return "No tables found."; // Prevents empty output
  }

  files.forEach((file) => {
    try {
      console.log(`\n--- Reading file: ${file} ---`); // Debugging
      const content = fs.readFileSync(file, "utf8");

      console.log(`Content of ${file}:\n`, content); // Debugging

      // Preserve Markdown content correctly
      mergedContent += `\n\n${content.trim()}\n\n`;
    } catch (error) {
      console.error(`Error reading file ${file}: ${error.message}`);
    }
  });

  // Debugging: Check final merged content before saving
  console.log("\n--- Final merged content before saving ---\n", mergedContent);

  return mergedContent;
}
