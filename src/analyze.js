import fs from "fs";
import ora from "ora";

/**
 * Reads and merges Markdown files while preserving tables.
 * @param {string[]} files - Array of Markdown file paths.
 * @returns {{ mergedContent: string, filesWithTables: number }} - Merged content and count of files with tables.
 */
export function analyzeMarkdownFiles(files) {
  let mergedContent = "";
  let filesWithTables = 0; // **Lägger till räknare**
  const spinner = ora(`📖 Reading ${files.length} Markdown files...`).start();

  if (files.length === 0) {
    spinner.warn("No Markdown files found.");
    return { mergedContent: "No tables found.", filesWithTables: 0 }; // Prevents empty output
  }

  files.forEach((file, index) => {
    try {
      const fileSpinner = ora(
        `📄 Processing file ${index + 1}/${files.length}: ${file}`
      ).start();
      const content = fs.readFileSync(file, "utf8");

      // Regex for Markdown tables
      const tableRegex =
        /(?:^|\r?\n)(\s*\|.+?\|)\r?\n(\s*\|[-:| ]+\|)\r?\n((?:\s*\|.+?\|\r?\n)*)/g;
      const matches = [...content.matchAll(tableRegex)].map(
        (match) => match[0]
      );

      mergedContent += `\n\n### ${file} ###\n\n`;

      if (matches.length > 0) {
        mergedContent += matches.join("\n\n").trim();
        filesWithTables++; // **Count only files where tables are found **
        fileSpinner.succeed(`Extracted tables from ${file}`);
      } else {
        mergedContent += "(No tables found in this file)";
        fileSpinner.warn(`No tables found in ${file}`);
      }
      mergedContent += "\n\n";
    } catch (error) {
      console.error(`Error reading file ${file}: ${error.message}`);
    }
  });
  spinner.succeed("Merge Successful");
  return { mergedContent, filesWithTables }; // **Return the amount of files with tables**
}
