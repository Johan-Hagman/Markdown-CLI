import path from "path";
import { scanDirectory } from "./src/scan.js";
import { analyzeMarkdownFiles } from "./src/analyze.js";
import fs from "fs";

// Scan the input for the folder name
const directoryName = process.argv[2];

if (!directoryName) {
  console.log("Please enter a directory!");
  process.exit(1);
}

const directoryPath = path.resolve(directoryName);

(async function processMarkdownFiles() {
  try {
    // Scan the directory for Markdown files
    const markdownFiles = await scanDirectory(directoryPath);

    if (markdownFiles.length === 0) {
      console.log("No Markdown files found.");
      process.exit(0);
    }

    // Analyze files, extract tables and merged content to variable
    const mergedContent = analyzeMarkdownFiles(markdownFiles);

    // Save merged content to file
    fs.writeFileSync("merged.md", mergedContent, "utf8");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
