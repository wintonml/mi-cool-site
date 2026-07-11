import { validateBlogPostTags, ValidationError } from '../../scripts/validate-blog-tags';
import { InvalidBlogTagMessage, NoBlogTagMessage } from '../common/constants/error';
import { BLOG_TAGS } from '../common/constants/blogTag';

const title = 'Example post';
const invalidTags = ['unknown', 'fake'];
const validTags = [BLOG_TAGS.climb, BLOG_TAGS.run];

describe('validateBlogPostTags', () => {
  it('returns an error for invalid tags', () => {
    const tagsToTest = [...validTags, ...invalidTags];
    const expectedError: ValidationError = {
      file: title,
      message: InvalidBlogTagMessage(title, invalidTags),
    };

    expect(validateBlogPostTags(tagsToTest, title)).toEqual(expectedError);
  });

  it('returns an error for no tags', () => {
    const tagsToTest: string[] = [];
    const expectedError: ValidationError = {
      file: title,
      message: NoBlogTagMessage(title),
    };

    expect(validateBlogPostTags(tagsToTest, title)).toEqual(expectedError);
  });

  it('returns null for valid tags', () => {
    const tagsToTest = [...validTags];

    expect(validateBlogPostTags(tagsToTest, title)).toBeNull();
  });
});
