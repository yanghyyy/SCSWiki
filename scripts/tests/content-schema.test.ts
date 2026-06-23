import { describe, expect, it } from 'vitest';
import { isOutdated, validateFrontMatter } from '../content-schema';

const validFrontMatter = {
  title: '示例页面',
  description: '用于测试的页面',
  category: 'study',
  audience: ['本科生'],
  content_type: 'experience',
  status: 'active',
  last_verified: '2026-06-23',
  review_after: '2026-12-23',
  maintainers: ['SCSWiki 维护组'],
  sources: [],
};

describe('front matter schema', () => {
  it('accepts valid front matter', () => {
    expect(validateFrontMatter(validFrontMatter).success).toBe(true);
  });

  it('rejects missing required fields', () => {
    const { title, ...invalid } = validFrontMatter;
    expect(title).toBe('示例页面');
    expect(validateFrontMatter(invalid).success).toBe(false);
  });

  it('rejects invalid enums', () => {
    expect(validateFrontMatter({ ...validFrontMatter, status: 'published' }).success).toBe(false);
  });

  it('rejects invalid date format', () => {
    expect(validateFrontMatter({ ...validFrontMatter, last_verified: '2026/06/23' }).success).toBe(
      false,
    );
  });

  it('rejects review_after earlier than last_verified', () => {
    expect(validateFrontMatter({ ...validFrontMatter, review_after: '2026-01-01' }).success).toBe(
      false,
    );
  });

  it('rejects active high-risk official-source pages without sources', () => {
    const result = validateFrontMatter({
      ...validFrontMatter,
      category: 'services',
      content_type: 'official-source',
    });
    expect(result.success).toBe(false);
  });

  it('detects outdated content', () => {
    expect(isOutdated('2026-06-01', '2026-06-23')).toBe(true);
    expect(isOutdated('2026-12-01', '2026-06-23')).toBe(false);
  });
});
