<script lang="ts">
  import { onMount } from "svelte";
  import { theme, initializeTheme } from "./lib/stores/theme";
  import { activeTab, initializeSettings } from "./lib/stores/settings";

  import ThemeToggle from "./lib/components/ThemeToggle.svelte";
  import TopMenu from "./lib/components/TopMenu.svelte";
  import CommuteCheck from "./lib/components/CommuteCheck.svelte";
  import Settings from "./lib/components/Settings.svelte";
  import Help from "./lib/components/Help.svelte";

  onMount(() => {
    initializeTheme();
    initializeSettings();
  });
</script>

<div class="min-h-screen bg-base-100" data-theme={$theme}>
  <div class="flex flex-col min-h-screen">
    <TopMenu />
    <main class="flex-1 px-4 py-4 container mx-auto max-w-6xl mb-6">
      {#if $activeTab === "Check Commute"}
        <CommuteCheck />
      {:else if $activeTab === "Settings"}
        <Settings />
      {:else if $activeTab === "Help"}
        <Help />
      {/if}
    </main>
  </div>
</div>
