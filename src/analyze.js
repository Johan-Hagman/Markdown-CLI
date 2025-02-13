import fs from "fs";
import matter from "gray-matter";
/**
 * Reads and analyzes Markdown files.
 * @param {string[]} files - Array of Markdown file paths.
 * @returns {string} - Merged Markdown content.
 */
export function analyzeMarkdownFiles(files) {
  let mergedContent = "";

  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file, "utf8");

      // Extract metadata and Markdown body
      const { data, content: markdownBody } = matter(content);

      // Format metadata (if present)
      let metadata = "";
      if (Object.keys(data).length > 0) {
        metadata = `\n---\nMetadata:\n${JSON.stringify(data, null, 2)}\n---\n`;
      }
      // Append metadata and content to the merged output
      mergedContent += `\n\n### ${file} ###\n${metadata}\n${markdownBody}\n\n`;
    } catch (error) {
      console.error(`Error analyzing file ${file}: ${error.message}`);
    }
  });

  return mergedContent;
}
