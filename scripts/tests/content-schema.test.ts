import { describe, expect, it } from 'vitest';
import { validateFrontMatter } from '../content-schema';

const validFrontMatter = {
  title: '示例页面',
  description: '用于测试的页面',
  category: 'study',
  audience: ['本科生'],
  content_type: 'experience',
  status: 'active',
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

  it('rejects active high-risk official-source pages without sources', () => {
    const result = validateFrontMatter({
      ...validFrontMatter,
      category: 'services',
      content_type: 'official-source',
    });
    expect(result.success).toBe(false);
  });
});
