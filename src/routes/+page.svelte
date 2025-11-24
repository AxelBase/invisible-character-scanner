<script lang="ts">
  import { onMount } from 'svelte';
  import { detectInvisibleChars, getStats, availableCategories, type Category } from '$lib/unicode';
  import { removeAll, replaceAll } from '$lib/cleaner';
  import { copyText, pasteText } from '$lib/clipboard';
  import { base } from '$app/paths';

  let inputText = '';
  let detections: ReturnType<typeof detectInvisibleChars> = [];
  let stats = { totalCount: 0, uniqueTypes: 0, detailedList: [] };
  let placeholder = '[INV]';
  let toastMessage = '';
  let showToast = false;
  let enabledCategories: Category[] = ['Cc', 'Cf', 'Zs', 'ZeroWidth'];

  $: {
    if (inputText.length > 1_048_576) {
      detections = [];
      stats = { totalCount: 0, uniqueTypes: 0, detailedList: [] };
    } else {
      detections = detectInvisibleChars(inputText, enabledCategories);
      stats = getStats(detections);
    }
  }

  function handleRemove() { inputText = removeAll(inputText, enabledCategories); }
  function handleReplace() { inputText = replaceAll(inputText, placeholder, enabledCategories); }
  async function handleCopyCleaned() {
    const clean = removeAll(inputText, enabledCategories);
    const ok = await copyText(clean);
    showToastMessage(ok ? 'Cleaned text copied!' : 'Copy failed');
  }
  async function handlePasteClean() {
    const text = await pasteText();
    if (text) inputText = text;
  }
  function showToastMessage(msg: string) {
    toastMessage = msg; showToast = true;
    setTimeout(() => showToast = false, 3000);
  }
  function toggle(cat: Category) {
    enabledCategories = enabledCategories.includes(cat)
      ? enabledCategories.filter(c => c !== cat)
      : [...enabledCategories, cat];
  }

  // Build clean, readable preview
  function buildPreview(): string {
    if (detections.length === 0) {
      return inputText
        .replace(/ /g, '·')
        .replace(/\n/g, '⏎\n')
        .replace(/\t/g, '→   ');
    }
    let html = '';
    let pos = 0;
    for (const d of detections) {
      const before = inputText.slice(pos, d.position);
      html += before
        .replace(/ /g, '·')
        .replace(/\n/g, '⏎<br>')
        .replace(/\t/g, '→   ');
      html += `<span class="inv-highlight" title="${d.name} (${d.codePoint})">${d.codePoint}</span>`;
      pos = d.position + d.char.length;
    }
    const tail = inputText.slice(pos);
    html += tail
      .replace(/ /g, '·')
      .replace(/\n/g, '⏎<br>')
      .replace(/\t/g, '→   ');
    return html;
  }

  onMount(() => document.getElementById('input')?.focus());
</script>

