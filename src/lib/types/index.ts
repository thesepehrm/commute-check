export interface MenuItem {
  icon: string;
  label: string;
  action?: () => void;
}

// Define the travel modes
export enum TravelMode {
  DRIVING = "DRIVING",
  WALKING = "WALKING",
  TRANSIT = "TRANSIT",
  BICYCLING = "BICYCLING",
}

// Interface for commute results
export interface CommuteResult {
  duration: string;
  distance: string;
  travelMode: TravelMode;
  success: boolean;
  error?: string;
}
