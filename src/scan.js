import fs from "fs/promises";
import path from "path";
import ora from "ora";

/**
 * Recursively scans a directory for Markdown files.
 * @param {string} dir - The directory path to scan.
 * @returns {Promise<string[]>} - A list of found Markdown files.
 */
export async function scanDirectory(dir) {
  const spinner = ora(`📂 Scanning directory: ${dir}`).start();
  let mdFiles = [];

  try {
    const files = await fs.readdir(dir, { withFileTypes: true });

    const tasks = files.map(async (file) => {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        const subFiles = await scanDirectory(filePath);
        mdFiles = mdFiles.concat(subFiles);
      } else if (file.isFile() && file.name.endsWith(".md")) {
        mdFiles.push(filePath);
      }
    });

    await Promise.all(tasks);
    spinner.succeed(`Found ${mdFiles.length} Markdown files!`);
  } catch (error) {
    spinner.fail(`Error scanning directory: ${error.message}`);
  }

  return mdFiles;
}
