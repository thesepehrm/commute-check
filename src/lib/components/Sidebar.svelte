<script lang="ts">
  import { MENU_ITEMS } from "../constants/menu";
import { activeTab } from "../stores/settings";
</script>

<aside class="w-16 bg-base-200 p-2">
  <nav class="flex flex-col gap-4">
    {#each MENU_ITEMS as item}
      <button 
        class="btn btn-ghost btn-square" 
        onclick={() => activeTab.set(item.label)}
        class:btn-active={$activeTab === item.label}
      >
        <span class="text-xl" title={item.label}>{item.icon}</span>
      </button>
    {/each}
  </nav>
</aside>
