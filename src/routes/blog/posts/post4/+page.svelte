<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Unicode Categories Explained: Cc, Cf, Zs & Zero-Width | Invisible Scanner Blog</title>
  <meta name="description" content="Deep dive into Unicode general categories Control (Cc), Format (Cf), Separator (Zs), and custom zero-width ranges — and why we let you toggle them." />
  <meta property="og:title" content="Unicode Categories Explained: Cc, Cf, Zs & Zero-Width Explained" />
  <meta property="og:description" content="Understand the exact Unicode categories behind invisible characters and why fine-grained control matters for developers and moderators." />
  <meta property="og:url" content="{base}/blog/posts/post4" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Unicode Categories Explained</p>
  </div>

  <article class="prose">
    <h1>Unicode Categories Explained: Cc, Cf, Zs, and Zero-Width Ranges</h1>
    <p class="post-meta">Published: November 24, 2025</p>

    <p>The Invisible Character Scanner gives you precise control over four Unicode detection groups. Here’s exactly what each means — and why it matters.</p>

    <h2>Cc — Control Characters</h2>
    <p>Includes ASCII control codes like <code>U+0007</code> (bell), <code>U+0009</code> (tab), <code>U+000D</code> (carriage return). Often leftover from old systems or malicious payloads.</p>

    <h2>Cf — Format Controls</h2>
    <p>The most dangerous group. Includes:</p>
    <ul>
      <li><code>U+200C</code> Zero Width Non-Joiner (ZWNJ)</li>
      <li><code>U+200D</code> Zero Width Joiner (ZWJ)</li>
      <li><code>U+200E/U+200F</code> Directional marks</li>
      <li><code>U+2060–U+2069</code> Invisible math operators</li>
    </ul>
    <p>Used in emoji sequences, homograph attacks, and bidirectional text exploits.</p>

    <h2>Zs — Space Separators</h2>
    <p>All space-like characters except regular space <code>U+0020</code>. Includes:</p>
    <ul>
      <li><code>U+00A0</code> Non-breaking space (common in web copy)</li>
      <li><code>U+2000–U+200A</code> En/em spaces</li>
      <li><code>U+202F</code> Narrow no-break space</li>
    </ul>

    <h2>Custom Zero-Width Range</h2>
    <p>We manually target the most abused zero-width block: <code>U+200B–U+200F</code>, <code>U+2060–U+2069</code>, <code>U+FEFF</code>, plus <code>U+061C</code> and <code>U+180E</code> — known for spam and clipboard attacks.</p>

    <h2>Why Toggle Controls Matter (FR-08)</h2>
    <p>Sometimes you <em>want</em> certain characters:</p>
    <ul>
      <li>Arabic/Persian text needs ZWNJ</li>
      <li>Designers use non-breaking spaces intentionally</li>
      <li>Emoji sequences rely on ZWJ</li>
    </ul>
    <p>That’s why the Advanced panel lets you disable any category without breaking legitimate content.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Should I always enable all categories?</summary>
      <p>For maximum safety: yes. For multilingual publishing: disable Cf/Zs as needed.</p>
    </details>
    <details>
      <summary>Why not just block everything?</summary>
      <p>Because legitimate use cases exist. We give you surgical control instead of a sledgehammer.</p>
    </details>

    <p class="italic-note">Precision over panic. Detect what matters — ignore what doesn’t.</p>
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