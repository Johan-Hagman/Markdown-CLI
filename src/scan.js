// scan.js
import fs from "fs/promises";
import path from "path";
import ora from "ora";
import chalk from "chalk";

/**
 * Recursively scans a directory for Markdown files.
 * @param {string} dir - The directory path to scan.
 * @returns {Promise<string[]>} - A list of found Markdown files.
 */
export async function scanDirectory(dir) {
  const spinner = ora(chalk.yellow(`📂 Scanning directory: ${dir}\n`)).start();
  let mdFiles = [];
  let ignoredFiles = [];

  try {
    const files = await fs.readdir(dir, { withFileTypes: true });

    const tasks = files.map(async (file) => {
      const filePath = path.join(dir, file.name);

      if (file.isDirectory()) {
        console.log(chalk.blue(`📁 Entering subdirectory: ${filePath}`));
        const subFiles = await scanDirectory(filePath);
        mdFiles = mdFiles.concat(subFiles);
      } else if (file.isFile() && file.name.endsWith(".md")) {
        mdFiles.push(filePath);
      } else {
        ignoredFiles.push(filePath);
      }
    });

    await Promise.all(tasks);

    if (mdFiles.length > 0) {
      spinner.succeed(
        chalk.greenBright(`Found ${mdFiles.length} Markdown files!\n`)
      );
      mdFiles.forEach((file) => console.log(chalk.green(`✔ ${file}`)));
    } else {
      spinner.warn(chalk.yellow("No Markdown files found in the directory.\n"));
    }

    if (ignoredFiles.length > 0) {
      console.log(chalk.gray("\n--- Ignored Files ---"));
      ignoredFiles.forEach((file) => console.log(chalk.gray(`❌ ${file}`)));
      console.log(chalk.gray("---------------------\n"));
    }
  } catch (error) {
    spinner.fail(
      chalk.red.bold(`❌ Error scanning directory: ${error.message}`)
    );
  }

  return mdFiles;
}
