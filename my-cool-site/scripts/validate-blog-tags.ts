import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BLOG_TAGS } from '../src/common/constants/blogTag';
import { InvalidBlogTagMessage, NoBlogTagMessage } from '../src/common/constants/error';

export interface ValidationError {
  file: string;
  message: string;
}

function getAllBlogPostFiles(): string[] {
  const postsDir = path.join(process.cwd(), 'content/posts');

  if (!fs.existsSync(postsDir)) {
    console.log('No content/posts directory found.');
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => path.join(postsDir, file));
}

export function validateBlogPostTags(
  tags: string[] | undefined,
  filePath: string
): ValidationError | null {
  if (!tags || tags.length === 0) {
    return {
      file: filePath,
      message: NoBlogTagMessage(path.basename(filePath)),
    };
  }

  const invalidTags = tags.filter((tag) => !(tag in BLOG_TAGS));

  if (invalidTags.length > 0) {
    return {
      file: filePath,
      message: InvalidBlogTagMessage(path.basename(filePath), invalidTags),
    };
  }

  return null;
}

function main() {
  console.log('🔍 Validating blog post tags...\n');

  const blogFiles = getAllBlogPostFiles();
  const errors: ValidationError[] = [];

  for (const file of blogFiles) {
    const fileContent = fs.readFileSync(file, 'utf-8');
    const { data } = matter(fileContent);
    const tags = data.tags as string[] | undefined;

    const error = validateBlogPostTags(tags, file);
    if (error) {
      errors.push(error);
    }
  }

  if (errors.length > 0) {
    console.log('❌ Invalid blog tag(s) found:\n');

    errors.forEach((error) => {
      console.log(`❌ ${error.file}`);
      console.log(`   ${error.message}\n`);
    });

    console.log('Build failed due to invalid blog post tags.');
    process.exit(1);
  }

  console.log('✅ All blog post tags are valid!');
}

if (require.main === module) {
  main();
}
