import fs from 'fs';
import matter from 'gray-matter';

// Mock the modules
jest.mock('fs');
jest.mock('gray-matter');

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedMatter = matter as jest.MockedFunction<typeof matter>;

// Import the functions to test
import {
  isValidDateFormat,
  isValidDate,
  suggestCorrectFormat,
  validateBlogPost,
} from './../../scripts/validate-blog-dates';

describe('Blog Date Validation Script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isValidDateFormat', () => {
    it('should return true for valid DD-MM-YYYY format', () => {
      expect(isValidDateFormat('19-04-2026')).toBe(true);
      expect(isValidDateFormat('01-12-2025')).toBe(true);
      expect(isValidDateFormat('31-01-2024')).toBe(true);
    });

    it('should return false for invalid formats', () => {
      expect(isValidDateFormat('2026-04-19')).toBe(false); // YYYY-MM-DD
      expect(isValidDateFormat('19/04/2026')).toBe(false); // Wrong separator
      expect(isValidDateFormat('19-4-2026')).toBe(false); // Single digit month
      expect(isValidDateFormat('19-04-26')).toBe(false); // Two digit year
      expect(isValidDateFormat('19-04-20266')).toBe(false); // Five digit year
      expect(isValidDateFormat('')).toBe(false); // Empty string
      expect(isValidDateFormat('invalid')).toBe(false); // Invalid string
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid dates', () => {
      expect(isValidDate('19-04-2026')).toBe(true);
      expect(isValidDate('01-01-2025')).toBe(true);
      expect(isValidDate('31-12-2024')).toBe(true);
      expect(isValidDate('29-02-2024')).toBe(true); // Leap year
    });

    it('should return false for invalid dates', () => {
      expect(isValidDate('31-02-2026')).toBe(false); // February 31st
      expect(isValidDate('32-01-2026')).toBe(false); // Day 32
      expect(isValidDate('19-13-2026')).toBe(false); // Month 13
      expect(isValidDate('19-00-2026')).toBe(false); // Month 0
      expect(isValidDate('00-04-2026')).toBe(false); // Day 0
      expect(isValidDate('29-02-2025')).toBe(false); // Non-leap year
    });

    it('should return false for invalid format', () => {
      expect(isValidDate('2026-04-19')).toBe(false);
      expect(isValidDate('invalid')).toBe(false);
    });
  });

  describe('suggestCorrectFormat', () => {
    it('should convert YYYY-MM-DD to DD-MM-YYYY', () => {
      expect(suggestCorrectFormat('2026-04-19')).toBe('19-04-2026');
      expect(suggestCorrectFormat('2025-12-01')).toBe('01-12-2025');
    });

    it('should return default format for unknown formats', () => {
      expect(suggestCorrectFormat('invalid')).toBe('DD-MM-YYYY (e.g., 19-04-2026)');
      expect(suggestCorrectFormat('19/04/2026')).toBe('DD-MM-YYYY (e.g., 19-04-2026)');
    });
  });

  describe('validateBlogPost', () => {
    const mockFilePath = '/path/to/blog.md';

    it('should return null for valid date', () => {
      const mockContent = '---\ntitle: "Test"\ndate: "19-04-2026"\n---\nContent';
      mockedFs.readFileSync.mockReturnValue(mockContent);
      mockedMatter.mockReturnValue({
        data: { date: '19-04-2026' },
        content: 'Content',
        orig: mockContent,
        language: null,
        matter: '---\ntitle: "Test"\ndate: "19-04-2026"\n---',
        stringify: jest.fn(),
      } as any);

      const result = validateBlogPost(mockFilePath);
      expect(result).toBeNull();
    });

    it('should return error for invalid date format', () => {
      const mockContent = '---\ntitle: "Test"\ndate: "2026-04-19"\n---\nContent';
      mockedFs.readFileSync.mockReturnValue(mockContent);
      mockedMatter.mockReturnValue({
        data: { date: '2026-04-19' },
        content: 'Content',
        orig: mockContent,
        language: null,
        matter: '---\ntitle: "Test"\ndate: "2026-04-19"\n---',
        stringify: jest.fn(),
      } as any);

      const result = validateBlogPost(mockFilePath);
      expect(result).toEqual({
        file: mockFilePath,
        currentDate: '2026-04-19',
        suggestedFormat: '19-04-2026',
      });
    });

    it('should return error for missing date', () => {
      const mockContent = '---\ntitle: "Test"\n---\nContent';
      mockedFs.readFileSync.mockReturnValue(mockContent);
      mockedMatter.mockReturnValue({
        data: {},
        content: 'Content',
        orig: mockContent,
        language: null,
        matter: '---\ntitle: "Test"\n---',
        stringify: jest.fn(),
      } as any);

      const result = validateBlogPost(mockFilePath);
      expect(result).toEqual({
        file: mockFilePath,
        currentDate: 'missing',
        suggestedFormat: 'DD-MM-YYYY (e.g., 19-04-2026)',
      });
    });
  });
});
