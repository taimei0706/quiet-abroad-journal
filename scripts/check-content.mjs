import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";

const root = process.cwd();
const articlesDirectory = path.join(root, "content", "articles");
const nextConfig = (
  await import(pathToFileURL(path.join(root, "next.config.mjs")).href)
).default;

const allowedImageHosts = new Set(
  (nextConfig.images?.remotePatterns ?? []).map((pattern) => pattern.hostname)
);

const categoryNames = {
  notes: "手帖",
  desk: "机まわり",
  water: "水と空気",
  abroad: "海外生活",
  sleep: "眠り"
};

const requiredFields = [
  "title",
  "description",
  "date",
  "category",
  "categorySlug",
  "image",
  "imageAlt"
];

const errors = [];
const warnings = [];
const imageUsage = new Map();

function error(file, message) {
  errors.push(`${file}: ${message}`);
}

function warning(message) {
  warnings.push(message);
}

function getStringField(data, field) {
  const value = data[field];
  return typeof value === "string" ? value.trim() : "";
}

function normalizeDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return typeof value === "string" ? value.trim() : "";
}

function getProp(source, prop) {
  const match = source.match(new RegExp(`\\b${prop}\\s*=\\s*"([^"]*)"`));
  return match?.[1]?.trim() ?? "";
}

function registerImage(file, image) {
  if (!image) {
    return;
  }

  let key = image;

  try {
    const parsed = new URL(image);
    key = `${parsed.hostname}${parsed.pathname}`;
  } catch {
    key = image;
  }

  const usage = imageUsage.get(key) ?? { image, files: [] };
  usage.files.push(file);
  imageUsage.set(key, usage);
}

function validateImage(file, label, image) {
  if (!image) {
    error(file, `${label} is required`);
    return;
  }

  if (image.startsWith("/")) {
    const localPath = path.join(root, "public", image.replace(/^\//, ""));
    if (!fs.existsSync(localPath)) {
      error(file, `${label} points to a missing local file: ${image}`);
    }
    registerImage(file, image);
    return;
  }

  let parsed;
  try {
    parsed = new URL(image);
  } catch {
    error(file, `${label} is not a valid URL: ${image}`);
    return;
  }

  if (parsed.protocol !== "https:") {
    error(file, `${label} must use https: ${image}`);
  }

  if (!allowedImageHosts.has(parsed.hostname)) {
    error(
      file,
      `${label} uses a host that is not configured in next.config.mjs: ${parsed.hostname}`
    );
  }

  registerImage(file, image);
}

function validateComponents(file, content) {
  const productCards = [...content.matchAll(/<ProductCard\b([\s\S]*?)\/>/g)];

  productCards.forEach((match, index) => {
    const block = match[1];
    const label = `ProductCard #${index + 1}`;

    for (const prop of ["name", "description", "href", "image", "imageAlt"]) {
      if (!getProp(block, prop)) {
        error(file, `${label} is missing the "${prop}" prop`);
      }
    }

    const href = getProp(block, "href");
    if (href && !/^https:\/\//.test(href)) {
      error(file, `${label} href must start with https://`);
    }

    validateImage(file, `${label} image`, getProp(block, "image"));
  });

  const quietImages = [...content.matchAll(/<QuietImage\b([\s\S]*?)\/>/g)];

  quietImages.forEach((match, index) => {
    const block = match[1];
    const label = `QuietImage #${index + 1}`;

    if (!getProp(block, "src")) {
      error(file, `${label} is missing the "src" prop`);
    }
    if (!getProp(block, "alt")) {
      error(file, `${label} is missing the "alt" prop`);
    }

    validateImage(file, `${label} src`, getProp(block, "src"));
  });
}

function parseArticle(file) {
  const fullPath = path.join(articlesDirectory, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  let parsed;

  try {
    parsed = matter(raw);
  } catch (cause) {
    error(file, `could not parse frontmatter: ${cause.message}`);
    return;
  }

  const { data, content } = parsed;

  for (const field of requiredFields) {
    if (!getStringField(data, field)) {
      error(file, `frontmatter "${field}" is required`);
    }
  }

  const date = normalizeDate(data.date);
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    error(file, `frontmatter "date" must use YYYY-MM-DD: ${date}`);
  } else if (date && Number.isNaN(new Date(`${date}T00:00:00Z`).getTime())) {
    error(file, `frontmatter "date" is not a real date: ${date}`);
  }

  const categorySlug = getStringField(data, "categorySlug");
  const category = getStringField(data, "category");

  if (categorySlug && !categoryNames[categorySlug]) {
    error(
      file,
      `unknown categorySlug "${categorySlug}" (expected one of: ${Object.keys(categoryNames).join(", ")})`
    );
  }

  if (categorySlug && categoryNames[categorySlug] && category !== categoryNames[categorySlug]) {
    error(
      file,
      `category "${category}" does not match categorySlug "${categorySlug}" (expected "${categoryNames[categorySlug]}")`
    );
  }

  if (!content.trim()) {
    error(file, "article body is empty");
  }

  validateImage(file, "frontmatter image", getStringField(data, "image"));
  validateComponents(file, content);
}

async function checkRemoteImages() {
  const entries = [...imageUsage.entries()].filter(([, usage]) =>
    /^https:\/\//.test(usage.image)
  );

  const results = new Array(entries.length);
  let cursor = 0;

  async function worker() {
    while (cursor < entries.length) {
      const current = cursor++;
      const [, usage] = entries[current];

      try {
        let response = await fetch(usage.image, {
          method: "HEAD",
          redirect: "follow",
          signal: AbortSignal.timeout(20000)
        });

        if (response.status !== 200) {
          response = await fetch(usage.image, {
            method: "GET",
            redirect: "follow",
            signal: AbortSignal.timeout(20000)
          });
        }

        if (response.status === 200) {
          await response.body?.cancel();
          results[current] = null;
        } else {
          results[current] = `${response.status} ${usage.image} (${usage.files.join(", ")})`;
        }
      } catch (cause) {
        results[current] = `${cause.name}: ${usage.image} (${usage.files.join(", ")})`;
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(8, entries.length) }, () => worker())
  );

  for (const result of results) {
    if (result) {
      errors.push(`image check failed: ${result}`);
    }
  }

  console.log(`Checked ${entries.length} remote images.`);
}

if (!fs.existsSync(articlesDirectory)) {
  console.error(`Articles directory not found: ${articlesDirectory}`);
  process.exit(1);
}

const files = fs
  .readdirSync(articlesDirectory)
  .filter((file) => file.endsWith(".mdx"))
  .sort();

if (files.length === 0) {
  error("content/articles", "no .mdx articles found");
}

for (const file of files) {
  parseArticle(file);
}

for (const usage of imageUsage.values()) {
  if (usage.files.length > 1) {
    warning(
      `image used ${usage.files.length} times: ${usage.image}\n    ${usage.files.join("\n    ")}`
    );
  }
}

if (process.argv.includes("--remote")) {
  await checkRemoteImages();
}

console.log(`Checked ${files.length} articles and ${imageUsage.size} unique images.`);

if (warnings.length > 0) {
  console.warn(`\nWarnings (${warnings.length}):`);
  for (const item of warnings) {
    console.warn(`- ${item}`);
  }
}

if (errors.length > 0) {
  console.error(`\nErrors (${errors.length}):`);
  for (const item of errors) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("\nContent check passed.");
