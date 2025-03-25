# 🚀 Markdown-CLI

_A powerful CLI tool for scanning, extracting, and merging Markdown files_

## 📌 Overview

**Markdown-CLI** is a Node.js-powered command-line tool that recursively scans a directory for Markdown (`.md`) files, extracts tables, merges content, and saves the result into a consolidated `.md` file.

🔹 **Perfect for**: Processing documentation repositories, extracting structured tabular data from Markdown, and automating content merging in large Markdown projects.

## ✨ Features

✅ **Recursive scanning** – Finds all Markdown files in the directory and subdirectories  
✅ **Table extraction** – Extracts and merges only Markdown tables while preserving structure  
✅ **File path tracking** – Displays which file each table comes from  
✅ **Custom output filename** – Allows specifying output file name  
✅ **Error handling** – Detects missing directories, invalid files, and other common issues  
✅ **Modern CLI experience** – Uses `chalk` and `ora` for a professional terminal UI

## 📥 Installation

To install the CLI, you can either install it globally via npm or clone the repository manually.

### 1️⃣ Install globally via npm

```sh
npm install -g markdown-cli-tool
```

### 2️⃣ Clone the repository manually

```sh
git clone https://github.com/johan-hagman/markdown-CLI.git
cd markdown-CLI
npm install
```

## 🚀 Usage

Once installed, run the CLI tool with:

```sh
markdown-cli analyze <directory>
```

🔹 **Example:**

```sh
markdown-cli analyze documents
```

This scans the `documents/` folder, extracts tables, and merges them into `merged.md`.

To specify a custom output filename, run:

```sh
markdown-cli analyze documents output.md
```

This saves the merged tables into `output.md`.

If running via npm scripts, use:

```sh
npm start documents myOutput.md
```

## ⚙️ CLI Options

| Command                        | Description                        |
| ------------------------------ | ---------------------------------- |
| `analyze <directory>`          | Scans and extracts Markdown tables |
| `analyze <directory> [output]` | Saves output to a custom filename  |

## 🛠️ Development & Contributing

💡 **Want to contribute?** Fork the repo, open issues, or submit pull requests.

### Run locally for development:

```sh
git clone https://github.com/johan-hagman/markdown-CLI.git
cd markdown-CLI
npm install
npm link   # Links CLI tool globally for local testing
```

Now, you can use the CLI as a system-wide command:

```sh
markdown-cli analyze test-folder
```

### Run tests:

```sh
npm run test
```

## 📜 License

This project is licensed under the **MIT License**. Want to contribute? Fork the repo and submit a PR! 🚀

## 📌 Final Notes

🚀 **This tool is built for efficiency, automation, and ease of use**. If you find it useful, consider giving it a ⭐ on GitHub!

**Happy codingstart!**
