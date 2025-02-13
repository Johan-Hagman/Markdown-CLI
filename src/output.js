import fs from "fs";

/**
 * Saves the merged content to a file.
 * @param {string} filename - Output file name.
 * @param {string} content - The merged Markdown content.
 */
export function saveToFile(filename, content) {
  try {
    fs.writeFileSync(filename, content, "utf8");
    console.log(`Output saved to ${filename}`);
  } catch (error) {
    console.error(`Error saving output file: ${error.message}`);
  }
}
