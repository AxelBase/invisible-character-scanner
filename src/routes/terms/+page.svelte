<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions | Invisible Character Scanner</title>
  <meta name="description" content="Terms of use for the Invisible Character Scanner & Cleaner — free, open-source, no warranty, as-is software." />
  <meta property="og:title" content="Terms & Conditions" />
  <meta property="og:description" content="Free to use. No warranty. Provided as-is. Open source under MIT license." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a> <span>/</span> <p>Terms & Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms & Conditions</h1>
    <p class="post-meta">Effective Date: November 24, 2025</p>

    <p>By using the <strong>Invisible Character Scanner & Cleaner</strong> ("the tool"), you agree to these Terms.</p>

    <h2>1. Nature of Service</h2>
    <p>This is a <strong>free, open-source</strong>, client-side web utility hosted on GitHub Pages. It detects and removes invisible Unicode characters from text using only your browser.</p>

    <h2>2. License to Use</h2>
    <p>You are granted a <strong>non-exclusive, royalty-free, worldwide license</strong> to use this tool for personal or commercial purposes. The source code is licensed under the <strong>MIT License</strong>.</p>

    <h2>3. No Warranty</h2>
    <p>This tool is provided <strong>"as is"</strong> and <strong>without warranty of any kind</strong>, express or implied, including but not limited to:</p>
    <ul>
      <li>Accuracy of detection</li>
      <li>Non-infringement</li>
      <li>Fitness for a particular purpose</li>
      <li>Availability or uptime</li>
    </ul>
    <p><strong>We make no guarantee</strong> that the tool will detect every invisible character or that removal will never affect legitimate content.</p>

    <h2>4. Limitation of Liability</h2>
    <p>In no event shall the authors or contributors be liable for any direct, indirect, incidental, special, or consequential damages arising from use of this tool — including data loss, security incidents, or financial harm.</p>

    <h2>5. Acceptable Use</h2>
    <p>You agree not to:</p>
    <ul>
      <li>Use the tool for unlawful purposes</li>
      <li>Attempt to overload, attack, or disrupt the GitHub Pages hosting</li>
      <li>Remove or alter the open-source attribution</li>
    </ul>

    <h2>6. Modifications</h2>
    <p>We may modify or discontinue the tool at any time without notice.</p>

    <h2>7. Governing Law</h2>
    <p>These terms are governed by the laws of open-source goodwill and common sense.</p>

    <h2>Open Source</h2>
    <p>Source code: <a href="https://github.com/axelbase/invisible-character-scanner" target="_blank" rel="noopener">GitHub</a><br>
    You are encouraged to fork, improve, and self-host.</p>

    <p class="italic-note">
      <strong>Free forever. Open always. No strings attached.</strong><br>
      Use it. Share it. Improve it. This tool belongs to the internet.
    </p>
  </article>
</div>

<style>
  /* Same clean style as Privacy Policy */
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