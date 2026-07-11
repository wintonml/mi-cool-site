export function InvalidBlogTagMessage(title: string, invalidTags: string[]) {
  return `Invalid blog tags for "${title}": ${invalidTags.join(', ')}`;
}

export function NoBlogTagMessage(title: string) {
  return `Blog post "${title}" has no tags.`;
}
