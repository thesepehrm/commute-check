<script lang="ts">
  import { MENU_ITEMS } from "../constants/menu";
  import { activeTab } from "../stores/settings";
  import ThemeToggle from "./ThemeToggle.svelte";

  let isMenuOpen = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function selectMenuItem(label: string) {
    activeTab.set(label);
    isMenuOpen = false;
  }
</script>

<div class="navbar bg-base-200 px-4 mb-4">
  <div class="navbar-start flex-1">
    <div class="relative">
      <button aria-label="Menu" class="btn btn-ghost" onclick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {#if isMenuOpen}
        <div
          class="absolute left-0 z-10 mt-2 p-2 shadow bg-base-200 rounded-box w-52"
        >
          {#each MENU_ITEMS as item}
            <button
              class="btn btn-ghost w-full justify-start my-1"
              onclick={() => selectMenuItem(item.label)}
              class:btn-active={$activeTab === item.label}
            >
              <span class="text-xl mr-2">{item.icon}</span>
              {item.label}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Mobile theme toggle -->
  <div class="ml-2">
    <ThemeToggle />
  </div>
</div>
