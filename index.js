import fs from 'fs';
import path from 'path';

const directoryName = process.argv[2];

if (!directoryName) {
    console.log("Please Enter A Directory!");
    process.exit(1);
}

const directoryPath = path.resolve(directoryName);

// Recursive function to read directories and subdirectories
function findMarkdownFiles(dir) {
    // Read the contents of the directory
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.log(`Error Reading Directory ${dir}: ${err.message}`);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(dir, file); // Full path to file/directory

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.log(`Error checking stats for ${filePath}: ${err.message}`);
                    return;
                }

                if (stats.isDirectory()) {
                    // If it's a directory, call the function recursively
                    findMarkdownFiles(filePath);
                } else if (stats.isFile() && file.endsWith('.md')) {
                    // If it's a .md file, log the file path
                    console.log(file);
                    console.log(filePath); // Full path to the markdown file
                }
            });
        });
    });
}

// Start the recursive search
fs.stat(directoryPath, (err, stats) => {
    if (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }

    if (!stats.isDirectory()) {
        console.log(`${directoryName} is not a directory`);
        process.exit(1);
    }

    console.log(`Directory ${directoryName} exists!`);
    findMarkdownFiles(directoryPath); // Start the recursive search
});
