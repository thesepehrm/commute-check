<script lang="ts">
  import { onMount } from "svelte";
  import {
    googleApiKey,
    saveGoogleApiKey,
    workAddress,
    saveWorkAddress,
    initializeSettings,
  } from "../stores/settings";

  let apiKeyInput = $state("");
  let workAddressInput = $state("");
  let saveSuccess = $state(false);
  let saveError = $state(false);

  onMount(() => {
    initializeSettings();
    apiKeyInput = $googleApiKey;
    workAddressInput = $workAddress;
  });

  function handleSave() {
    try {
      saveGoogleApiKey(apiKeyInput);
      saveWorkAddress(workAddressInput);
      saveSuccess = true;
      saveError = false;
      setTimeout(() => {
        saveSuccess = false;
      }, 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      saveError = true;
      setTimeout(() => {
        saveError = false;
      }, 3000);
    }
  }
</script>

<div class="card bg-base-200 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Settings</h2>

    <div class="form-control w-full max-w-lg">
      <label class="label" for="apiKey">
        <span class="label-text">Google Maps API Key</span>
        <a
          href="https://developers.google.com/maps/documentation/javascript/get-api-key"
          target="_blank"
          rel="noopener noreferrer"
          class="label-text-alt link link-primary"
        >
          How to get an API key
        </a>
      </label>
      <input
        id="apiKey"
        type="text"
        placeholder="Enter your Google Maps API Key"
        class="input input-bordered w-full"
        bind:value={apiKeyInput}
      />
      <div class="label">
        <span class="label-text-alt"
          >This key is needed to calculate commute times and routes</span
        >
      </div>
    </div>

    {#if saveError}
      <div class="alert alert-error shadow-lg mt-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>Error saving settings. Please try again.</span>
        </div>
      </div>
    {/if}

    <div class="form-control w-full max-w-lg mt-4">
      <label class="label" for="workAddress">
        <span class="label-text">Work Address</span>
      </label>
      <input
        id="workAddress"
        type="text"
        placeholder="Enter your work address"
        class="input input-bordered w-full"
        bind:value={workAddressInput}
      />
      <div class="label">
        <span class="label-text-alt"
          >This will be used as the default destination for commute checks</span
        >
      </div>
    </div>

    <div class="card-actions justify-end mt-4">
      <button
        class="btn btn-primary"
        disabled={saveSuccess}
        onclick={handleSave}
      >
        {#if saveSuccess}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Saved
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          Save
        {/if}
      </button>
    </div>

    <div class="divider mt-6"></div>

    <h3 class="text-lg font-bold">About Commute Check</h3>
    <p class="text-base-content opacity-70">
      This extension helps you check your commute time and plan your travel
      efficiently. A valid Google Maps API key is required to access commute
      data.
    </p>
  </div>
</div>
