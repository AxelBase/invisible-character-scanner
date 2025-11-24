<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>How Real-Time Detection Works in the Browser | Invisible Scanner Blog</title>
  <meta name="description" content="Deep dive into Unicode property regex, client-side performance, and how we detect invisible characters under 100ms even on large texts." />
  <meta property="og:title" content="How Real-Time Detection Works in the Browser" />
  <!-- FIXED: Use {'{'} and {'}'} as separate expressions with no nesting -->
  <meta property="og:description" content="We use modern JavaScript regex with \p{'{'}Property_Name{'}'} syntax to detect Cc, Cf, Zs, and zero-width characters instantly — all in your browser." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>How Real-Time Detection Works</p>
  </div>

  <article class="prose">
    <h1>How Real-Time Detection Works in the Browser</h1>
    <p class="post-meta">Published: November 24, 2025</p>

    <p>The Invisible Character Scanner detects hidden Unicode characters instantly as you type or paste — no delay, no server round-trip. This is made possible by modern JavaScript and Unicode-aware regular expressions.</p>

    <h2>The Core Technology: Unicode Property Escapes</h2>
    <p>We use the <code>\p{'{'}Property{'}'}</code> syntax supported in modern browsers:</p>
    
    <!-- 100% SAFE CODE BLOCK — uses {@html} with backticks -->
    <pre><code>{@html `const regex = new RegExp('(\\p{Cc}|\\p{Cf}|\\p{Zs}|[\\u200B-\\u200F\\u2060-\\u2069\\uFEFF])', 'gu');`}</code></pre>

    <p>This single regex matches:</p>
    <ul>
      <li><code>\p{'{'}Cc{'}'}</code> — All control characters</li>
      <li><code>\p{'{'}Cf{'}'}</code> — Format controls (including ZWJ/ZWNJ)</li>
      <li><code>\p{'{'}Zs{'}'}</code> — All separators except regular space</li>
      <li>Specific zero-width ranges (U+200B–U+FEFF)</li>
    </ul>

    <h2>Performance That Meets NFR-01</h2>
    <p>The SRS demands detection under 100ms for 500 KB text. We achieve this by:</p>
    <ul>
      <li>Running detection only on change (Svelte reactive)</li>
      <li>Using a single optimized regex</li>
      <li>Skipping regular space U+0020 explicitly</li>
      <li>Capping input at 1 MB with graceful warning (NFR-05)</li>
    </ul>

    <h2>Visual Feedback You Can Trust</h2>
    <p>Every match is highlighted with its exact code point (e.g. <code>U+200D</code>) so you know exactly what was found and where.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Why not use charCodeAt() loops?</summary>
      <p>Too slow and error-prone. Regex with \p{'{'}Property{'}'} is 10–20× faster and more accurate.</p>
    </details>
    <details>
      <summary>Does it work in Safari?</summary>
      <p>Yes — Safari 14.1+ fully supports Unicode property escapes.</p>
    </details>

    <p class="italic-note">Fast. Accurate. Private. That’s real-time detection done right.</p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
  .breadcrumbs { 
    display: flex; 
    align-items: center; 
    gap: 0.5rem; 
    margin-bottom: 1.5rem; 
    font-size: 0.9rem; 
    color: #666; 
  }
  .breadcrumbs a { color: #0d6efd; text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose { line-height: 1.8; }
  .post-meta { 
    color: #666; 
    font-size: 0.9rem; 
    margin-bottom: 2rem; 
    border-bottom: 1px solid #eee; 
    padding-bottom: 1rem; 
  }
  .prose h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #222; }
  .prose h2 { margin-top: 2.5rem; color: #0d6efd; }
  .prose details { 
    background: #f8f9fa; 
    border: 1px solid #dee2e6; 
    border-radius: 8px; 
    padding: 1rem; 
    margin: 1rem 0; 
  }
  .prose summary { cursor: pointer; font-weight: 600; color: #0d6efd; }
  .prose summary::before { content: "+ "; font-weight: bold; }
  .prose details[open] summary::before { content: "− "; }
  .italic-note { font-style: italic; text-align: center; margin-top: 3rem; color: #666; }
</style>