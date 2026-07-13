#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const pageExtensions = new Set([".html", ".md"]);
const ignoreDirs = new Set([".git", "node_modules"]);
const ignoreFileSuffixes = ["-data.js", ".min.js"];
const ignoredSchemes = ["http:", "https:", "mailto:", "javascript:", "tel:"];

const files = [];
walk(root);

const links = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const regex = /(?:href|src)=["']([^"']+)["']/g;
  let match;

  while ((match = regex.exec(text))) {
    const link = match[1];
    if (!link || link.startsWith("#")) {
      continue;
    }

    if (ignoredSchemes.some((scheme) => link.startsWith(scheme))) {
      continue;
    }

    links.push({ file, link });
  }
}

const broken = links.filter(({ file, link }) => !resolves(file, link));

console.log(`Checked ${links.length} internal links.`);

if (broken.length === 0) {
  console.log("No broken internal links found.");
  process.exit(0);
}

console.log(`Broken links found: ${broken.length}`);
for (const item of broken) {
  console.log(`${path.relative(root, item.file)} -> ${item.link}`);
}
process.exit(1);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) {
      continue;
    }

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }

    if (ignoreFileSuffixes.some((suffix) => entry.name.endsWith(suffix))) {
      continue;
    }

    if (pageExtensions.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
}

function resolves(baseFile, link) {
  const clean = link.split("?")[0].split("#")[0];
  const baseDir = path.dirname(baseFile);
  const absolute = path.resolve(baseDir, clean);

  if (fs.existsSync(absolute)) {
    return true;
  }

  if (fs.existsSync(`${absolute}.html`) || fs.existsSync(`${absolute}.md`)) {
    return true;
  }

  if (clean.endsWith("/") && fs.existsSync(path.join(absolute, "index.html"))) {
    return true;
  }

  return false;
}
