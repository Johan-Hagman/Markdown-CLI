#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import boxen from "boxen";
import fs from "fs";
import { processMarkdownFiles } from "../src/process.js";

const program = new Command(); //Is this needed?

//show guid eif no argument is given
const showGuide = () => {
  console.log(
    boxen(
      `${chalk.magenta.bold("👋 Welcome to the CLI-Markdown Tool!")}
  \nThis tool helps you scan directories for Markdown files
  and extract tables from them automatically. 
  \n${chalk.green("Usage:")}
    ${chalk.cyan("npm start <directory> [output]")}
  \n${chalk.yellow("Examples:")}
    ${chalk.cyan("npm start dokument merged.md")}
    ${chalk.cyan("node bin/cli.js analyze dokument output.md")}
  \n${chalk.blue("Commands:")}
    ${chalk.cyan("analyze <directory> [output]")} - Scans and extracts tables from Markdown files.
  `,
      { padding: 1, margin: 1, borderStyle: "double" }
    )
  );
};

const args = process.argv.slice(2);

if (args.length === 0) {
  showGuide();
  process.exit(0);
}

const [directory, outputFile] = args;

if (directory) {
  if (!fs.existsSync(directory)) {
    console.log(
      chalk.red(`\n❌ Error: Directory "${directory}" does not exist!\n`)
    );
    process.exit(1);
  }
  processMarkdownFiles(directory, outputFile || "merged.md");
} else {
  showGuide();
}
