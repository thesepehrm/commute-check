import { writable } from "svelte/store";

// Store for Google Maps API key
export const googleApiKey = writable<string>("");

// Store for work address
export const workAddress = writable<string>("");

// Store for active menu item
export const activeTab = writable<string>("Check Commute");

// Initialize settings from local storage (if available)
export function initializeSettings(): void {
  try {
    const storedApiKey = localStorage.getItem("googleApiKey");
    if (storedApiKey) {
      googleApiKey.set(storedApiKey);
    }

    const storedWorkAddress = localStorage.getItem("workAddress");
    if (storedWorkAddress) {
      workAddress.set(storedWorkAddress);
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
}

// Save Google API key to local storage
export function saveGoogleApiKey(key: string): void {
  try {
    localStorage.setItem("googleApiKey", key);
    googleApiKey.set(key);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// Save work address to local storage
export function saveWorkAddress(address: string): void {
  try {
    localStorage.setItem("workAddress", address);
    workAddress.set(address);
  } catch (error) {
    console.error("Error saving work address to localStorage:", error);
  }
}
