import fs from "fs";
import path from "path";
import chalk from "chalk";
import { scanDirectory } from "./scan.js";
import { analyzeMarkdownFiles } from "./analyze.js";

export async function processMarkdownFiles(directoryName, outputFileName) {
  console.log(chalk.yellow("\n" + "=".repeat(50)));
  console.log(chalk.bold.cyan(`📂 Processing directory: ${directoryName}`));
  console.log(chalk.yellow("=".repeat(50) + "\n"));

  const directoryPath = path.resolve(directoryName);

  if (!fs.existsSync(directoryPath)) {
    console.log(
      chalk.red(`❌ Error: Directory "${directoryName}" does not exist!\n`)
    );
    process.exit(1);
  }

  try {
    const markdownFiles = await scanDirectory(directoryPath);

    if (markdownFiles.length === 0) {
      console.log(chalk.yellow("\n⚠ No Markdown files found. Exiting...\n"));
      return;
    }

    console.log(chalk.blue("🔍 Analyzing Markdown files...\n"));
    await new Promise((res) => setTimeout(res, 1500));

    // **NYTT:** Analysera Markdown-filer och få räkningen
    const { mergedContent, filesWithTables } =
      analyzeMarkdownFiles(markdownFiles);

    // Skriv ut extraherat innehåll till output-filen
    fs.writeFileSync(outputFileName, mergedContent, "utf8");

    // **Skapa summering och skriv in i output-filen**
    const summary = `
Summary:
Processed ${markdownFiles.length} Markdown files
Extracted tables from ${filesWithTables}/${markdownFiles.length} files`;

    fs.appendFileSync(outputFileName, summary, "utf8");
    console.log(
      chalk.bold(`📄 Merged content saved to: ${chalk.green(outputFileName)}\n`)
    );
    console.log(chalk.yellow("=".repeat(50)));
    console.log(chalk.green("Summary added to output file."));
    console.log(chalk.yellow("=".repeat(50)));
  } catch (error) {
    console.log(chalk.red(`❌ Error: ${error.message}\n`));
  }
}
