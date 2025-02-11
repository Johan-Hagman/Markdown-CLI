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

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log(`Error Reading Directory`);
      process.exit(1);
    }

    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    if (markdownFiles.length === 0) {
      console.log(`No Markdown Files Found`);
    } else {
      console.log(`Found Markdown Files`);
      markdownFiles.forEach((file) => {
        console.log(file);
      });
    }
  });
});
