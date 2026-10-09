import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {unified} from 'unified';
import remarkParse from 'remark-parse';

const websiteDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDirectory = path.join(websiteDirectory, 'build');
const llmsTxtPath = path.join(buildDirectory, 'llms.txt');
const llmsFullTxtPath = path.join(buildDirectory, 'llms-full.txt');
const websiteOrigin = 'https://visgl.github.io';
const websiteBasePath = normalizeWebsiteBasePath('/probe.gl/');
const websiteUrl = new URL(websiteBasePath, websiteOrigin);
const duplicatedWebsiteBaseUrl =
  websiteBasePath === '/' ? null : new URL(websiteBasePath.slice(1), websiteUrl).href;

function normalizeWebsiteBasePath(basePath) {
  const pathSegments = basePath.split('/').filter(Boolean);
  return pathSegments.length === 0 ? '/' : `/${pathSegments.join('/')}/`;
}

function stripWebsiteBasePath(pathname) {
  if (websiteBasePath === '/' || !pathname.startsWith(websiteBasePath)) {
    return pathname;
  }
  return `/${pathname.slice(websiteBasePath.length)}`;
}

function fail(message) {
  throw new Error(`llms.txt output check failed: ${message}`);
}

function requireFile(relativePath) {
  const filePath = path.join(buildDirectory, relativePath);
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    fail(`missing ${relativePath}`);
  }
  return filePath;
}

function findFiles(directory, extension) {
  if (!existsSync(directory)) {
    return [];
  }

  const filePaths = [];
  for (const entry of readdirSync(directory, {withFileTypes: true})) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      filePaths.push(...findFiles(entryPath, extension));
    } else if (entry.isFile() && entryPath.endsWith(extension)) {
      filePaths.push(entryPath);
    }
  }
  return filePaths;
}

const markdownParser = unified().use(remarkParse);

function extractMarkdownLinks(markdown) {
  const links = [];
  function visit(node) {
    // Definitions supply destinations for full, collapsed, and shortcut references.
    if (['link', 'image', 'definition'].includes(node.type)) {
      links.push(node.url);
    }
    for (const child of node.children || []) {
      visit(child);
    }
  }
  visit(markdownParser.parse(markdown));
  return links;
}

function resolveGeneratedMarkdownLink(sourcePath, link) {
  if (link.startsWith('#') || link.startsWith('mailto:')) {
    return null;
  }

  let pathname;
  try {
    const url = new URL(link);
    if (url.origin !== websiteUrl.origin) {
      return null;
    }
    pathname = decodeURIComponent(url.pathname);
  } catch {
    const linkWithoutFragment = link.split('#', 1)[0].split('?', 1)[0];
    if (!linkWithoutFragment.endsWith('.md')) {
      return null;
    }
    if (linkWithoutFragment.startsWith('/')) {
      pathname = decodeURIComponent(linkWithoutFragment);
    } else {
      return path.resolve(path.dirname(sourcePath), decodeURIComponent(linkWithoutFragment));
    }
  }

  if (!pathname.endsWith('.md')) {
    return null;
  }
  pathname = stripWebsiteBasePath(pathname);
  if (path.isAbsolute(pathname) && pathname.startsWith(buildDirectory)) {
    return pathname;
  }
  return path.join(buildDirectory, pathname.replace(/^\/+/, ''));
}

if (!existsSync(llmsTxtPath)) {
  fail('missing llms.txt');
}
if (existsSync(llmsFullTxtPath)) {
  fail('llms-full.txt must not be generated');
}

const llmsTxt = readFileSync(llmsTxtPath, 'utf8');
if (!llmsTxt.startsWith('# probe.gl\n')) {
  fail('llms.txt has an unexpected title');
}
const firstSectionHeading = llmsTxt.match(/^## .+$/m)?.[0];
if (firstSectionHeading !== '## docs') {
  fail(`llms.txt has an unexpected first section: ${firstSectionHeading || 'none'}`);
}
if (llmsTxt.includes('/examples/')) {
  fail('llms.txt contains a standalone example page');
}

// Use Docusaurus metadata rather than the generated Markdown as the coverage source.
// Permalinks account for frontmatter slugs and the website's route normalization.
const docsMetadataDirectory = path.join(
  websiteDirectory, '.docusaurus/docusaurus-plugin-content-docs/default'
);
const currentDocs = findFiles(docsMetadataDirectory, '.json')
  .map((filePath) => JSON.parse(readFileSync(filePath, 'utf8')))
  .filter((doc) => doc.version === 'current' && doc.permalink && !doc.draft);
if (currentDocs.length === 0) {
  fail('missing current documentation route metadata');
}
for (const doc of currentDocs) {
  const pathname = new URL(doc.permalink, websiteUrl).pathname.replace(/\/$/, '') + '.md';
  const pageUrl = new URL(pathname, websiteUrl).href;
  if (!llmsTxt.includes(pageUrl)) {
    fail(`llms.txt is missing ${pageUrl}`);
  }
  requireFile(stripWebsiteBasePath(pathname).replace(/^\/+/, ''));
}

const markdownFiles = findFiles(buildDirectory, '.md');

const brokenLinks = [];
for (const markdownPath of [llmsTxtPath, ...markdownFiles]) {
  const markdown = readFileSync(markdownPath, 'utf8');
  const relativeMarkdownPath = path.relative(buildDirectory, markdownPath);
  if (markdownPath !== llmsTxtPath) {
    const pageUrl = new URL(relativeMarkdownPath.split(path.sep).join('/'), websiteUrl).href;
    if (!llmsTxt.includes(pageUrl)) {
      fail(`llms.txt is missing generated page ${pageUrl}`);
    }
  }
  if (markdown.trim().length < 40) {
    fail(`${relativeMarkdownPath} has empty extracted content`);
  }
  if (duplicatedWebsiteBaseUrl && markdown.includes(duplicatedWebsiteBaseUrl)) {
    fail(`${relativeMarkdownPath} contains a duplicated website base path`);
  }

  for (const link of extractMarkdownLinks(markdown)) {
    const targetPath = resolveGeneratedMarkdownLink(markdownPath, link);
    if (targetPath && !existsSync(targetPath)) {
      brokenLinks.push(
        `${path.relative(buildDirectory, markdownPath)} -> ${path.relative(
          buildDirectory,
          targetPath
        )}`
      );
    }
  }
}

if (brokenLinks.length > 0) {
  fail(`broken Markdown links:\n${brokenLinks.slice(0, 20).join('\n')}`);
}

console.log(`Validated llms.txt and ${markdownFiles.length} raw documentation pages.`);
