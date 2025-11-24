// src/lib/clipboard.ts

// Copy text to clipboard with success feedback (returns promise resolving to success)
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
}

// Read text from clipboard
export async function pasteText(): Promise<string> {
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (err) {
    console.error('Failed to read clipboard:', err);
    return '';
  }
}