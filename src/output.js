import fs from "fs";
import path from "path";

/**
 * Saves the merged content to a file and extracts tables from it.
 * @param {string} filename - Output file name.
 * @param {string} content - The merged Markdown content.
 */
export function saveToFileAndExtractTables(filename, content) {
  try {
    fs.writeFileSync(filename, content, "utf8");
    console.log(`Merged Markdown saved to ${filename}`);

    // Extract tables from `merged.md` and save them to `extracted_tables.md`
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
    const content = fs.readFileSync(inputFile, "utf8");

    // Regular expression to match Markdown tables
    const tableRegex = /(^|\n)\|.*\|\n(\|[-:]+)+\n((\|.*\|\n)*)/g;
    const matches = content.match(tableRegex);

    if (matches && matches.length > 0) {
      const extractedTables = matches.join("\n\n").trim();
      fs.writeFileSync(outputFile, extractedTables, "utf8");
      console.log(`Extracted tables saved to ${outputFile}`);
    } else {
      console.log("No tables found in the merged Markdown file.");
      fs.writeFileSync(outputFile, "No tables found.", "utf8"); // Avoid empty file issues
    }
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
  }
}
