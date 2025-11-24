<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>One-Click Cleaning: Remove All vs Replace All | Invisible Scanner Blog</title>
  <meta name="description" content="Learn when to remove invisible characters completely or replace them with visible placeholders like [INV] or [ZW]." />
  <meta property="og:title" content="One-Click Cleaning: Remove All vs Replace All" />
  <meta property="og:description" content="Remove All deletes hidden characters. Replace All makes them visible. Choose the right tool for your workflow." />
  <meta property="og:url" content="{base}/blog/posts/post3" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>One-Click Cleaning</p>
  </div>

  <article class="prose">
    <h1>One-Click Cleaning: Remove All vs Replace All</h1>
    <p class="post-meta">Published: November 24, 2025</p>

    <p>Once invisible characters are detected, you have two powerful options — and choosing the right one depends on your goal.</p>

    <h2>Remove All — The Nuclear Option</h2>
    <p>Deletes every detected invisible character instantly. Perfect for:</p>
    <ul>
      <li>Cleaning code before commit</li>
      <li>Fixing broken JSON/API payloads</li>
      <li>Sanitizing clipboard content</li>
      <li>Preparing text for production</li>
    </ul>

    <h2>Replace All — The Visible Audit Trail</h2>
    <p>Replaces each invisible character with a placeholder (default: <code>[INV]</code>). Ideal when you want to:</p>
    <ul>
      <li>See exactly where invisible characters were</li>
      <li>Review changes before final cleanup</li>
      <li>Document incidents (e.g. spam reports)</li>
      <li>Educate team members</li>
    </ul>

    <h2>Which Should You Use?</h2>
    <p><strong>Use Remove All</strong> for production code and final cleanup.<br>
       <strong>Use Replace All</strong> for investigation, debugging, or training.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Does Remove All break layout?</summary>
      <p>No — our offset-tracking algorithm preserves all spacing and line breaks perfectly.</p>
    </details>
    <details>
      <summary>Can I customize the placeholder?</summary>
      <p>Yes — change it to [ZW], [HIDDEN], or any text you prefer.</p>
    </details>

    <p class="italic-note">One click. Total control. Your text, your rules.</p>
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