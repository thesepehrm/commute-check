# Commute Check

A Chrome extension to check your commute time to work easily!

## Features

- Check commute time and distance from your current location to work
- Support for multiple transportation modes (driving, walking, cycling, transit)
- Save your work address and Google Maps API key securely
- Simple and user-friendly interface

## Installation

1. Clone this repository
2. Run `pnpm install` to install dependencies
3. Build the extension:
   - Development build: `pnpm run build`
   - Production build: `pnpm run build:prod`
4. Load the extension in Chrome:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` directory

## Configuration

1. Get a Google Maps API key from the [Google Cloud Platform Console](https://console.cloud.google.com/apis/dashboard)
   - Enable the "Distance Matrix API" service
2. In the extension options, enter your Google Maps API key
3. Set your work address in the settings

## Development

1. Run `pnpm dev` for development mode with hot reloading
2. Run `pnpm check` to check for TypeScript errors

## Building for Production

Run the production build command to create an optimized build:

```bash
pnpm run build:prod
```

This will:

- Remove console logs
- Minify the code
- Add hashes to filenames for better caching
- Optimize the build for production use

## License

See the [LICENSE](LICENSE) file for details.
