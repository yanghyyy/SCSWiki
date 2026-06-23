import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { validateFrontMatter } from './content-schema';

const docsRoot = path.resolve('docs');

function formatIssue(file: string, message: string) {
  return `${path.relative(process.cwd(), file)}: ${message}`;
}

async function main() {
  const files = await fg('**/*.md', {
    cwd: docsRoot,
    absolute: true,
    ignore: ['.vitepress/**'],
  });

  const errors: string[] = [];

  for (const file of files) {
    const parsed = matter.read(file);
    const data = parsed.data;

    if (data.meta_exempt === true) {
      continue;
    }

    const result = validateFrontMatter(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        const location = issue.path.length > 0 ? issue.path.join('.') : 'frontmatter';
        errors.push(formatIssue(file, `${location}: ${issue.message}`));
      }
    }
  }

  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
    return;
  }

  console.log(`Validated ${files.length} Markdown files.`);
}

await main();
