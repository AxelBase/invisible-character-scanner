<script lang="ts">
  import "../app.css";
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';

  // Buy Me a Coffee & Bitcoin configuration
  const bmacUsername = 'axelbase';
  const bitcoinAddress = 'bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9';

  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  const currentYear = new Date().getFullYear();
</script>

<header class="navbar-fixed">
  <nav class="container custom-nav">
    <div class="nav-brand-group">
      <a href="{base}/" aria-label="Home" class="logo-link">
        <img src="{base}/AxelLab-Logo.ico" alt="Logo" class="navbar-logo" />
      </a>
      <a href="{base}/" class="brand-text">AxelBase</a>
    </div>

    <div class="nav-right">
      <!-- Buy Me a Coffee + Bitcoin Dropdown -->
      <div class="bmac-wrapper position-relative" use:clickOutside on:click_outside={closeDropdown}>
        <button
          class="btn-bmac d-flex align-items-center gap-2"
          on:click={toggleDropdown}
          aria-label="Support the project"
        >
          <i class="bi bi-cup-hot-fill"></i>
          <span class="d-none d-md-inline">Buy me a coffee</span>
        </button>

        {#if isDropdownOpen}
          <div
            class="bmac-dropdown"
            transition:fly={{ y: -10, duration: 220 }}
          >
            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
              class="bmac-item amount-item"
            >
              <span class="amount">$3</span> One Coffee
            </a>

            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
              class="bmac-item amount-item"
            >
              <span class="amount">$5</span> Two Coffees
            </a>

            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
              class="bmac-item amount-item"
            >
              <span class="amount">$10</span> Three Coffees
            </a>

            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
              class="bmac-item custom-amount"
            >
              Custom Amount
            </a>

            <a
              href="bitcoin:{bitcoinAddress}?label=AxelBase&message=Buy%20me%20a%20coffee"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
              class="bmac-item custom-amount crypto-item"
            >
              Buy via Crypto (Bitcoin)
            </a>
          </div>
        {/if}
      </div>

      <ul class="nav-links">
        <li><a href="{base}/">Home</a></li>
        <li><a href="{base}/#about">About</a></li>
        <li><a href="{base}/#how-to">How to use</a></li>
        <li><a href="{base}/#faq">FAQ</a></li>
        <li><a href="{base}/blog">Blog</a></li>
      </ul>
    </div>
  </nav>
</header>

<slot />

<footer class="footer-fixed">
  <div class="container d-flex justify-content-between align-items-center">
    <span class="copyright">
      © {currentYear} AxelBase Invisible Character Scanner
    </span>
    <div class="footer-links">
      <a href="{base}/privacy">Privacy</a>
      <span class="sep">•</span>
      <a href="{base}/terms">Terms</a>
    </div>
  </div>
</footer>

<style>
  /* ── Original File 2 navbar & footer styles (kept intact) ── */
  .navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-primary);
    color: white;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(109, 63, 91, 0.3);
    height: 70px;
    display: flex;
    align-items: center;
  }

  .custom-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .nav-brand-group {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .navbar-logo {
    height: 40px;
    width: auto;
    transition: transform 0.3s ease;
  }
  .navbar-logo:hover { transform: rotate(10deg); }

  .brand-text {
    font-size: 1.5rem;
    font-weight: 800;
    color: white;
    text-decoration: none;
    letter-spacing: 0.5px;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-links {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    font-size: 0.95rem;
  }

  .nav-links a:hover {
    color: white;
    text-shadow: 0 0 10px rgba(255,255,255,0.5);
  }

  .footer-fixed {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-primary);
    color: white;
    padding: 0.8rem 0;
    font-size: 0.85rem;
    z-index: 1000;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
  }

  .footer-links a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-links a:hover { color: white; }
  .sep { margin: 0 0.5rem; color: rgba(255,255,255,0.4); }

  /* ── Enhanced Buy Me a Coffee (inspired by File 1, adapted to File 2 theme) ── */
  .btn-bmac {
    background: #FFDD00;
    color: #000;
    border: none;
    border-radius: 50px;
    padding: 0.48rem 1.15rem;
    font-size: 0.92rem;
    font-weight: 700;
    transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }

  .btn-bmac:hover {
    transform: scale(1.06);
    background: #ffe652;
    box-shadow: 0 6px 16px rgba(0,0,0,0.22);
  }

  .bmac-dropdown {
    position: absolute;
    top: 115%;
    left: 50%;
    transform: translateX(-50%);
    width: 245px;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(109, 63, 91, 0.14);
    box-shadow: 0 14px 38px rgba(109, 63, 91, 0.26),
                0 10px 20px rgba(109, 63, 91, 0.18);
    z-index: 1050;
  }

  .bmac-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: var(--color-primary);
    text-decoration: none;
    font-size: 0.97rem;
    font-weight: 500;
    transition: all 0.22s ease;
  }

  .bmac-item:hover {
    background: var(--color-accent);
    color: var(--color-primary-dark);
    padding-left: 26px;
  }

  .amount {
    font-weight: 800;
    color: #FFDD00;
    background: #222;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 1.08rem;
    min-width: 46px;
    text-align: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  }

  .custom-amount {
    font-weight: 700;
    color: var(--color-primary);
    border-top: 1px solid #eee;
    justify-content: center !important;
    padding: 14px 20px !important;
    background: rgba(109, 63, 91, 0.04);
  }

  .custom-amount:hover {
    background: rgba(109, 63, 91, 0.12);
  }

  .crypto-item {
    color: #f7931a;
    font-weight: 650;
  }

  .crypto-item:hover {
    background: #fff9f0;
    color: #e07b00;
  }

  @media (max-width: 992px) {
    .nav-links { display: none; }
  }
</style>