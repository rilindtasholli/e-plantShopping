import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const cacheDir = "C:/gh-pages-cache";
const cliPath = path.join(projectRoot, "node_modules", "gh-pages", "bin", "gh-pages.js");

mkdirSync(cacheDir, { recursive: true });

const env = {
  ...process.env,
  CACHE_DIR: cacheDir,
};

const result = spawnSync(process.execPath, [cliPath, "-d", "dist"], {
  cwd: projectRoot,
  stdio: "inherit",
  env,
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 0);
