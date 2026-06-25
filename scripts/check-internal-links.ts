import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';

const externalPattern = /^(?:[a-z][a-z0-9+.-]*:|#)/i;
const docsRoot = path.resolve('docs');
const publicRoot = path.join(docsRoot, 'public');

export type LinkResolution =
  | { ok: true; expectedPath: string; anchor?: string }
  | { ok: false; expectedPath: string; reason: string; anchor?: string };

export function extractInternalLinks(markdown: string) {
  const links = new Set<string>();
  const markdownLinkPattern = /!?\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const htmlHrefPattern = /\b(?:href|src)=["']([^"']+)["']/g;

  for (const pattern of [markdownLinkPattern, htmlHrefPattern]) {
    for (const match of markdown.matchAll(pattern)) {
      const raw = match[1].trim();
      if (!raw || externalPattern.test(raw)) {
        continue;
      }
      links.add(raw);
    }
  }

  return [...links];
}

function stripQueryAndHash(link: string) {
  const [withoutHash, anchor] = link.split('#', 2);
  const [target] = withoutHash.split('?', 1);
  return {
    target: decodeURIComponent(target),
    anchor: anchor ? decodeURIComponent(anchor) : undefined,
  };
}

function fileExists(target: string) {
  return fs.existsSync(target) && fs.statSync(target).isFile();
}

function directoryIndexExists(target: string) {
  return (
    fs.existsSync(target) &&
    fs.statSync(target).isDirectory() &&
    fileExists(path.join(target, 'index.md'))
  );
}

function candidateFiles(baseDir: string, linkTarget: string) {
  const base = linkTarget.startsWith('/')
    ? path.join(docsRoot, linkTarget)
    : path.resolve(baseDir, linkTarget);

  const candidates: string[] = [];
  const ext = path.extname(base);

  if (ext) {
    candidates.push(base);
  } else {
    candidates.push(`${base}.md`, path.join(base, 'index.md'), base);
  }

  if (linkTarget.startsWith('/') && ext) {
    candidates.push(path.join(publicRoot, linkTarget.replace(/^\/+/, '')));
  }

  return candidates;
}

function markdownAnchors(markdown: string) {
  const anchors = new Set<string>();
  const headingPattern = /^(#{1,6})\s+(.+)$/gm;
  for (const match of markdown.matchAll(headingPattern)) {
    const text = match[2]
      .replace(/`([^`]+)`/g, '$1')
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
    if (text) {
      anchors.add(text);
    }
  }
  return anchors;
}

export function resolveInternalLink(sourceFile: string, link: string): LinkResolution {
  const { target, anchor } = stripQueryAndHash(link);
  const baseDir = path.dirname(sourceFile);
  const candidates = candidateFiles(baseDir, target);
  const matched = candidates.find(
    (candidate) => fileExists(candidate) || directoryIndexExists(candidate),
  );
  const expectedPath = candidates[0];

  if (!matched) {
    return { ok: false, expectedPath, reason: 'target does not exist', anchor };
  }

  const actualFile = directoryIndexExists(matched) ? path.join(matched, 'index.md') : matched;
  if (anchor && path.extname(actualFile) === '.md') {
    const anchors = markdownAnchors(fs.readFileSync(actualFile, 'utf8'));
    if (!anchors.has(anchor.toLowerCase())) {
      return { ok: false, expectedPath: actualFile, reason: 'anchor does not exist', anchor };
    }
  }

  return { ok: true, expectedPath: actualFile, anchor };
}

async function main() {
  const files = await fg('**/*.md', {
    cwd: docsRoot,
    absolute: true,
    ignore: ['.vitepress/**'],
  });
  const errors: string[] = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    for (const link of extractInternalLinks(content)) {
      const result = resolveInternalLink(file, link);
      if (!result.ok) {
        errors.push(
          `${path.relative(process.cwd(), file)}: ${link} -> ${path.relative(
            process.cwd(),
            result.expectedPath,
          )} (${result.reason})`,
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
    return;
  }

  console.log(`Checked internal links in ${files.length} Markdown files.`);
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isCli) {
  await main();
}
