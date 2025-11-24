<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Deploying a 100% Static Privacy-First Tool on GitHub Pages</title>
  <meta name="description" content="How we built a fully client-side SvelteKit app that works perfectly under GitHub Pages project sites with zero backend." />
  <meta property="og:title" content="Deploying a 100% Static Privacy-First Tool on GitHub Pages" />
  <meta property="og:description" content="Learn how @sveltejs/adapter-static + correct base path handling delivers a lightning-fast, private tool to millions." />
  <meta property="og:url" content="{base}/blog/posts/post5" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>GitHub Pages Deployment</p>
  </div>

  <article class="prose">
    <h1>Deploying a 100% Static Privacy-First Tool on GitHub Pages</h1>
    <p class="post-meta">Published: November 24, 2025</p>

    <p>This entire scanner runs with <strong>zero backend</strong> — and that’s by design (NFR-03). Here’s how we made it work flawlessly on GitHub Pages project sites.</p>

    <h2>The Challenge</h2>
    <p>GitHub Pages project sites live at <code>username.github.io/repo-name/</code>. Most S chutMost SvelteKit apps break unless configured correctly.</p>

    <h2>Solution: adapter-static + Dynamic base Path</h2>
    <p>In <code>svelte.config.js</code>:</p>
    
    <!-- FIXED: Safe code block using {@html} with escaped braces -->
    <pre><code>{@html `paths: { base: process.env.NODE_ENV === 'production' ? '/invisible-character-scanner' : '' }`}</code></pre>

    <p>And <code>adapter-static</code> with <code>pages: 'docs'</code> → GitHub Pages reads the <code>docs</code> folder automatically.</p>

    <h2>Result</h2>
    <ul>
      <li>Final build &lt; 180 KB gzipped (NFR-03)</li>
      <li>No 404s on refresh (prerendered routes)</li>
      <li>All assets load correctly under subpath (FR-10)</li>
      <li>Works offline with Service Worker potential</li>
    </ul>

    <h2>Why This Matters</h2>
    <p>No backend = no logs, no tracking, no data leaks. Your pasted code, chat logs, or API keys never leave your device — ever.</p>

    <p class="italic-note">True privacy isn’t a feature. It’s the foundation.</p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
  .breadcrumbs { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: #666; }
  .breadcrumbs a { color: #0d6efd; text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose { line-height: 1.8; }
  .post-meta { color: #666; font-size: 0.9rem; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
  .prose h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #222; }
  .prose h2 { margin-top: 2.5rem; color: #0d6efd; }
  .italic-note { font-style: italic; text-align: center; margin-top: 3rem; color: #444; font-size: 1.1rem; }
</style>