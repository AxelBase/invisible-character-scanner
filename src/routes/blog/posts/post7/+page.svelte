<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Real-World Invisible Character Attacks Stopped Instantly</title>
  <meta name="description" content="Discord raids, fake GitHub repos, poisoned clipboard attacks — real cases and how one click defeats them all." />
  <meta property="og:title" content="Real-World Invisible Character Attacks (And How We Stop Them)" />
  <meta property="og:description" content="See how attackers use U+200B, ZWJ, and BOMs — and how this tool stops them cold." />
  <meta property="og:url" content="{base}/blog/posts/post7" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<article class="prose container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Real-World Attacks</p>
  </div>

  <h1>Real-World Invisible Character Attacks (And How This Tool Stops Them)</h1>
  <p class="post-meta">Published: November 24, 2025</p>

  <p>Invisible characters aren’t theoretical. They’re actively used in attacks today.</p>

  <h2>Case 1: Discord Raid Spam (2024–2025)</h2>
  <p>Attackers post messages containing only ZWJ/ZWNJ chains. Appears blank → bypasses filters → mass-reports users. “Paste & Clean” stops this instantly.</p>

  <h2>Case 2: Fake GitHub Code Snippets</h2>
  <p>Malicious actors insert U+200B between letters in repo names or code blocks. Victims copy “legitimate-looking” code → invisible payload executes. One click removes it.</p>

  <h2>Case 3: Clipboard Poisoning</h2>
  <p>Malware replaces copied text with invisible-payload version. Next paste executes malicious code. This scanner detects it before you paste.</p>

  <p class="italic-note">Don’t be a victim. Scan everything. One click. Total protection.</p>
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