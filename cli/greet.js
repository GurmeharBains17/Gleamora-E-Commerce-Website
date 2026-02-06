#!/usr/bin/env node

// Simple CLI app
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Usage: node greet.js <name>");
} else {
  console.log(`Hello, ${args[0]}! Welcome to Gleamora CLI App`);
}
