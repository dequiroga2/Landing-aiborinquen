import { execSync } from "child_process";

// Run Vite build
console.log("Building with Vite...");
execSync("vite build", { stdio: "inherit" });

console.log("Build completed successfully!");
