<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | Invisible Character Scanner</title>
  <meta name="description" content="We collect nothing. Your text never leaves your browser. Full privacy policy for the Invisible Character Scanner & Cleaner." />
  <meta property="og:title" content="Privacy Policy | Invisible Character Scanner" />
  <meta property="og:description" content="100% client-side. No tracking. No logs. No data collection of any kind." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a> <span>/</span> <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>
    <p class="post-meta">Effective Date: November 24, 2025</p>

    <p>Welcome to the <strong>Invisible Character Scanner & Cleaner</strong> — a fully client-side, open-source web utility designed to detect and remove zero-width spaces, BOMs, and hidden Unicode characters.</p>

    <p><strong>We collect no data. Period.</strong></p>

    <h2>No Data Collection — By Design</h2>
    <p>This tool runs <strong>100% in your browser</strong>. Every character you paste, every scan, every removal happens locally on your device. We do <strong>not</strong> collect, store, transmit, or log:</p>
    <ul>
      <li>Personal information (name, email, IP address)</li>
      <li>Your input text — even temporarily</li>
      <li>Usage data, analytics, or behavioral tracking</li>
      <li>Cookies, localStorage persistence, or session tracking</li>
    </ul>

    <h2>How It Actually Works</h2>
    <p>All detection, highlighting, removal, and clipboard operations use only:</p>
    <ul>
      <li>SvelteKit + TypeScript (client-side)</li>
      <li>Unicode-aware JavaScript regex</li>
      <li>Your browser’s native APIs (clipboard, DOM)</li>
    </ul>
    <p><strong>No network requests are made after page load.</strong> No backend. No database. No telemetry.</p>

    <h2>Third-Party Services</h2>
    <p>We do <strong>not</strong> use:</p>
    <ul>
      <li>Google Analytics, Plausible, or any analytics</li>
      <li>Advertising networks or trackers</li>
      <li>External fonts or CDN scripts that track users</li>
    </ul>
    <p>All assets are bundled and served from GitHub Pages.</p>

    <h2>Security & Responsibility</h2>
    <p>Because no data is transmitted, we cannot be breached, logged, or subpoenaed for your content. You remain in full control. We recommend using this tool on a trusted device and keeping your browser updated.</p>

    <h2>Children’s Privacy</h2>
    <p>This tool is not directed at children under 13. We do not knowingly collect any data from children.</p>

    <h2>Changes to This Policy</h2>
    <p>We may update this policy. Changes will be posted here with the new effective date.</p>

    <h2>Contact</h2>
    <p>This project is open-source and community-driven. Issues and feedback: <a href="https://github.com/axelbase/invisible-character-scanner" target="_blank" rel="noopener">GitHub Repository</a></p>

    <p class="italic-note">
      <strong>Your privacy is not a feature — it’s the entire architecture.</strong><br>
      Paste anything. Scan everything. Nothing leaves your browser. Ever.
    </p>
  </article>
</div>

<style>
  /* Reusing your existing beautiful prose style */
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