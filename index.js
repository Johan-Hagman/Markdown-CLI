import fs from "fs";
import path from "path";

const directoryName = process.argv[2];

if (!directoryName) {
  console.log("Please Enter A Directory!");
  process.exit(1);
}

const directoryPath = path.resolve(directoryName);

fs.stat(directoryPath, (err, stats) => {
  if (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
  if (!stats.isDirectory()) {
    console.log(`${directoryName} is not a directory`);
  }
  console.log(`Directory ${directoryName} exists!`);
});
