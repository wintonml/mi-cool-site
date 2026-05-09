import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface ValidationError {
  file: string;
  currentDate: string;
  suggestedFormat: string;
}

const DATE_FORMAT_REGEX = /^\d{2}-\d{2}-\d{4}$/;

function isValidDateFormat(dateStr: string): boolean {
  return DATE_FORMAT_REGEX.test(dateStr);
}

function isValidDate(dateStr: string): boolean {
  if (!isValidDateFormat(dateStr)) {
    return false;
  }

  const [day, month, year] = dateStr.split('-').map(Number);

  // Check basic ranges
  if (day < 1 || day > 31 || month < 1 || month > 12) {
    return false;
  }

  // Check if the date actually exists
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function suggestCorrectFormat(dateStr: string): string {
  // Try to parse common formats and suggest DD-MM-YYYY format
  const isoFormat = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD

  if (isoFormat.test(dateStr)) {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }

  return 'DD-MM-YYYY (e.g., 19-04-2026)';
}

function validateBlogPost(filePath: string): ValidationError | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    if (!data.date) {
      return {
        file: filePath,
        currentDate: 'missing',
        suggestedFormat: 'DD-MM-YYYY (e.g., 19-04-2026)',
      };
    }

    const dateStr = String(data.date);

    if (!isValidDate(dateStr)) {
      return {
        file: filePath,
        currentDate: dateStr,
        suggestedFormat: suggestCorrectFormat(dateStr),
      };
    }

    return null;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

function getAllBlogPosts(): string[] {
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

function main(): void {
  console.log('🔍 Validating blog post date formats...\n');

  const blogFiles = getAllBlogPosts();
  const errors: ValidationError[] = [];

  for (const file of blogFiles) {
    const error = validateBlogPost(file);
    if (error) {
      errors.push(error);
    }
  }

  if (errors.length > 0) {
    console.log('❌ Invalid date format(s) found:\n');

    errors.forEach((error) => {
      console.log(`❌ Invalid date format found in: ${error.file}`);
      console.log(`   Current date: ${error.currentDate}`);
      console.log(`   Expected format: ${error.suggestedFormat}\n`);
    });

    console.log('Build failed due to invalid blog post dates.');
    console.log('Please fix the date formats and try again.\n');
    process.exit(1);
  }

  console.log('✅ All blog post dates are valid!');
}

// Export functions for testing
export { isValidDateFormat, isValidDate, suggestCorrectFormat, validateBlogPost };

if (require.main === module) {
  main();
}
