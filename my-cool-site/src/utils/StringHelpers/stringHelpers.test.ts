import { capitalize, capitalizeWords } from './stringHelpers';

describe('stringHelpers', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
      expect(capitalize('react')).toBe('React');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single characters', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('z')).toBe('Z');
    });

    it('should handle already capitalized strings', () => {
      expect(capitalize('Hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
    });
  });

  describe('capitalizeWords', () => {
    it('should capitalize the first letter of each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
      expect(capitalizeWords('react typescript')).toBe('React Typescript');
      expect(capitalizeWords('web development')).toBe('Web Development');
    });

    it('should handle single words', () => {
      expect(capitalizeWords('hello')).toBe('Hello');
      expect(capitalizeWords('react')).toBe('React');
    });

    it('should handle empty strings', () => {
      expect(capitalizeWords('')).toBe('');
    });

    it('should handle multiple spaces', () => {
      expect(capitalizeWords('hello   world')).toBe('Hello   World');
    });
  });
});
