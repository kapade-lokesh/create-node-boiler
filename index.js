#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");

const templatePath = path.join(__dirname, "./node-boilerplate");
const destinationPath = process.argv[2];

if (!destinationPath) {
  console.error(
    "Error: You must specify a destination path for the new project."
  );
  process.exit(1);
}

async function createProject() {
  try {
    // Step 1: Copy the boilerplate structure to the new project directory
    await fs.copy(templatePath, destinationPath);

    // Step 2: Navigate to the new project directory
    process.chdir(destinationPath);

    // Step 3: Install dependencies
    console.log("Installing dependencies...");
    exec("npm install", (err, stdout, stderr) => {
      if (err) {
        console.error("Error installing dependencies:", stderr);
        process.exit(1);
      }
      console.log(stdout);
      console.log("Dependencies installed successfully.");

      // Step 4: Final message
      console.log("Server setup complete!!");
      console.log(`run the following commands to start server 
cd ${destinationPath}
npm start
        `);
    });
  } catch (err) {
    console.error("Error during project setup:", err);
  }
}

createProject();
