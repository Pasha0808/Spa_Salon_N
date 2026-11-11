// Repository checks for the static site: local links resolve, pages carry the
// security/SEO basics, no inline scripts (the CSP forbids them), JS parses.
// Also prints how many placeholders are still waiting for real content.
import { readFile, readdir, access } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const fail = msg => failures.push(msg);
const exists = p => access(p).then(() => true, () => false);

const pages = (await readdir(root)).filter(f => f.endsWith(".html"));
let placeholders = 0;

for (const page of pages) {
  const html = await readFile(join(root, page), "utf8");
  if (!/<html lang="/.test(html)) fail(`${page}: missing <html lang>`);
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${page}: missing <title>`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) fail(`${page}: missing meta description`);
  if (!/http-equiv="Content-Security-Policy"/.test(html)) fail(`${page}: missing CSP meta`);
  if (/<script(?![^>]*\bsrc=)[^>]*>/.test(html)) fail(`${page}: inline <script> is blocked by the CSP`);
  if (/\sstyle="/.test(html)) fail(`${page}: inline style attribute is blocked by the CSP`);
  placeholders += (html.match(/data-placeholder=/g) || []).length;

  for (const [, ref] of html.matchAll(/\b(?:src|href|data-src|poster)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:|#|data:)/.test(ref)) continue;
    const file = ref.split(/[?#]/)[0];
    if (file && !(await exists(join(root, file)))) fail(`${page}: broken local reference ${ref}`);
  }
}

const css = await readFile(join(root, "css/styles.css"), "utf8");
for (const [, ref] of css.matchAll(/url\("?([^")]+)"?\)/g)) {
  if (/^(?:https?:|data:)/.test(ref)) continue;
  if (!(await exists(join(root, "css", ref)))) fail(`css/styles.css: broken url(${ref})`);
}

for (const file of (await readdir(join(root, "js"))).filter(f => f.endsWith(".js"))) {
  try { execFileSync(process.execPath, ["--check", join(root, "js", file)], { stdio: "pipe" }); }
  catch (error) { fail(`js/${file}: ${error.stderr.toString().trim().split("\n")[0]}`); }
}

const config = await readFile(join(root, "js/config.js"), "utf8");

// Every service in js/config.js needs its own page, and every page needs the
// shared mount points and scripts.
for (const [, slug] of config.matchAll(/slug: "([^"]+)"/g)) {
  if (!pages.includes(`${slug}.html`)) fail(`js/config.js: service "${slug}" has no ${slug}.html page`);
}
for (const page of pages) {
  const html = await readFile(join(root, page), "utf8");
  for (const needle of ['id="neha-header"', 'id="neha-footer"', "js/config.js", "js/site.js", "js/main.js"]) {
    if (!html.includes(needle)) fail(`${page}: missing ${needle}`);
  }
}
const todos = (config.match(/\/\/ TODO/g) || []).length;

// Specialists: every one needs a unique slug, real services, and files that exist
{
  const vm = await import("node:vm");
  const sandbox = { window: {} };
  vm.runInNewContext(config, sandbox);
  vm.runInNewContext(await readFile(join(root, "js/specialists.js"), "utf8"), sandbox);
  const serviceSlugs = new Set(sandbox.window.NEHA_CONFIG.services.map(s => s.slug));
  const seen = new Set();
  for (const pro of sandbox.window.NEHA_SPECIALISTS) {
    if (!/^[a-z0-9-]+$/.test(pro.slug)) fail(`specialists.js: bad slug "${pro.slug}"`);
    if (seen.has(pro.slug)) fail(`specialists.js: duplicate slug "${pro.slug}"`);
    seen.add(pro.slug);
    for (const entry of pro.services) {
      if (!serviceSlugs.has(entry.service)) fail(`specialists.js: ${pro.slug} lists unknown service "${entry.service}"`);
      if (!entry.items?.length && !entry.pending) fail(`specialists.js: ${pro.slug} has no prices for "${entry.service}"`);
    }
    for (const file of [pro.photo, ...(pro.work || []).map(w => w.img)].filter(Boolean)) {
      if (!(await exists(join(root, file)))) fail(`specialists.js: ${pro.slug} references missing file ${file}`);
    }
  }
  for (const product of sandbox.window.NEHA_CONFIG.products) {
    if (product.img && !(await exists(join(root, product.img)))) fail(`config.js: missing product picture ${product.img}`);
  }
  console.log(`Checked ${seen.size} specialists (${sandbox.window.NEHA_SPECIALISTS.filter(p => p.sample).length} still sample profiles).`);
}

console.log(`Checked ${pages.length} pages.`);
console.log(`Still to replace: ${placeholders} marked placeholders in pages, ${todos} TODO values in js/config.js (open any page with ?review to see them).`);
if (failures.length) {
  console.error(failures.map(f => "  ✗ " + f).join("\n"));
  process.exit(1);
}
console.log("All checks passed.");
