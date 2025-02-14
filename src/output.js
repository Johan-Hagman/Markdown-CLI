import fs from "fs";
import path from "path";

/**
 * Saves the merged Markdown content to a file and extracts tables from it.
 * @param {string} filename - Output file name.
 * @param {string} content - The merged Markdown content.
 */
export function saveToFileAndExtractTables(filename, content) {
  try {
    // Save the full merged Markdown content
    fs.writeFileSync(filename, content, "utf8");
    console.log(`Merged Markdown saved to ${filename}`);

    // Extract tables from the merged file
    const tablesFile = path.join(process.cwd(), "merged.md");
    extractTablesFromFile(filename, tablesFile);
  } catch (error) {
    console.error(`Error saving output file: ${error.message}`);
  }
}

/**
 * Extracts Markdown tables using regex and saves them to a new file.
 * @param {string} inputFile - The input Markdown file to process.
 * @param {string} outputFile - The file to save extracted tables.
 */
export function extractTablesFromFile(inputFile, outputFile) {
  try {
    let content = fs.readFileSync(inputFile, "utf8");

    // Normalize line endings and remove excessive blank lines
    content = content.replace(/[\u200B-\u200D\uFEFF]/g, "");
    console.log("Normalized Markdown content before regex:\n", content);

    // Debugging: Print cleaned content before regex processing
    console.log(
      "Checking cleaned file content before applying regex:\n",
      content
    );

    // Flexible regex to match Markdown tables even with inconsistent spacing
    const tableRegex =
      /(?:^|\n)(\s*\|.+?\|)\n(\s*\|[-:| ]+\|)\n((?:\s*\|.+?\|\n)*)/g;

    // Extract all matches
    const matches = [...content.matchAll(tableRegex)].map((match) => match[0]);

    console.log(
      "Regex matches found:",
      matches.length > 0 ? matches : "No tables found"
    );

    if (matches.length > 0) {
      const extractedTables = matches.join("\n\n").trim();
      fs.writeFileSync(outputFile, extractedTables, "utf8");
      console.log(`Extracted tables saved to ${outputFile}`);
    } else {
      console.log("No tables found in the merged Markdown file.");
      fs.writeFileSync(outputFile, "No tables found.", "utf8");
    }
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
  }
}
