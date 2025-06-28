import { get } from "svelte/store";
import { googleApiKey, workAddress } from "../stores/settings";
import { TravelMode, type CommuteResult } from "../types";

/**
 * Gets commute details from the Google Maps Distance Matrix API via the background script
 * @param origin The starting location
 * @param travelMode The mode of transportation
 * @returns Promise with commute details
 */
export async function getCommuteDetails(
  origin: string,
  travelMode: TravelMode
): Promise<CommuteResult> {
  const apiKey = get(googleApiKey);
  const destination = get(workAddress);

  if (!apiKey) {
    return {
      duration: "",
      distance: "",
      travelMode,
      success: false,
      error: "API Key not set",
    };
  }

  if (!destination) {
    return {
      duration: "",
      distance: "",
      travelMode,
      success: false,
      error: "Work address not set",
    };
  }

  try {
    console.log("Proceeding with API call");

    // Prepare data for the background script
    const todayDate = new Date();
    todayDate.setHours(13, 0, 0, 0); // Set to 13:00 (1:00 PM) - to be a safe time for commute checks
    const departureTime = Math.floor(todayDate.getTime() / 1000); // Convert to Unix timestamp

    interface BackgroundResponse {
      success: boolean;
      result?: {
        duration: string;
        distance: string;
        travelMode: TravelMode;
      };
      error?: string;
    }

    // Use Chrome's sendMessage API to communicate with the background script
    return new Promise<CommuteResult>((resolve, reject) => {
      // Set a timeout to catch if the background script isn't responding
      const timeout = setTimeout(() => {
        reject(new Error("API request timed out"));
      }, 10000);

      chrome.runtime.sendMessage(
        {
          action: "getCommuteDetails",
          data: {
            origin,
            destination,
            travelMode,
            apiKey,
            departureTime,
          },
        },
        (response: BackgroundResponse) => {
          clearTimeout(timeout);

          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
            reject(
              new Error(
                chrome.runtime.lastError.message ||
                  "Communication error with background service"
              )
            );
            return;
          }

          if (response && response.success) {
            resolve({
              duration: response.result?.duration || "",
              distance: response.result?.distance || "",
              travelMode,
              success: true,
            });
          } else {
            const errorMsg =
              response?.error || "Unknown error fetching commute details";
            console.error("Error from background script:", errorMsg);
            reject(new Error(errorMsg));
          }
        }
      );
    });
  } catch (error) {
    console.error("Error in commuteService:", error);
    throw error;
  }
}

/**
 * Tests the connection to the background script
 * @returns Promise that resolves to true if the connection is working
 */
export async function testBackgroundConnection(): Promise<boolean> {
  try {
    return new Promise<boolean>((resolve) => {
      // Set a timeout to catch if the background script isn't responding
      const timeout = setTimeout(() => {
        console.error("Background connection test timed out");
        resolve(false);
      }, 2000);

      // Send a simple ping message to test the connection
      chrome.runtime.sendMessage({ action: "ping" }, (response) => {
        clearTimeout(timeout);

        if (chrome.runtime.lastError) {
          console.error("Error testing connection:", chrome.runtime.lastError);
          resolve(false);
          return;
        }

        if (response && response.success && response.message === "pong") {
          console.log("Background connection test successful");
          resolve(true);
        } else {
          console.error(
            "Background connection test failed with unexpected response",
            response
          );
          resolve(false);
        }
      });
    });
  } catch (error) {
    console.error("Error testing background connection:", error);
    return false;
  }
}
