<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>What Are Invisible Characters and Why They Matter | Invisible Scanner Blog</title>
  <meta name="description" content="Learn about zero-width spaces, BOMs, and hidden Unicode characters that silently break code, enable spam, and corrupt clipboard content." />
  <meta property="og:title" content="What Are Invisible Characters and Why They Matter" />
  <meta property="og:description" content="Invisible Unicode characters like U+200B, U+200D, and U+FEFF are silent threats in code and chat. This tool detects and removes them instantly." />
  <meta property="og:url" content="{base}/blog/posts/post1" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="What Are Invisible Characters and Why They Matter" />
  <meta name="twitter:description" content="Zero-width spaces, joiners, and BOMs can break your code and enable attacks. Learn how to detect and remove them instantly." />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>What Are Invisible Characters?</p>
  </div>

  <article class="prose">
    <h1>What Are Invisible Characters and Why They Matter</h1>
    <p class="post-meta">Published: November 24, 2025</p>

    <p>Invisible characters are Unicode code points that have <strong>no visible width or glyph</strong> but still exist in text. They include zero-width spaces, joiners, directional marks, and byte order marks (BOMs). While harmless in some contexts, they are frequently used maliciously or accidentally introduced via copy-paste.</p>

    <h2>The Most Common Invisible Offenders</h2>
    <ul>
      <li><code>U+200B</code> — Zero Width Space (ZWSP)</li>
      <li><code>U+200C</code> — Zero Width Non-Joiner (ZWNJ)</li>
      <li><code>U+200D</code> — Zero Width Joiner (ZWJ)</li>
      <li><code>U+FEFF</code> — Zero Width No-Break Space / BOM</li>
      <li><code>U+2060</code> — Word Joiner</li>
      <li><code>U+00A0</code> — Non-Breaking Space (often copied from web pages)</li>
    </ul>

    <h2>Real-World Damage</h2>
    <p>These characters cause real problems:</p>
    <ul>
      <li>JSON fails to parse with “Unexpected token” errors</li>
      <li>Code looks correct but throws syntax errors</li>
      <li>Discord/Slack messages appear empty but trigger spam filters</li>
      <li>Clipboard poisoning attacks that spread invisible payloads</li>
      <li>Git diffs polluted with invisible changes</li>
    </ul>

    <h2>Why This Tool Was Built</h2>
    <p>Most online cleaners are slow, send your data to servers, or miss advanced Unicode ranges. This scanner runs 100% in your browser, detects everything instantly, and respects your privacy completely — as required by NFR-03 and NFR-06 in the SRS.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Can invisible characters be used in phishing?</summary>
      <p>Yes. Attackers use ZWJ/ZWNJ to create visually identical domain names or usernames (homograph attacks).</p>
    </details>
    <details>
      <summary>Why not just use regex find/replace?</summary>
      <p>Most editors can’t display or select invisible characters reliably. This tool highlights them visually and removes them in one click.</p>
    </details>
    <details>
      <summary>Is it safe to paste sensitive code?</summary>
      <p>Yes — nothing ever leaves your browser. No logs, no tracking, no backend.</p>
    </details>

    <p class="italic-note">Protect your text. Scan everything. Stay invisible-character-free.</p>
  </article>
</div>

<style>
  /* Same beautiful styling as your example — reused */
  .post-layout { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
  .breadcrumbs { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: #666; }
  .breadcrumbs a { color: #0d6efd; text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose { line-height: 1.8; }
  .post-meta { color: #666; font-size: 0.9rem; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
  .prose h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #222; }
  .prose h2 { margin-top: 2.5rem; color: #0d6efd; }
  .prose details { background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 1rem; margin: 1rem 0; }
  .prose summary { cursor: pointer; font-weight: 600; color: #0d6efd; }
  .prose summary::before { content: "+ "; font-weight: bold; }
  .prose details[open] summary::before { content: "− "; }
  .italic-note { font-style: italic; text-align: center; margin-top: 3rem; color: #666; }
</style>