// src/lib/unicode.ts
export type Category = 'Cc' | 'Cf' | 'Zs' | 'ZeroWidth';

export const availableCategories: Category[] = ['Cc', 'Cf', 'Zs', 'ZeroWidth'];

export interface InvisibleChar {
  position: number;
  char: string;
  codePoint: string;
  name: string;
}

const NAMES: Record<string, string> = {
  'U+0009': 'TAB',
  'U+000A': 'LINE FEED',
  'U+000D': 'CARRIAGE RETURN',
  'U+00A0': 'NO-BREAK SPACE',
  'U+200B': 'ZERO WIDTH SPACE',
  'U+200C': 'ZERO WIDTH NON-JOINER',
  'U+200D': 'ZERO WIDTH JOINER',
  'U+200E': 'LEFT-TO-RIGHT MARK',
  'U+200F': 'RIGHT-TO-LEFT MARK',
  'U+2060': 'WORD JOINER',
  'U+FEFF': 'ZERO WIDTH NO-BREAK SPACE (BOM)',
  'U+061C': 'ARABIC LETTER MARK',
  'U+180E': 'MONGOLIAN VOWEL SEPARATOR',
};

export function detectInvisibleChars(
  text: string,
  enabled: Category[] = ['Cc', 'Cf', 'Zs', 'ZeroWidth']
): InvisibleChar[] {
  const results: InvisibleChar[] = [];

  // Build regex safely — property escapes must be outside character class in JS
  const patterns: string[] = [];

  if (enabled.includes('Cc')) patterns.push('\\p{Cc}');
  if (enabled.includes('Cf')) patterns.push('\\p{Cf}');
  if (enabled.includes('Zs')) patterns.push('\\p{Zs}');
  if (enabled.includes('ZeroWidth')) {
    patterns.push('[\\u200B-\\u200F\\u2060-\\u2069\\uFEFF\\u061C\\u180E]');
  }

  if (patterns.length === 0) return [];

  const regex = new RegExp(`(${patterns.join('|')})`, 'gu');
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const char = match[0];
    const cp = char.codePointAt(0)!;
    const codePoint = 'U+' + cp.toString(16).toUpperCase().padStart(4, '0');

    // Skip regular space U+0020 even if Zs is enabled
    if (cp === 0x20) continue;

    results.push({
      position: match.index,
      char,
      codePoint,
      name: NAMES[codePoint] || `Invisible Character (${codePoint})`,
    });
  }

  return results;
}

export function getStats(chars: InvisibleChar[]) {
  const map = new Map<string, { name: string; count: number }>();
  for (const c of chars) {
    const e = map.get(c.codePoint) || { name: c.name, count: 0 };
    e.count++;
    map.set(c.codePoint, e);
  }
  const list = Array.from(map, ([codePoint, data]) => ({ codePoint, name: data.name, count: data.count }));
  return {
    totalCount: chars.length,
    uniqueTypes: list.length,
    detailedList: list,
  };
}