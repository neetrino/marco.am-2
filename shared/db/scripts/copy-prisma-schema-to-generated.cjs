#!/usr/bin/env node

/**
 * Prisma's generated `index.js` sets `config.dirname = __dirname` only when
 * `schema.prisma` exists beside the generated client. Without it, Prisma assumes a
 * "bundled" layout and rewires `dirname` to `process.cwd()/generated/prisma-client`,
 * which is wrong for this repo (`shared/db/generated/prisma-client`). That breaks
 * Vercel (Linux) query engine resolution even when `binaryTargets` includes rhel.
 */

const fs = require("fs");
const path = require("path");

const dbRoot = path.join(__dirname, "..");
const src = path.join(dbRoot, "prisma", "schema.prisma");
const destDir = path.join(dbRoot, "generated", "prisma-client");
const dest = path.join(destDir, "schema.prisma");

if (!fs.existsSync(src)) {
  console.error(
    `[copy-prisma-schema] Missing source schema: ${src}`,
  );
  process.exit(1);
}

if (!fs.existsSync(path.join(destDir, "index.js"))) {
  console.error(
    `[copy-prisma-schema] Generated client missing; run prisma generate first. Expected: ${path.join(destDir, "index.js")}`,
  );
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log(`[copy-prisma-schema] Copied schema -> ${dest}`);
