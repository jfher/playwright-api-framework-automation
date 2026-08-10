import { setSeverity } from './allure';

export function severityByTag(tags: string[] = []) {
  if (tags.includes('@smoke') || tags.includes('@e2e')) {
    return setSeverity('critical');
  }

  if (tags.includes('@regression')) {
    return setSeverity('normal');
  }

  return setSeverity('minor');
}