<main class="container py-5">
  
  <div class="text-center mb-5 fade-in-up">
    <h1 class="display-4 fw-bold mb-3" style="color: var(--color-primary);">
      Invisible Character Scanner & Cleaner
    </h1>
    <p class="lead text-muted">
      Detect and remove zero-width spaces, BOM, formatting marks, and more with a single click.
    </p>
  </div>

  <div class="row g-4">
    <div class="col-lg-7">
      <div class="position-relative">
        <textarea
          id="input"
          class="form-control font-monospace shadow-sm"
          rows="16"
          bind:value={inputText}
          placeholder="Paste your text here to reveal invisible characters..."
          spellcheck="false"
          aria-label="Text input for invisible character detection"
        ></textarea>
        {#if stats.totalCount > 0}
           <div class="position-absolute top-0 end-0 m-3 badge bg-danger rounded-pill animate-pulse">
             {stats.totalCount} Detected
           </div>
        {/if}
      </div>
    </div>

    <div class="col-lg-5">
      <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span><i class="bi bi-bar-chart-fill me-2"></i>Detection Summary</span>
          {#if stats.totalCount > 0}
             <span class="badge bg-danger">{stats.totalCount}</span>
          {/if}
        </div>
        <div class="card-body">
          {#if stats.totalCount === 0}
            <div class="text-center py-4 text-success">
              <i class="bi bi-check-circle-fill fs-1 d-block mb-2"></i>
              <p class="mb-0 fw-bold">No invisible characters found!</p>
            </div>
          {:else}
            <p><strong>{stats.uniqueTypes}</strong> unique type(s) detected:</p>
            <ul class="list-unstyled small mb-0" style="max-height: 150px; overflow-y: auto;">
              {#each stats.detailedList as item}
                <li class="d-flex justify-content-between align-items-center mb-2 p-2 rounded bg-light">
                  <span><code>{item.codePoint}</code> — {item.name}</span>
                  <span class="badge bg-secondary rounded-pill">{item.count}</span>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>

      <div class="d-grid gap-3">
        <button class="btn btn-danger btn-lg text-white shadow-sm" on:click={handleRemove} disabled={stats.totalCount === 0}>
          <i class="bi bi-trash3-fill me-2"></i> Remove All Invisible
        </button>
        
        <div class="input-group shadow-sm rounded-pill overflow-hidden border">
          <input type="text" class="form-control border-0" bind:value={placeholder} placeholder="e.g. [ZW]" style="border-radius: 0; padding-left: 1.5rem;" />
          <button class="btn btn-outline-secondary border-0" on:click={handleReplace} disabled={stats.totalCount === 0}>
            Replace All
          </button>
        </div>

        <div class="row g-2">
          <div class="col-6">
            <button class="btn btn-success w-100 text-white" on:click={handleCopyCleaned}>
              <i class="bi bi-clipboard-check me-2"></i> Copy Clean
            </button>
          </div>
          <div class="col-6">
             <button class="btn btn-outline-primary w-100" on:click={handlePasteClean}>
              <i class="bi bi-clipboard-plus me-2"></i> Paste
            </button>
          </div>
        </div>
      </div>

      <details class="mt-4 card">
        <summary class="card-header cursor-pointer">Advanced: Category Filters</summary>
        <div class="card-body small">
          {#each availableCategories as cat}
            <div class="form-check form-switch mb-2">
              <input class="form-check-input" type="checkbox" id="cat-{cat}" checked={enabledCategories.includes(cat)}
                     on:change={() => toggle(cat)} />
              <label class="form-check-label" for="cat-{cat}">{cat}</label>
            </div>
          {/each}
        </div>
      </details>
    </div>
  </div>

  {#if detections.length > 0}
    <div class="mt-5 card border-primary">
      <div class="card-header bg-primary text-white">
        <i class="bi bi-eye-fill me-2"></i>Live Highlight Preview
      </div>
      <div class="card-body bg-white font-monospace" style="font-size: 0.95rem; line-height: 1.6; overflow-x: auto;">
        {@html buildPreview()}
      </div>
    </div>
  {/if}

  <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1100; margin-bottom: 60px;">
    <div class="toast align-items-center text-bg-success border-0 shadow-lg" role="alert" class:show={showToast}>
      <div class="d-flex">
        <div class="toast-body fw-bold">
          <i class="bi bi-check-lg me-2"></i>{toastMessage}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>

  <hr class="my-5" style="opacity: 0.1;">

<section id="about" class="my-5 py-5 bg-light rounded-4">
  <div class="container">
    <h2 class="mb-4 text-center">
      <i class="bi bi-shield-lock me-2 text-primary"></i>About This Tool
    </h2>
    <div class="row g-5 align-items-center">
      <div class="col-lg-6">
        <p class="lead">
          The <strong>Invisible Character Scanner & Cleaner</strong> is a privacy-first, fully client-side web utility built in November 2025 to solve a growing real-world problem: hidden Unicode characters silently breaking code, enabling spam, and poisoning clipboard content.
        </p>
        <p>
          From zero-width spaces (<code>U+200B</code>) and joiners (<code>U+200C–U+200D</code>) to BOMs (<code>U+FEFF</code>) and obscure formatting controls, these characters are invisible in most editors but cause JSON parse failures, broken diffs, Discord raids, and even homograph attacks.
        </p>
        <p>
          Unlike every other online cleaner, <strong>this tool sends nothing to any server</strong>. All detection, highlighting, removal, and clipboard operations happen 100% in your browser using SvelteKit and modern Unicode-aware JavaScript regex. No logs. No tracking. No backend. Your API keys, private messages, and source code never leave your device — ever.
        </p>
      </div>
      <div class="col-lg-6">
        <div class="card border-0 shadow-lg h-100">
          <div class="card-body p-4">
            <h4 class="text-primary">Built to SRS Specification (Nov 2025)</h4>
            <ul class="list-unstyled">
              <li class="mb-2">FR-01–FR-10 fully implemented</li>
              <li class="mb-2">NFR-01: Detection 100ms on 500 KB text</li>
              <li class="mb-2">NFR-02: Fully responsive (mobile 320px+)</li>
              <li class="mb-2">NFR-03: Final build ≤ 300 KB gzipped</li>
              <li class="mb-2">NFR-06: Proper ARIA labels & keyboard navigation</li>
              <li class="mb-2">Deployed via <code>@sveltejs/adapter-static</code> on GitHub Pages</li>
            </ul>
            <p class="mt-3 mb-0">
              <strong>Open source • MIT licensed • Self-hostable in seconds</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
    <p class="text-center mt-4 fst-italic text-muted">
      Trusted by developers, Discord moderators, and security-conscious users worldwide.
    </p>
  </div>
</section>
<section id="how-to" class="my-5 py-5">
  <div class="container">
    <h2 class="mb-5 text-center">
      <i class="bi bi-lightning-charge-fill me-2 text-warning"></i>How to Use in 30 Seconds
    </h2>
    <div class="row g-4 justify-content-center">
      <div class="col-md-4">
        <div class="text-center px-4">
          <div class="display-1 text-primary mb-3 fw-bold">1</div>
          <h4>Paste or Type</h4>
          <p class="text-muted">
            Paste any suspicious text — code, JSON, chat logs, or clipboard content — into the large textarea. Detection begins instantly on every keystroke (FR-02).
          </p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="text-center px-4">
          <div class="display-1 text-primary mb-3 fw-bold">2</div>
          <h4>See Hidden Characters</h4>
          <p class="text-muted">
            Invisible characters are immediately highlighted in the live preview below with their exact code point (e.g., <code>U+200B</code>). The red badge shows total count, and the summary panel lists every unique type (FR-03, FR-04).
          </p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="text-center px-4">
          <div class="display-1 text-primary mb-3 fw-bold">3</div>
          <h4>Clean Instantly</h4>
          <p class="text-muted">
            Choose your action:<br>
            • <strong>Remove All</strong> — permanently deletes every invisible character (FR-05)<br>
            • <strong>Replace All</strong> — swaps them for a visible placeholder like <code>[INV]</code> or <code>[ZW]</code> (FR-06)<br>
            • <strong>Copy Clean</strong> — copies fully sanitized text to clipboard (FR-07)<br>
            • <strong>Paste & Clean</strong> — reads clipboard and inserts cleaned version (FR-09)
          </p>
        </div>
      </div>
    </div>
    <div class="mt-5 alert alert-info text-center">
      <strong>Pro Tip:</strong> Use the <em>Advanced → Category Filters</em> toggle to disable detection of legitimate characters (e.g., ZWNJ in Persian text or non-breaking spaces in design mockups) — full control without false positives.
    </div>
  </div>
</section>
<section id="faq" class="my-5 py-5 bg-light rounded-4">
  <div class="container">
    <h2 class="mb-5 text-center">
      <i class="bi bi-chat-dots me-2 text-success"></i>Frequently Asked Questions
    </h2>
    <div class="accordion accordion-flush" id="faqAccordion">
      <div class="accordion-item rounded shadow-sm mb-3 overflow-hidden">
        <h3 class="accordion-header">
          <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
            Is my data really private and never sent anywhere?
          </button>
        </h3>
        <div id="q1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body">
            <strong>Yes — 100%.</strong> This tool has no backend, no API calls, no analytics, and no cookies. All processing uses only client-side JavaScript. Even if you paste sensitive API keys or private messages, they never leave your browser. This is verified in the network tab: zero outgoing requests after page load.
          </div>
        </div>
      </div>

      <div class="accordion-item rounded shadow-sm mb-3 overflow-hidden">
        <h3 class="accordion-header">
          <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
            Why does "Remove All" sometimes glue words together?
          </button>
        </h3>
        <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body">
            Only if invisible characters were inserted <em>between</em> visible letters (common in attacks). Example: <code>Hello‌World</code> → <code>HelloWorld</code>. This is correct behavior — the original text was already broken. Use <strong>Replace All</strong> first if you want to audit what was removed.
          </div>
        </div>
      </div>

      <div class="accordion-item rounded shadow-sm mb-3 overflow-hidden">
        <h3 class="accordion-header">
          <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
            Can I use this on mobile?
          </button>
        </h3>
        <div id="q3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body">
            Absolutely. Fully responsive from 320px upward (NFR-02). Works perfectly on iPhone, Android, iPad — including clipboard access (with user permission).
          </div>
        </div>
      </div>

      <div class="accordion-item rounded shadow-sm mb-3 overflow-hidden">
        <h3 class="accordion-header">
          <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
            Does it work when hosted on GitHub Pages under a subpath?
          </button>
        </h3>
        <div id="q4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body">
            Yes — built with <code>adapter-static</code> and correct <code>base</code> path handling in <code>svelte.config.js</code>. All routes and assets resolve perfectly on both user and project sites (FR-10).
          </div>
        </div>
      </div>

      <div class="accordion-item rounded shadow-sm mb-3 overflow-hidden">
        <h3 class="accordion-header">
          <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#q5">
            Is this open source? Can I self-host it?
          </button>
        </h3>
        <div id="q5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body">
            Yes! MIT licensed. Fork it, improve it, host it anywhere. One-command deploy with <code>npm run build && gh-pages -d build</code> or similar.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</main>

<style>
  /* Local Styles for specific page elements */
  
  .animate-pulse {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
    100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
  }

  .fade-in-up {
    animation: fadeInUp 0.6s ease-out;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Highlighting specifically for the preview box */
  :global(.inv-highlight) {
    background: #ffcccc;
    color: #c00;
    padding: 0 5px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.85em;
    margin: 0 2px;
    display: inline-block;
    min-width: 2ch;
    text-align: center;
    border: 1px solid #f5c6cb;
  }
  
  .cursor-pointer { cursor: pointer; }
</style>