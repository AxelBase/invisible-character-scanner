<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy by Design: Nothing Ever Leaves Your Browser</title>
  <meta name="description" content="Why this invisible character scanner processes everything locally — and why that matters more in 2025 than ever." />
  <meta property="og:title" content="Privacy by Design: 100% Client-Side Processing" />
  <meta property="og:description" content="No tracking. No backend. No data leaves your browser — ever." />
  <meta property="og:url" content="{base}/blog/posts/post6" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<article class="prose container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Privacy by Design</p>
  </div>

  <h1>Privacy by Design: No Tracking, No Backend, No Data Leaves Your Browser</h1>
  <p class="post-meta">Published: November 24, 2025</p>

  <p>In 2025, pasting API keys, private messages, or source code into online tools is Russian roulette. This scanner was built differently.</p>

  <h2>100% Client-Side = 100% Private</h2>
  <ul>
    <li>All detection runs in your browser</li>
    <li>No data sent to any server</li>
    <li>No cookies, no analytics, no telemetry</li>
    <li>Works offline after first load</li>
  </ul>

  <h2>Why This Matters</h2>
  <p>You can safely paste:</p>
  <ul>
    <li>Production API tokens</li>
    <li>Private Discord logs</li>
    <li>Internal source code</li>
    <li>Sensitive JSON configs</li>
  </ul>

  <p>Nothing is logged. Nothing is stored. Nothing is shared.</p>

  <p class="italic-note">Your secrets stay secret. That’s not marketing — it’s architecture.</p>
</article>

<style>
  .post-layout { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
  .breadcrumbs { 
    display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; 
    font-size: 0.9rem; color: #666; 
  }
  .breadcrumbs a { color: #0d6efd; text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose { line-height: 1.8; }
  .post-meta { 
    color: #666; font-size: 0.9rem; margin-bottom: 2rem; 
    border-bottom: 1px solid #eee; padding-bottom: 1rem; 
  }
  .prose h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #222; }
  .prose h2 { margin-top: 2.5rem; color: #0d6efd; }
  .italic-note { font-style: italic; text-align: center; margin-top: 3rem; color: #666; }
</style>