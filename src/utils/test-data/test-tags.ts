export function formatTags(tags: string[] = []): string {
  return tags.map((tag) => `@${tag}`).join(' ');
}
