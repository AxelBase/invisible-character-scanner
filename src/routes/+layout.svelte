<script lang="ts">
  import "../app.css";
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';

  // --- Buy Me A Coffee Logic ---
  const paypalUsername = 'AxelLab427'; // Update this later
  const donationAmounts = [1, 3, 5, 10];
  
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
      
      <div class="bmac-wrapper" use:clickOutside on:click_outside={closeDropdown}>
        <button class="btn-bmac" on:click={toggleDropdown}>
          <i class="bi bi-cup-hot-fill"></i> 
          <span class="d-none d-md-inline ms-1">Buy me a coffee</span>
        </button>

        {#if isDropdownOpen}
          <div class="bmac-dropdown" transition:fly={{ y: -10, duration: 200 }}>
            {#each donationAmounts as amount}
              <a
                href="https://paypal.me/{paypalUsername}/{amount}"
                target="_blank"
                rel="noopener noreferrer"
                on:click={closeDropdown}
                class="bmac-item"
              >
                ${amount}
              </a>
            {/each}
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
      &copy; {new Date().getFullYear()} AxelBase Invisible Character Scanner
    </span>
    <div class="footer-links">
      <a href="{base}/privacy">Privacy</a>
      <span class="sep">•</span>
      <a href="{base}/terms">Terms</a>
    </div>
  </div>
</footer>

<style>
  /* --- Navbar Styling --- */
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

  /* --- BMAC Button & Dropdown --- */
  .bmac-wrapper {
    position: relative;
  }

  .btn-bmac {
    background: #FFDD00;
    color: #000;
    border: none;
    border-radius: 50px;
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }

  .btn-bmac:hover {
    transform: scale(1.05);
    background: #ffe652;
    box-shadow: 0 6px 15px rgba(0,0,0,0.2);
  }

  .bmac-dropdown {
    position: absolute;
    top: 120%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    overflow: hidden;
    min-width: 80px;
    display: flex;
    flex-direction: column;
    z-index: 1050;
  }

  .bmac-item {
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: var(--color-primary);
    font-weight: 600;
    text-align: center;
    transition: background 0.2s;
  }

  .bmac-item:hover {
    background-color: #f5ebf2;
  }

  /* --- Footer Styling --- */
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

  /* Mobile Menu Adjustment */
  @media (max-width: 992px) {
    .nav-links { display: none; } /* Simple hide for mobile, or implement hamburger if needed */
  }
</style>