import { errorDict } from './errorData';
import type { ErrorMatch, CategoryId } from './types';

export function detectErrors(text: string): ErrorMatch[] {
  const matches: ErrorMatch[] = [];

  for (const [categoryId, subcategories] of Object.entries(errorDict)) {
    for (const [subId, subclass] of Object.entries(subcategories)) {
      if (!subclass.errors) continue;
      for (const error of subclass.errors) {
        if (!error.regex) continue;
        const video =
          error.video !== undefined ? error.video : (subclass.video ?? '');
        try {
          const regex = new RegExp(error.regex, 'g');
          let match: RegExpExecArray | null;
          while ((match = regex.exec(text)) !== null) {
            matches.push({
              start: match.index,
              end: match.index + match[0].length,
              help: error.help,
              video,
              categoryId: categoryId as CategoryId,
              subcategoryId: subId,
              subcategoryTitle: subclass.title,
            });
          }
        } catch {
          // skip malformed regex
        }
      }
    }
  }

  // Sort by start position, then resolve overlaps by keeping the first match
  matches.sort((a, b) => a.start - b.start);
  const result: ErrorMatch[] = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      result.push(m);
      lastEnd = m.end;
    }
  }
  return result;
}
