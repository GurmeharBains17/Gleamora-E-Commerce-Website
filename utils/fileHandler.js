import fs from "fs/promises";

// Async function to read file
export async function readFileContent(path) {
  try {
    const data = await fs.readFile(path, "utf-8");
    return data;
  } catch (err) {
    throw new Error("Error reading file: " + err.message);
  }
}

// Async function to write file
export async function writeFileContent(path, content) {
  try {
    await fs.writeFile(path, content, "utf-8");
    return "File written successfully!";
  } catch (err) {
    throw new Error("Error writing file: " + err.message);
  }
}
