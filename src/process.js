import fs from "fs";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import { scanDirectory } from "./scan.js";
import { analyzeMarkdownFiles } from "./analyze.js";

export async function processMarkdownFiles(directoryName, outputFileName) {
  const spinner = ora("🔄 Initializing...").start();
  const directoryPath = path.resolve(directoryName);

  if (!fs.existsSync(directoryPath)) {
    spinner.fail(
      chalk.red(`Error: Directory "${directoryName}" does not exist!`)
    );
    process.exit(1);
  }

  try {
    spinner.text = chalk.yellow(`📂 Scanning directory: ${directoryPath}`);
    const markdownFiles = await scanDirectory(directoryPath);

    if (markdownFiles.length === 0) {
      spinner.warn(chalk.red("⚠ No Markdown files found."));
      return;
    }

    spinner.text = chalk.blue(
      `📄 Found ${markdownFiles.length} Markdown files!`
    );
    await new Promise((res) => setTimeout(res, 800));

    spinner.text = chalk.green("🔍 Analyzing Markdown files...");
    const mergedContent = analyzeMarkdownFiles(markdownFiles);

    fs.writeFileSync(outputFileName, mergedContent, "utf8");
    spinner.succeed(
      chalk.green(`Merged content saved to ${chalk.bold(outputFileName)}`)
    );
  } catch (error) {
    spinner.fail(chalk.red(`Error: ${error.message}`));
  }
}
