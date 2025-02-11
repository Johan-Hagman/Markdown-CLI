import path from "path";
import { scanDirectory } from "./src/scan.js";

const directoryName = process.argv[2];

if (!directoryName) {
  console.log("Please enter a directory!");
  process.exit(1);
}

const directoryPath = path.resolve(directoryName);

// Check if the directory exists and start the scanning process
scanDirectory(directoryPath);
