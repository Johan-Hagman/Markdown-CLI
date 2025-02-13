# Markdown-CLI

## Project Overview
This CLI tool scans a given directory for Markdown (`.md`) files, extracts their metadata (front matter), merges their content, and saves the result into a `.md` file. The tool is built with **Node.js** and utilizes `gray-matter` to process Markdown metadata.

## Features
- Recursively scans a directory for `.md` files  
- Extracts **front matter metadata** (e.g., title, author, date, tags)  
- Merges all Markdown content into a single `.md` file  
- Keeps Markdown body unchanged  
- Supports async file handling for better performance  
- Error handling for missing directories or invalid files  

## Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/johan-hagman/markdown-CLI.git
   cd markdown-CLI
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage
To run the CLI tool, use the following command:
```sh
node index.js <directory>
```

This will scan the `documents` folder, merge `.md` files, and save the result as `merged.md`.

## License
This project is licensed under the MIT License.



