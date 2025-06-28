import type { TravelMode } from "./lib/types";

// Log that background script is loaded
console.log("Background service worker initialized");

// Define types for message passing
interface CommuteMessage {
  action: string;
  data: {
    origin: string;
    destination: string;
    travelMode: TravelMode;
    apiKey: string;
    departureTime: number;
  };
}

// Create a self-registration variable to ensure the script is loaded
const backgroundScript = {
  initialized: true,
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(
  (
    message: CommuteMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    console.log("Background script received message:", message.action);

    if (message.action === "getCommuteDetails") {
      console.log("Processing commute details request");
      const { origin, destination, travelMode, apiKey, departureTime } =
        message.data;

      // Call the Google Maps API from background script
      fetchCommuteDetails(
        origin,
        destination,
        travelMode,
        apiKey,
        departureTime
      )
        .then((result) => {
          console.log("API call successful, sending response");
          sendResponse({ success: true, result });
        })
        .catch((error) => {
          console.error("API call failed:", error);
          sendResponse({ success: false, error: error.message });
        });

      // Return true to indicate that we will send a response asynchronously
      return true;
    }
  }
);

/**
 * Fetch commute details from the Google Maps Distance Matrix API
 */
async function fetchCommuteDetails(
  origin: string,
  destination: string,
  travelMode: TravelMode,
  apiKey: string,
  departureTime: number
): Promise<any> {
  try {
    // Construct URL for the Google Maps Distance Matrix API
    const url = new URL(
      "https://maps.googleapis.com/maps/api/distancematrix/json"
    );

    const params = {
      origins: origin,
      destinations: destination,
      departure_time: departureTime.toString(),
      mode: travelMode.toLowerCase(),
      key: apiKey,
    };

    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `Network error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(`API Error: ${data.status}`);
    }

    const result = data.rows[0].elements[0];

    if (result.status !== "OK") {
      throw new Error(`Route Error: ${result.status}`);
    }

    return {
      duration: cleanseTime(result.duration.text),
      distance: result.distance.text,
      travelMode,
      success: true,
    };
  } catch (error) {
    console.error("Error fetching commute details:", error);
    throw error;
  }
}

// Google API often returns "2 hours 0 mins" or "2 days 0 hours"
function cleanseTime(time: string): string {
  return time.replace("0 mins", "").replace("0 hours", "");
}
