#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { processMarkdownFiles } from "../src/process.js";

const program = new Command();

program
  .name(chalk.cyan("markdown-cli"))
  .description(
    chalk.yellow(
      "CLI tool for scanning and extracting tables from Markdown files"
    )
  )
  .version("1.0.0");

program
  .command("analyze <directory> [output]")
  .description(chalk.green("Scan and extract tables from Markdown files"))
  .action((directory, output = "merged.md") => {
    console.log(
      chalk.blueBright(`📂 Scanning directory: ${chalk.bold(directory)}`)
    );
    console.log(chalk.magenta(`📄 Output file: ${chalk.bold(output)}`));
    processMarkdownFiles(directory, output);
  });

program.parse();
