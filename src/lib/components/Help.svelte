<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    console.log('Help component mounted');
  });
</script>

<div class="card bg-base-200 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Help & FAQ</h2>
    
    <div class="collapse collapse-arrow bg-base-100 my-2">
      <input type="checkbox" /> 
      <div class="collapse-title text-lg font-medium">
        What does this extension do?
      </div>
      <div class="collapse-content"> 
        <p>Commute Check helps you monitor travel times between locations, making your commuting experience more efficient.</p>
      </div>
    </div>
    
    <div class="collapse collapse-arrow bg-base-100 my-2">
      <input type="checkbox" /> 
      <div class="collapse-title text-lg font-medium">
        Why do I need a Google Maps API key?
      </div>
      <div class="collapse-content"> 
        <p>The Google Maps API key is required to access Google's routes and travel time data. Without it, the extension cannot calculate commute times.</p>
      </div>
    </div>
    
    <div class="collapse collapse-arrow bg-base-100 my-2">
      <input type="checkbox" /> 
      <div class="collapse-title text-lg font-medium">
        How do I get a Google Maps API key?
      </div>
      <div class="collapse-content"> 
        <p>You can get an API key from the <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" class="link link-primary">Google Cloud Platform</a>. You'll need to create a project, enable the required APIs (Directions API, Distance Matrix API), and set up billing.</p>
      </div>
    </div>
    
    <div class="collapse collapse-arrow bg-base-100 my-2">
      <input type="checkbox" /> 
      <div class="collapse-title text-lg font-medium">
        Are my settings saved?
      </div>
      <div class="collapse-content"> 
        <p>Yes, your API key and other settings are saved in your browser's local storage. They persist even when you close the browser.</p>
      </div>
    </div>
    
    <div class="collapse collapse-arrow bg-base-100 my-2">
      <input type="checkbox" /> 
      <div class="collapse-title text-lg font-medium">
        How secure is my API key?
      </div>
      <div class="collapse-content"> 
        <p>Your API key is stored only on your local device. However, it's good practice to restrict your API key usage in the Google Cloud Console to prevent unauthorized use.</p>
      </div>
    </div>
  </div>
</div>
