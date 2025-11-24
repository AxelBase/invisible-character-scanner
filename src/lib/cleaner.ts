// src/lib/cleaner.ts
import { detectInvisibleChars, type Category } from './unicode';

// ──────────────────────────────────────────────────────────────────────
//  NEW: Pure, fast, correct removal using pre-detected list
// ──────────────────────────────────────────────────────────────────────
export function removeAll(text: string, categories: Category[] = ['Cc', 'Cf', 'Zs', 'ZeroWidth']): string {
  const matches = detectInvisibleChars(text, categories);

  // Sort descending by position to avoid index shifting
  const sorted = matches.sort((a, b) => b.position - a.position);

  let result = text;
  for (const m of sorted) {
    result = result.slice(0, m.position) + result.slice(m.position + m.char.length);
  }
  return result;
}

export function replaceAll(
  text: string,
  placeholder = '[INV]',
  categories: Category[] = ['Cc', 'Cf', 'Zs', 'ZeroWidth']
): string {
  const matches = detectInvisibleChars(text, categories);
  const sorted = matches.sort((a, b) => b.position - a.position);

  let result = text;
  for (const m of sorted) {
    result =
      result.slice(0, m.position) +
      placeholder +
      result.slice(m.position + m.char.length);
  }
  return result;
}