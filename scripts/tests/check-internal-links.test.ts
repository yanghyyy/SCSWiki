import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { extractInternalLinks, resolveInternalLink } from '../check-internal-links';

describe('internal link extraction', () => {
  it('extracts markdown links, images, and html links while skipping external links', () => {
    const links = extractInternalLinks(
      '[页面](./page.md) ![图](../public/a.png) <a href="/about/">关于</a> [外链](https://example.com)',
    );
    expect(links).toEqual(['./page.md', '../public/a.png', '/about/']);
  });
});

describe('internal link resolution', () => {
  it('resolves normal links and anchors', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scswiki-links-'));
    const source = path.join(dir, 'source.md');
    const target = path.join(dir, 'target.md');
    fs.writeFileSync(source, '[目标](./target.md#section-one)', 'utf8');
    fs.writeFileSync(target, '# Title\n\n## Section One\n', 'utf8');

    const result = resolveInternalLink(source, './target.md#section-one');
    expect(result.ok).toBe(true);
  });

  it('reports missing targets', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scswiki-links-'));
    const source = path.join(dir, 'source.md');
    fs.writeFileSync(source, '[缺失](./missing.md)', 'utf8');

    const result = resolveInternalLink(source, './missing.md');
    expect(result.ok).toBe(false);
  });
});
