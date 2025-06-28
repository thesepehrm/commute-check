<script lang="ts">
  import { onMount } from "svelte";
  import { googleApiKey, workAddress } from "../stores/settings";
  import { getCommuteDetails } from "../services/commuteService";
  import { TravelMode, type CommuteResult } from "../types";

  let origin = $state("");
  let isApiKeySet = $state(false);
  let isWorkAddressSet = $state(false);
  let showResult = $state(false);
  let loading = $state(false);
  let errorMessage = $state<string | null>(null);

  // Store results for each transportation mode
  let results = $state<Record<TravelMode, CommuteResult | null>>({
    [TravelMode.DRIVING]: null,
    [TravelMode.BICYCLING]: null,
    [TravelMode.TRANSIT]: null,
    [TravelMode.WALKING]: null,
  });

  onMount(() => {
    isApiKeySet = $googleApiKey !== "";
    isWorkAddressSet = $workAddress !== "";
  });

  // Subscribe to changes in the API key and work address
  $effect(() => {
    isApiKeySet = $googleApiKey !== "";
    isWorkAddressSet = $workAddress !== "";
  });

  async function checkAllCommuteOptions() {
    loading = true;
    showResult = false;
    errorMessage = null;

    try {
      // Fetch all transportation modes in parallel
      const promises = [
        getCommuteDetails(origin, TravelMode.DRIVING),
        getCommuteDetails(origin, TravelMode.BICYCLING),
        getCommuteDetails(origin, TravelMode.TRANSIT),
        getCommuteDetails(origin, TravelMode.WALKING),
      ];

      const [drivingResult, bicyclingResult, transitResult, walkingResult] =
        await Promise.all(promises);

      // Update results
      results[TravelMode.DRIVING] = drivingResult;
      results[TravelMode.BICYCLING] = bicyclingResult;
      results[TravelMode.TRANSIT] = transitResult;
      results[TravelMode.WALKING] = walkingResult;

      showResult = true;
    } catch (error) {
      console.error("Error getting commute details:", error);
      errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred fetching commute data";
    } finally {
      loading = false;
    }
  }

  // Helper to get icon for travel mode
  function getModeIcon(mode: TravelMode): string {
    switch (mode) {
      case TravelMode.DRIVING:
        return "🚗";
      case TravelMode.BICYCLING:
        return "🚲";
      case TravelMode.WALKING:
        return "🚶";
      case TravelMode.TRANSIT:
        return "🚆";
      default:
        return "🚗";
    }
  }
</script>

<div class="card bg-base-200 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Check Commute</h2>

    {#if !isApiKeySet}
      <div role="alert" class="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span
          >API Key is not set. Please configure your Google Maps API Key in
          Settings.</span
        >
      </div>
    {:else if !isWorkAddressSet}
      <div class="alert alert-warning shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span
          >Work address is not set. Please configure your work address in
          Settings.</span
        >
      </div>
    {:else}
      {#if errorMessage}
        <div class="alert alert-error shadow-lg mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      {/if}

      <div class="form-control w-full max-w-lg mb-3">
        <label class="label" for="origin">
          <span class="label-text">Location</span>
        </label>
        <input
          id="origin"
          type="text"
          placeholder="Enter your current location"
          class="input input-bordered w-full"
          bind:value={origin}
        />
      </div>

      <div class="flex justify-center mb-2">
        <button
          class="btn btn-primary"
          disabled={!origin || loading}
          onclick={checkAllCommuteOptions}
        >
          {#if loading}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 animate-spin"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>

            Fetching...
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              />
            </svg>
            Calculate
          {/if}
        </button>
      </div>

      {#if loading}
        <div class="mt-4">
          <progress class="progress w-full"></progress>
        </div>
      {:else if showResult}
        <div class="mt-4">
          <div class="bg-base-100 rounded-box p-2">
            <div class="overflow-x-auto">
              <table class="table w-full">
                <thead>
                  <tr>
                    <th>Mode</th>
                    <th>Time</th>
                    <th>Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {#each Object.entries(results) as [mode, result]}
                    {@const travelMode = mode as TravelMode}
                    {#if result && result.success}
                      <tr class="hover">
                        <td class="flex items-center">
                          <span class="text-xl mr-2"
                            >{getModeIcon(travelMode)}</span
                          >
                        </td>
                        <td>{result.duration}</td>
                        <td>{result.distance}</td>
                      </tr>
                    {:else if result}
                      <tr class="text-error">
                        <td class="flex items-center">
                          <span class="text-xl mr-2"
                            >{getModeIcon(travelMode)}</span
                          >
                        </td>
                        <td colspan="2">Error: {result.error}</td>
                      </tr>
                    {/if}
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>
