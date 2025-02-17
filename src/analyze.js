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

       // (For Windows)
     const tableRegex =  /(?:^|\r?\n)(\s*\|.+?\|)\r?\n(\s*\|[-:| ]+\|)\r?\n((?:\s*\|.+?\|\r?\n)*)/g;

     // Extract all matches
     const matches = [...content.matchAll(tableRegex)].map((match) => match[0]);
    
     mergedContent += file + "\n";

     if (matches.length > 0) {
      mergedContent += matches.join("\n\n").trim();
     
     }
     mergedContent += "\n\n";
     console.log(mergedContent);
     
    } catch (error) {
      console.error(`Error reading file ${file}: ${error.message}`);
    }
  });

  return mergedContent;
}
